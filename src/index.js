import kaboom from 'kaboom';

kaboom();

loadSprite('mario', './sprites/mario.png');
loadSprite('ground', './sprites/ground.png');

scene('game', () => {
  const levelLayout = [
    '          ',
    '          ',
    '          ',
    '          ',
    '          ',
    '          ',
    '##########',
  ];

  addLevel(levelLayout, {
    width: width() / 10,
    height: height() / 7,
    '#': () => [
      sprite('ground'),
      scale(0.5),
      area(0.5),
      solid(),
      origin('center'),
      'ground',
    ],
  });

  add([text('hello'), pos(120, 80)]);

  const mario = add([
    sprite('mario'),
    pos(width() / 2, height() / 2),
    scale(0.1),
    origin('center'),
    body(),
    area(),
    'mario',
  ]);

  keyDown('right', () => {
    mario.move(200, 0);
  });

  keyDown('left', () => {
    mario.move(-200, 0);
  });

  keyDown('space', () => {
    mario.jump();
  });
});

go('game');
