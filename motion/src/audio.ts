/** Original procedural transition/click sound design. No samples or third-party music. */
export function createSoundDesign(seconds = 60, sampleRate = 48000): Buffer {
  if (!Number.isFinite(seconds) || seconds <= 0 || seconds > 600 || !Number.isInteger(sampleRate) || sampleRate < 8000 || sampleRate > 96000) throw new Error('Invalid audio duration/sample rate');
  const samples = Math.round(seconds * sampleRate);
  const mix = new Float64Array(samples);
  let noiseSeed = 918274;
  const noise = () => {noiseSeed = (Math.imul(noiseSeed, 1664525) + 1013904223) >>> 0;return noiseSeed / 2147483648 - 1;};
  const tone = (start:number,duration:number,frequency:number,volume:number,slide=0) => {
    const startSample=Math.round(start*sampleRate), n=Math.round(duration*sampleRate);
    for(let i=0;i<n;i++){const at=startSample+i;if(at<0||at>=samples)continue;const t=i/sampleRate,p=i/n;const envelope=Math.sin(Math.PI*Math.min(1,p*16))*Math.exp(-p*5);mix[at]+=Math.sin(2*Math.PI*(frequency*t+slide*t*t/2))*envelope*volume;}
  };
  const sweep = (at:number) => {
    const n=Math.round(0.6*sampleRate);let low=0;
    for(let i=0;i<n;i++){const t=i/sampleRate,p=i/n;const pos=Math.round((at-0.25)*sampleRate)+i;if(pos<0||pos>=samples)continue;low=low*0.88+noise()*0.12;mix[pos]+=low*Math.pow(Math.sin(p*Math.PI),2)*0.34+Math.sin(2*Math.PI*(150*t+600*t*t))*Math.pow(Math.sin(p*Math.PI),4)*0.04;}
    tone(at,0.45,85,0.16,-70);tone(at+0.02,0.45,440,0.06,80);
  };
  [0.2,3.8,8,16,23,29,33.67,38.33,43,46.5,50,56].forEach(sweep);
  [1.1,1.4,1.7,2,2.3,2.6,4.2,4.4,4.6,4.8,9,10.2,11.4,12.7,14,17,19,21,30,30.3,30.6,31,34.5,34.8,35.2,39.1,39.65,40.2,40.8,44.8,46.1,47.5,57,57.5].forEach((t,i)=>tone(t,0.12,750+(i%4)*190,0.065,-900));
  [23.15,23.36,23.58,56.15,56.36,56.58].forEach((t,i)=>tone(t,0.8,[523.25,659.25,783.99][i%3],0.07));
  const out=Buffer.alloc(44+samples*2);
  out.write('RIFF',0);out.writeUInt32LE(out.length-8,4);out.write('WAVE',8);out.write('fmt ',12);out.writeUInt32LE(16,16);out.writeUInt16LE(1,20);out.writeUInt16LE(1,22);out.writeUInt32LE(sampleRate,24);out.writeUInt32LE(sampleRate*2,28);out.writeUInt16LE(2,32);out.writeUInt16LE(16,34);out.write('data',36);out.writeUInt32LE(samples*2,40);
  for(let i=0;i<samples;i++)out.writeInt16LE(Math.round(Math.max(-0.88,Math.min(0.88,mix[i]))*32767),44+i*2);
  return out;
}
