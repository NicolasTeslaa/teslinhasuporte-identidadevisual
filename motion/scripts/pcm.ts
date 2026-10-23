export function readPcmWav(buffer:Buffer):{sampleRate:number;samples:Int16Array} {
  if(buffer.length<44||buffer.toString('ascii',0,4)!=='RIFF'||buffer.toString('ascii',8,12)!=='WAVE') throw new Error('Arquivo não é WAV RIFF.');
  let sampleRate=0,validFormat=false,data:Buffer|null=null;
  for(let offset=12;offset+8<=buffer.length;) {
    const kind=buffer.toString('ascii',offset,offset+4),size=buffer.readUInt32LE(offset+4),start=offset+8;
    if(start+size>buffer.length) throw new Error('Chunk WAV incompleto.');
    if(kind==='fmt '&&size>=16) {
      validFormat=buffer.readUInt16LE(start)===1&&buffer.readUInt16LE(start+2)===1&&buffer.readUInt16LE(start+14)===16;
      sampleRate=buffer.readUInt32LE(start+4);
    }
    if(kind==='data')data=buffer.subarray(start,start+size);
    offset=start+size+(size%2);
  }
  if(!validFormat||!sampleRate||!data||data.length%2) throw new Error('WAV deve ser PCM mono de 16 bits.');
  const samples=new Int16Array(data.length/2);
  for(let i=0;i<samples.length;i++)samples[i]=data.readInt16LE(i*2);
  return {sampleRate,samples};
}

export function trimPcmSilence(samples:Int16Array,sampleRate:number):Int16Array {
  let start=0,end=samples.length;
  while(start<end&&Math.abs(samples[start])<=32)start++;
  while(end>start&&Math.abs(samples[end-1])<=32)end--;
  if(start===end)throw new Error('Fala sem áudio audível.');
  const pad=Math.round(sampleRate*0.06);
  return samples.slice(Math.max(0,start-pad),Math.min(samples.length,end+pad));
}
