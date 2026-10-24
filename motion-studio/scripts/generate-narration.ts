import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const text = 'Quando a rotina aperta, enxergar o negócio com clareza faz toda diferença. No Verval Mobile, você acompanha entradas, saídas e lucro previsto em poucos segundos. Registra vendas, despesas e recebimentos sem deixar nada para trás. Clientes, produtos, serviços e recorrências ficam organizados no mesmo lugar. Assim, sobra tempo para cuidar do que faz o seu negócio crescer. Conheça o Verval Mobile.';
mkdirSync(join(process.cwd(), 'public/audio'), { recursive: true });
const output = join(process.cwd(), 'public/audio/verval-narration.wav');
const source = '/tmp/verval-narration-source.wav';
execFileSync('natural-narrator', ['--text', text, '--output', source, '--format', 'wav', '--model', 'mlx-community/Qwen3-TTS-12Hz-1.7B-CustomVoice-8bit', '--voice', 'Ryan', '--speed', '1.04', '--style', 'Português brasileiro natural, conversa confiante e próxima, ritmo comercial contido, pausas orgânicas, sem voz de locutor e sem exagerar na entonação.', '--pause', '0.25'], { stdio: 'inherit' });
execFileSync('ffmpeg', ['-y', '-i', source, '-filter:a', 'atempo=1.65', '-ar', '48000', output], { stdio: 'inherit' });
writeFileSync(join(process.cwd(), 'public/audio/verval-narration.txt'), text);
