import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
const output = 'out/verval-mobile-video.mp4';
if (!existsSync(output)) throw new Error(`Arquivo ausente: ${output}`);
const raw = execFileSync('ffprobe', ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', output], { encoding: 'utf8' });
const probe = JSON.parse(raw); const video = probe.streams.find((stream: any) => stream.codec_type === 'video'); const audio = probe.streams.find((stream: any) => stream.codec_type === 'audio');
if (!video || video.width !== 1080 || video.height !== 1920 || video.r_frame_rate !== '30/1' || video.codec_name !== 'h264') throw new Error('Vídeo fora do formato 1080x1920/30fps H.264.');
if (!audio || audio.codec_name !== 'aac') throw new Error('Áudio AAC ausente.');
console.log(`OK: ${video.width}x${video.height}, ${video.r_frame_rate}, H.264 + AAC, duração ${probe.format.duration}s`);
