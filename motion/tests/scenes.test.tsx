import test from 'node:test';
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
const scenes = await import('../src/scenes').catch(() => null);
const animation = await import('../src/animation').catch(() => null);
const plain = (html: string) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');

test('a abertura muda de excesso de ferramentas para quatro áreas organizadas', () => {
  assert.ok(scenes, 'cenas ainda não implementadas');
  const first = plain(renderToStaticMarkup(<scenes.Scene01 frame={55}/>));
  const next = plain(renderToStaticMarkup(<scenes.Scene01 frame={180}/>));
  assert.match(first, /não precisa de mais ferramentas/);
  assert.match(next, /ferramentas certas/);
  for (const label of ['Vendas', 'Gestão', 'Clientes', 'Automação']) assert.ok(next.includes(label));
});

test('o problema evolui de dados desconectados para a necessidade de software sob medida', () => {
  assert.ok(scenes);
  assert.match(plain(renderToStaticMarkup(<scenes.Scene02 frame={100}/>)), /Informações espalhadas/);
  assert.match(plain(renderToStaticMarkup(<scenes.Scene03 frame={40}/>)), /Sua empresa é única/);
  assert.match(plain(renderToStaticMarkup(<scenes.Scene03 frame={160}/>)), /não acompanha sua rotina/);
});

test('a solução apresenta a marca oficial e demonstrações identificadas nas três interfaces', () => {
  assert.ok(scenes);
  const reveal = renderToStaticMarkup(<scenes.Scene04 frame={100}/>);
  assert.match(reveal, /teslinha-logo/);
  assert.match(plain(reveal), /Tecnologia feita para o seu negócio/);
  for (const frame of [65, 200, 345]) {
    const html = plain(renderToStaticMarkup(<scenes.Scene05 frame={frame}/>));
    assert.match(html, /dados ilustrativos/);
    assert.match(html, frame < 140 ? /Clientes e vendas/ : frame < 280 ? /Gestão em tempo real/ : /Tarefas no automático/);
  }
});

test('automação progride e o encerramento permite trocar o contato sem editar a cena', () => {
  assert.ok(scenes);
  assert.match(plain(renderToStaticMarkup(<scenes.Scene06 frame={30}/>)), /Menos tarefas repetitivas/);
  assert.match(plain(renderToStaticMarkup(<scenes.Scene06 frame={155}/>)), /Mais tempo para crescer/);
  assert.match(plain(renderToStaticMarkup(<scenes.Scene07 frame={100}/>)), /Sua tecnologia também/);
  const last = plain(renderToStaticMarkup(<scenes.Scene08 frame={90} contact="contato.exemplo"/>));
  assert.match(last, /Fale com a Teslinha Suporte/);
  assert.match(last, /contato.exemplo/);
  assert.doesNotMatch(last, /91024/);
});

test('partículas se agrupam deterministicamente e o fluxo conclui na ordem correta', () => {
  assert.ok(animation, 'modelo de animação ainda não implementado');
  assert.deepEqual(animation.tilePosition(17, 60), animation.tilePosition(17, 60));
  assert.notDeepEqual(animation.tilePosition(17, 0), animation.tilePosition(17, 200));
  for (let frame = 0; frame < 252; frame++) {
    const p = animation.tilePosition(17, frame);
    assert.ok(Number.isFinite(p.x) && Number.isFinite(p.y));
  }
  assert.equal(animation.completedNodes(0), 0);
  assert.equal(animation.completedNodes(55), 1);
  assert.equal(animation.completedNodes(95), 2);
  assert.equal(animation.completedNodes(135), 3);
});
