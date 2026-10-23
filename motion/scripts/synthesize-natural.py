"""Reproduce user-selected Voice A locally with Kokoro, without pitch changes."""
import argparse
import importlib.util
import json
import os
from pathlib import Path

cache_spec = importlib.util.spec_from_file_location('speech_cache', Path(__file__).with_name('synthesize-narration.py'))
cache_module = importlib.util.module_from_spec(cache_spec)
cache_spec.loader.exec_module(cache_module)
cache_matches = cache_module.cache_matches

def main():
    import soundfile as sf
    from kokoro_onnx import Kokoro
    parser = argparse.ArgumentParser()
    parser.add_argument('--script', required=True)
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    data = json.loads(Path(args.script).read_text())
    output = Path(args.out)
    output.mkdir(parents=True, exist_ok=True)
    model_dir = Path(os.environ.get('TESLINHA_KOKORO_MODELS', '.models/kokoro'))
    engine = None
    for cue in data['cues']:
        target = output / (cue['id'] + '.wav')
        payload = {key: data['settings'][key] for key in ('voice', 'rate', 'pitch')}
        payload['text'] = cue['text']
        if cache_matches(target, payload):
            continue
        if engine is None:
            engine = Kokoro(str(model_dir / 'kokoro-v1.0.onnx'), str(model_dir / 'voices-v1.0.bin'))
        samples, sr = engine.create(cue['text'], voice=payload['voice'], speed=float(payload['rate']), lang='pt-br', sentence_pause=0.32, clause_pause=0.12)
        temp = target.with_suffix('.partial.wav')
        sf.write(temp, samples, sr, subtype='PCM_16')
        temp.replace(target)
        target.with_suffix('.json').write_text(json.dumps(payload, ensure_ascii=False))
        print(cue['id'], f'{len(samples)/sr:.2f}s', flush=True)

if __name__ == '__main__':
    main()
