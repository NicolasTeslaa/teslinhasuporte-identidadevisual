/** Original ambient instrumental: 96 BPM, warm chords, quiet plucks and a soft pulse. */
export function createMusicBed(seconds=60,sampleRate=48000):Float32Array {
  if(!Number.isFinite(seconds)||seconds<=0||!Number.isInteger(sampleRate)||sampleRate<8000)throw new Error('Duração ou sample rate inválidos.');
  const output=new Float32Array(Math.round(seconds*sampleRate));
  const chords=[[48,55,59,64],[45,52,55,60],[41,48,52,57],[43,50,55,60]];
  const frequency=(note:number)=>440*2**((note-69)/12);
  const tau=Math.PI*2;
  for(let i=0;i<output.length;i++) {
    const t=i/sampleRate;
    let value=0;
    for(let section=Math.max(0,Math.floor(t/5)-1);section<=Math.floor(t/5);section++) {
      const local=t-section*5;if(local<0||local>6)continue;
      const env=Math.min(1,local/1.2)*Math.min(1,(6-local)/1.2);
      for(const [j,note] of chords[section%4].entries()) {
        const hz=frequency(note);
        value+=env*0.037*(Math.sin(tau*hz*t)+0.28*Math.sin(tau*hz*2.001*t+j));
      }
    }
    const step=Math.floor(t/0.625),phase=t-step*0.625;
    const chord=chords[Math.floor(t/5)%4];
    const note=chord[[0,2,1,3,1,2,3,2][step%8]]+24;
    value+=0.045*Math.min(1,phase/0.012)*Math.exp(-phase*9)*(Math.sin(tau*frequency(note)*phase)+0.13*Math.sin(tau*frequency(note)*2*phase));
    const beat=t%1.25;
    value+=0.025*Math.sin(tau*(55*beat+4*(1-Math.exp(-beat*18))))*Math.min(1,beat/0.008)*Math.exp(-beat*16);
    const fade=Math.min(1,t/2)*Math.min(1,(seconds-t)/3);
    output[i]=value*fade*2;
  }
  return output;
}
