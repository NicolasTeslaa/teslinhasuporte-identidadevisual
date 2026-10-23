type Stream = {codec_type?: string; codec_name?: string; width?:number; height?:number; r_frame_rate?:string; nb_frames?:string; pix_fmt?:string; sample_rate?:string};
export type Probe = {streams:Stream[];format:{duration?:string}};
export function assertCommercialMetadata(probe:Probe): void {
  const v=probe.streams.find(s=>s.codec_type==='video');
  if(!v || v.codec_name!=='h264' || v.width!==1080 || v.height!==1920 || v.r_frame_rate!=='30/1' || v.nb_frames!=='1800' || v.pix_fmt!=='yuv420p') throw new Error('Vídeo deve ser H.264 yuv420p, 1080×1920, 30 FPS e 1800 frames.');
  if(Math.abs(Number(probe.format.duration)-60)>0.05 || !Number.isFinite(Number(probe.format.duration))) throw new Error('Duração deve ser 60 segundos.');
  const a=probe.streams.find(s=>s.codec_type==='audio');
  if(!a || a.codec_name!=='aac' || a.sample_rate!=='48000') throw new Error('Áudio deve ser AAC a 48 kHz.');
}

export function assertDecodeLog(stderr: string): void {
  if(stderr.trim()) throw new Error(`FFmpeg encontrou erros de decodificação: ${stderr.trim()}`);
}
