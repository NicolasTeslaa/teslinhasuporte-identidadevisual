/** Trilha original, sem samples: arpejo, baixo, percussão e transições. */
export function generateMusic(sr:number):Float32Array{
 const out=new Float32Array(sr*30);const beat=60/108;
 const chords=[[48,55,60,64],[45,52,57,60],[41,48,53,57],[43,50,55,59]];
 let seed=19;
 for(let i=0;i<out.length;i++){
  const t=i/sr,chord=chords[Math.floor(t/(beat*8))%4],b=t%beat,step=Math.floor(t/(beat/2)),arpT=t%(beat/2);
  seed=(1664525*seed+1013904223)>>>0;const noise=seed/4294967296*2-1;
  const hz=(n:number)=>440*2**((n-69)/12);
  let x=.022*Math.sin(2*Math.PI*hz(chord[0]-12)*t)*(.4+.6*Math.exp(-b*7));
  for(const n of chord)x+=.004*Math.sin(2*Math.PI*hz(n)*t);
  const a=hz(chord[step%4]+12);x+=.022*(Math.sin(2*Math.PI*a*arpT)+.2*Math.sin(2*Math.PI*a*2*arpT))*Math.exp(-arpT*11)*Math.min(1,arpT*180);
  x+=.037*Math.sin(2*Math.PI*(46*b+5*(1-Math.exp(-b*35))))*Math.exp(-b*22);
  const hat=t%(beat/2);x+=noise*.009*Math.exp(-hat*95);
  if(Math.floor(t/beat)%2===1)x+=noise*.012*Math.exp(-b*35);
  for(const cut of [5,11,17,25]){const d=t-cut;if(d>-.18&&d<.22){const env=Math.sin((d+.18)/.4*Math.PI)**2;x+=noise*.027*env;}}
  const fade=Math.min(1,t/.4)*Math.min(1,(30-t)/1.1);
  out[i]=x*fade;
 }
 return out;
}
