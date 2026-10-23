import importlib.util
from pathlib import Path
import tempfile
import unittest
import json

spec = importlib.util.spec_from_file_location('synthesis', Path(__file__).parent.parent / 'scripts/synthesize-narration.py')
synthesis = importlib.util.module_from_spec(spec)
spec.loader.exec_module(synthesis)

class NarrationCacheTest(unittest.TestCase):
    def test_reuses_only_matching_complete_audio(self):
        self.assertTrue(hasattr(synthesis, 'cache_matches'), 'validação do cache ainda não implementada')
        with tempfile.TemporaryDirectory() as folder:
            audio = Path(folder) / 'clip.mp3'
            payload = {'text': 'Texto aprovado', 'voice': 'voz A', 'rate': '-3%', 'pitch': '-2Hz'}
            self.assertFalse(synthesis.cache_matches(audio, payload))
            audio.write_bytes(b'a' * 2048)
            audio.with_suffix('.json').write_text(json.dumps(payload))
            self.assertTrue(synthesis.cache_matches(audio, payload))
            self.assertFalse(synthesis.cache_matches(audio, {**payload, 'text': 'Novo texto'}))
            self.assertFalse(synthesis.cache_matches(audio, {**payload, 'voice': 'voz B'}))
            audio.write_bytes(b'a' * 5)
            self.assertFalse(synthesis.cache_matches(audio, payload))
