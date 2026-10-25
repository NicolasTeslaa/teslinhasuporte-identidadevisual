export const cuts = [0,150,330,510,750,900] as const;
export type Cue = {start:number; end:number; text:string};
export function sceneAt(frame:number):number {
  if(frame < 0 || frame >= 900) return -1;
  return cuts.findIndex((start,i) => frame >= start && frame < cuts[i+1]);
}
export function captionAt(cues:Cue[],time:number):string {
  return cues.find(c => time >= c.start && time < c.end)?.text ?? '';
}
export function validateCues(cues:Cue[],start:number,end:number):void {
  let previous = start;
  for(const cue of cues){
    if(cue.start < start || cue.end > end) throw new Error('Fala fora da cena');
    if(cue.end <= cue.start) throw new Error('Fala sem duração válida');
    if(cue.start < previous) throw new Error('Falas sobrepostas');
    previous = cue.end;
  }
}
export const clamp = (n:number) => Math.max(0,Math.min(1,n));
export const ease = (n:number) => {const x=clamp(n); return x*x*(3-2*x)};
export function motionState(scene:number,time:number){
  return {dust:scene===2 ? 1-ease((time-.5)/3.5) : 1,
    vehicle:scene===3 ? (time<3?ease((time-.8)/2):1-ease((time-4.8)/2.5)) : 0,
    service:scene===3 && time>=3 && time<4.8};
}
