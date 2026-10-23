import test from 'node:test';
import assert from 'node:assert/strict';
const timeline = await import('../src/timeline').catch(() => null);

test('timeline cobre todos os 1800 frames e mantém os cortes aprovados apesar das sobreposições', () => {
  assert.ok(timeline, 'timeline ainda não implementada');
  const entries = timeline.buildTimeline([240, 240, 210, 180, 420, 210, 180, 120], 12);
  assert.deepEqual(entries.map((e) => e.from), [0, 240, 480, 690, 870, 1290, 1500, 1680]);
  assert.equal(entries[7].from + entries[7].duration, 1800);
  assert.equal(entries[0].duration, 252);
  for (let f = 0; f < 1800; f++) {
    const active = entries.filter((e) => f >= e.from && f < e.from + e.duration);
    assert.ok(active.length >= 1 && active.length <= 2, `frame ${f} sem cobertura ou com sobreposição tripla`);
  }
});

test('timeline rejeita durações inválidas e transições maiores que uma cena', () => {
  assert.ok(timeline);
  for (const input of [[], [0, 40], [-1, 40], [20.5, 40], [NaN, 40], [Infinity, 40]]) {
    assert.throws(() => timeline.buildTimeline(input, 12));
  }
  assert.throws(() => timeline.buildTimeline([10, 20], 12));
  assert.throws(() => timeline.buildTimeline([30, 30], -1));
});

test('progresso é limitado e reproduzível inclusive fora do intervalo', () => {
  assert.ok(timeline);
  assert.equal(timeline.progress(-50, 10, 30), 0);
  assert.equal(timeline.progress(20, 10, 30), 0.5);
  assert.equal(timeline.progress(99, 10, 30), 1);
  assert.throws(() => timeline.progress(0, 10, 10));
});
