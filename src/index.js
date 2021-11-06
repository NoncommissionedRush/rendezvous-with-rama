import kaboom from 'kaboom';

kaboom({
  background: [0, 0, 255],
});

let isJumping;

loadSprite('mario', './sprites/mario.png');
loadSprite('ground2', './sprites/ground2.png');
loadSprite('crab', './sprites/crab.png');
loadSprite('ladder', './sprites/ladder.png');
loadSpriteAtlas('./sprites/run.png', {
  player: {
    x: 0,
    y: 0,
    width: 600,
    height: 250,
    sliceX: 6,
    anims: {
      'run-side': { from: 0, to: 5, loop: true, speed: 15 },
      idle: { from: 0, to: 0 },
    },
  },
});

// CONSTANTS
const SPEED = 220;
const JUMP_STRENGTH = height() / 1.3;

scene('game', () => {
  const levelLayout = [
    '                                        ',
    '                                        ',
    '                                        ',
    '                                        ',
    '                ###                     ',
    '                                        ',
    '                                        ',
    '######                   ##             ',
    '                                        ',
    '                                        ',
    '                                        ',
    '                   #######              ',
    '                                        ',
    '                                        ',
    '                                        ',
    '           ###                          ',
    '                                        ',
    '                                        ',
    '                                E       ',
    '####################################### ',
  ];

  addLevel(levelLayout, {
    width: width() / 40,
    height: height() / 20,
    '#': () => [
      sprite('ground2'),
      scale(0.2),
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
    sprite('player'),
    pos(width() / 2, height() / 2),
    scale(0.5),
    origin('center'),
    body(),
    area(),
    'player',
  ]);

  mario.play('idle');

  keyDown('right', () => {
    if (mario.curAnim() !== 'run-side') {
      mario.play('run-side');
    }
    mario.flipX(false);
    mario.move(SPEED, 0);
  });

  keyRelease('right', () => {
    mario.play('idle');
  });

  keyDown('left', () => {
    if (mario.curAnim() !== 'run-side') {
      mario.play('run-side');
    }
    mario.flipX(true);
    mario.move(-SPEED, 0);
  });

  keyRelease('left', () => {
    mario.play('idle');
    mario.flipX(true);
  });

  keyDown('space', () => {
    if (mario.isGrounded()) {
      mario.jump(JUMP_STRENGTH);
    }
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
