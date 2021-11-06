import kaboom from 'kaboom';

kaboom();

loadSprite('mario', './sprites/mario.png');

scene('game', () => {
  const level = [
    '          ',
    '          ',
    '          ',
    '          ',
    '          ',
    '          ',
    '==========',
  ];

  const levelCfg = {
    width: 20,
    height: 20,
    '=': [sprite('ground'), solid()],
  };

  add([text('1256xx'), pos(120, 80)]);

  const mario = add([
    sprite('mario'),
    pos(width() / 2, height() / 2),
    scale(0.1),
    origin('center'),
    // body(),
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
