import kaboom from 'kaboom';

kaboom({
  background: [0, 0, 255],
});

loadSprite('mario', './sprites/mario.png');
loadSprite('ground2', './sprites/ground2.png');
loadSprite('crab', './sprites/crab.png');

let isJumping;

scene('game', () => {
  const levelLayout = [
    '          ',
    '          ',
    '          ',
    '###       ',
    '          ',
    '       E  ',
    '##########',
  ];

  addLevel(levelLayout, {
    width: width() / 10,
    height: height() / 7,
    '#': () => [
      sprite('ground2'),
      scale(0.5),
      area(0.5),
      solid(),
      origin('topleft'),
      'ground',
    ],
    E: () => [
      sprite('crab'),
      scale(0.2),
      area(),
      solid(),
      body(),
      origin('bot'),
      'enemy',
    ],
  });

  const mario = add([
    sprite('mario'),
    pos(width() / 2, height() / 2),
    scale(0.1),
    origin('center'),
    body(),
    area(),
    'mario',
  ]);

  // player moves
  keyDown('right', () => {
    mario.move(200, 0);
  });

  keyDown('left', () => {
    mario.move(-200, 0);
  });

  keyDown('space', () => {
    mario.jump();
    isJumping = true;
  });

  // enemy collisions
  action('enemy', (e) => {
    e.move(-200, 0);
    cleanup();
  });

  mario.collides('enemy', (e) => {
    if (isJumping) {
      destroy(e);
      shake(5);
    } else {
      destroy(mario);
      shake(5);
    }
  });
});

go('game');
