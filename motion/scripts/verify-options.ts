export function parseVerificationArgs(args:readonly string[]):{narration:boolean;file:string} {
  if(args.some(arg=>arg.startsWith('--')&&arg!=='--no-narration'))throw new Error('Flag de verificação desconhecida. Use --no-narration ou um caminho MP4.');
  const paths=args.filter(arg=>!arg.startsWith('--'));
  if(paths.length>1)throw new Error('Informe somente um caminho MP4.');
  const narration=!args.includes('--no-narration');
  return {narration,file:paths[0]??`../out/teslinha-commercial${narration?'-voz-a-musica-v02':''}.mp4`};
}
