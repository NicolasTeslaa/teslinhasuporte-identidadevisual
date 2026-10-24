import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const text = 'Você vende muito. Mas quanto sobra? Contas, cobranças e estoque espalhados travam decisões. Conheça o Verval: seu negócio na palma da mão. Veja entradas, despesas, saldo e lucro. Controle vendas, clientes, produtos e recorrências. Mais organização, mais clareza para crescer. Verval. Simplifique sua gestão.';
mkdirSync(join(process.cwd(), 'public/audio'), { recursive: true });
const output = join(process.cwd(), 'public/audio/verval-narration.wav');
const source = '/tmp/verval-narration-source.wav';
execFileSync('natural-narrator', ['--text', text, '--output', source, '--format', 'wav', '--model', 'mlx-community/Qwen3-TTS-12Hz-1.7B-CustomVoice-8bit', '--voice', 'Ryan', '--speed', '1.15', '--style', 'Português brasileiro natural, conversa confiante e próxima, ritmo comercial dinâmico, pausas curtas e orgânicas, sem voz de locutor e sem exagerar na entonação.', '--pause', '0.08'], { stdio: 'inherit' });
execFileSync('ffmpeg', ['-y', '-i', source, '-filter:a', 'atempo=1.46', '-ar', '48000', output], { stdio: 'inherit' });
writeFileSync(join(process.cwd(), 'public/audio/verval-narration.txt'), text);
