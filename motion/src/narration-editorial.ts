export function validateBrandMention(texts:readonly string[]):void {
  const count=texts.reduce((sum,text)=>sum+(text.match(/teslinha/gi)?.length??0),0);
  if(count!==1||!/teslinha suporte/i.test(texts.at(-1)??''))throw new Error('Citar Teslinha Suporte uma única vez, apenas na última fala.');
}
