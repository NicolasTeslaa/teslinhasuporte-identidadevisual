import {progress} from './timeline';

export type NarrationCue = {id:string; from:number; to:number; text:string};
export type NarrationRegion = {from:number; durationInFrames:number};
export type PlannedCue = NarrationCue & NarrationRegion & {playbackRate:number};

function validateCues(cues:readonly NarrationCue[]) {
  let end=0;
  const ids=new Set<string>();
  for(const cue of cues) {
    if(!Number.isInteger(cue.from)||!Number.isInteger(cue.to)||cue.from<end||cue.to<=cue.from||cue.to>1800||!cue.text.trim()||ids.has(cue.id)) throw new Error('Janelas de narração inválidas, repetidas ou sobrepostas.');
    ids.add(cue.id);end=cue.to;
  }
}

export function planNarration(cues:readonly NarrationCue[],seconds:readonly number[]):PlannedCue[] {
  validateCues(cues);
  if(cues.length!==seconds.length||seconds.some(s=>!Number.isFinite(s)||s<=0)) throw new Error('Falta áudio válido para uma ou mais falas.');
  return cues.map((cue,i)=>{
    const window=(cue.to-cue.from)/30;
    const playbackRate=seconds[i]>window ? (seconds[i]+0.04)/window : 1;
    if(playbackRate>1.12) throw new Error(`Fala ${cue.id} longa demais: ${seconds[i].toFixed(2)}s para ${window.toFixed(2)}s. Regrave; não corte a fala.`);
    return {...cue,playbackRate,durationInFrames:Math.ceil(seconds[i]*30/playbackRate)};
  });
}

export function placeNarration(cues:readonly NarrationCue[],clips:readonly Int16Array[],sampleRate=48000):Int16Array {
  validateCues(cues);
  if(cues.length!==clips.length||!Number.isInteger(sampleRate)||sampleRate<=0) throw new Error('Áudio ausente ou taxa inválida.');
  const output=new Int16Array(sampleRate*60);
  cues.forEach((cue,i)=>{
    const start=Math.round(cue.from/30*sampleRate),limit=Math.round(cue.to/30*sampleRate);
    if(!clips[i].length||start+clips[i].length>limit) throw new Error(`Áudio ${cue.id} excede a janela; a fala não pode ser truncada.`);
    output.set(clips[i],start);
  });
  return output;
}

export function effectsVolume(frame:number,regions:readonly NarrationRegion[]):number {
  let gain=0;
  for(const region of regions) {
    const end=region.from+region.durationInFrames;
    const duck=progress(frame,region.from-6,region.from)*(1-progress(frame,end,end+9));
    gain=Math.max(gain,duck);
  }
  return 0.8-(0.8-0.18)*gain;
}

export function verifyNarrationAudibility(samples:Int16Array,regions:readonly (NarrationRegion&{id:string})[],sampleRate=48000):{id:string;rms:number}[] {
  return regions.map(region=>{
    const start=Math.round(region.from/30*sampleRate),end=Math.round((region.from+region.durationInFrames)/30*sampleRate);
    if(end>samples.length||end<=start)throw new Error(`Áudio final incompleto na fala ${region.id}.`);
    let energy=0;
    for(let i=start;i<end;i++)energy+=samples[i]*samples[i];
    const rms=Math.sqrt(energy/(end-start));
    if(rms<200)throw new Error(`Narração inaudível na fala ${region.id}.`);
    return {id:region.id,rms:Math.round(rms)};
  });
}

/** Check waveform agreement, so background music cannot satisfy a missing-voice check. */
export function verifyNarrationReference(samples:Int16Array,reference:Int16Array,regions:readonly (NarrationRegion&{id:string})[],sampleRate=48000):{id:string;rms:number;correlation:number}[] {
  const audible=verifyNarrationAudibility(samples,regions,sampleRate);
  const radius=Math.round(sampleRate*0.02),stride=Math.max(1,Math.round(sampleRate/1500)),lagStep=Math.max(1,Math.round(sampleRate/6000));
  return regions.map((region,index)=>{
    const start=Math.round(region.from/30*sampleRate),end=Math.round((region.from+region.durationInFrames)/30*sampleRate);
    if(end>reference.length)throw new Error('Referência de narração incompleta.');
    let best=0;
    for(let lag=-radius;lag<=radius;lag+=lagStep) {
      let dot=0,signalEnergy=0,referenceEnergy=0;
      for(let i=start;i<end;i+=stride) {
        const at=i+lag;if(at<0||at>=samples.length)continue;
        const a=samples[at],b=reference[i];
        dot+=a*b;signalEnergy+=a*a;referenceEnergy+=b*b;
      }
      const correlation=dot/Math.sqrt(signalEnergy*referenceEnergy||1);
      best=Math.max(best,correlation);
    }
    if(best<0.7)throw new Error(`Áudio final não corresponde à narração de referência na fala ${region.id}.`);
    return {...audible[index],correlation:Math.round(best*10000)/10000};
  });
}
