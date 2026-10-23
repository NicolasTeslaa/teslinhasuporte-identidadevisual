"""Generate only the approved ad script, using a standard synthetic pt-BR male voice."""
import argparse
import asyncio
import json
from pathlib import Path

def cache_matches(target, payload):
    metadata = target.with_suffix('.json')
    try:
        return target.stat().st_size > 1024 and json.loads(metadata.read_text()) == payload
    except (OSError, ValueError):
        return False

async def main():
    import edge_tts
    parser = argparse.ArgumentParser()
    parser.add_argument('--script', required=True)
    parser.add_argument('--out', required=True)
    args = parser.parse_args()
    data = json.loads(Path(args.script).read_text())
    output = Path(args.out)
    output.mkdir(parents=True, exist_ok=True)
    limit = asyncio.Semaphore(3)

    async def synthesize(cue):
        target = output / (cue['id'] + '.mp3')
        payload = {key: data['settings'][key] for key in ('voice', 'rate', 'pitch')}
        payload['text'] = cue['text']
        if cache_matches(target, payload):
            return
        async with limit:
            for attempt in range(3):
                temp = target.with_suffix('.partial.mp3')
                try:
                    speech = edge_tts.Communicate(cue['text'], voice=data['settings']['voice'], rate=data['settings']['rate'], pitch=data['settings']['pitch'])
                    await asyncio.wait_for(speech.save(str(temp)), timeout=45)
                    temp.replace(target)
                    target.with_suffix('.json').write_text(json.dumps(payload, ensure_ascii=False))
                    print(cue['id'], flush=True)
                    return
                except Exception:
                    temp.unlink(missing_ok=True)
                    if attempt == 2:
                        raise
                    await asyncio.sleep(1 + attempt)
    await asyncio.gather(*(synthesize(cue) for cue in data['cues']))

if __name__ == '__main__':
    asyncio.run(main())
