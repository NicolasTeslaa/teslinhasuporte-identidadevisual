import {readFile,stat} from 'node:fs/promises';
type ClipMetadata={text:string;voice:string;rate:string;pitch:string};
export async function requireNarrationClip(file:string,expected:ClipMetadata):Promise<void> {
  try {
    const [info,sidecar]=await Promise.all([stat(file),readFile(file.replace(/\.(mp3|wav)$/,'.json'),'utf8')]);
    const actual=JSON.parse(sidecar) as ClipMetadata;
    if(info.size<=1024||!actual||(Object.keys(expected) as (keyof ClipMetadata)[]).some(key=>actual[key]!==expected[key]))throw new Error('Cache não corresponde à fala atual.');
  } catch {
    throw new Error(`Áudio ausente ou desatualizado: ${file}. Execute npm run narration -- --synthesize.`);
  }
}
