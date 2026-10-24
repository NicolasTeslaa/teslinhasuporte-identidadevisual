import {existsSync} from 'node:fs';
import {join} from 'node:path';
import {test} from 'node:test';
import assert from 'node:assert/strict';

test('all Verval reference captures are copied into the studio assets', () => {
  for (const name of ['IMG_2181.PNG', 'IMG_2184.PNG', 'IMG_2185.PNG', 'IMG_2186.PNG', 'IMG_2187.PNG', 'IMG_2188.PNG', 'IMG_2189.PNG']) {
    assert.equal(existsSync(join(process.cwd(), 'public/assets/verval', name)), true, name);
  }
});
