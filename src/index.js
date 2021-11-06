import kaboom from 'kaboom';
import levelOneLayout, { levelThreeLayout, levelTwoLayout } from './levels';

kaboom({
  background: [0, 0, 255],
});

loadSprite('game-over', './sprites/game_over.png');
loadSprite('bg1', './sprites/bg1.png');
loadSprite('bg2', './sprites/bg2.png');
loadSprite('bg3', './sprites/bg3.png');
loadSprite('ground-blue', './sprites/Ground_blue.png');
loadSprite('ground-pink', './sprites/Ground_pink.png');
loadSprite('ground-purple', './sprites/Ground_purple.png');
loadSprite('ground-yellow', './sprites/Ground_yellow.png');
loadSprite('collect', './sprites/collect.png');
loadSpriteAtlas('./sprites/run.png', {
  player: {
    x: 0,
    y: 0,
    width: 900,
    height: 160,
    sliceX: 9,
    anims: {
      'run-side': { from: 1, to: 6, loop: true, speed: 15 },
      idle: { from: 0, to: 0 },
      jump: { from: 7, to: 7 },
      'power-jump': { from: 8, to: 8 },
    },
  },
});
loadSpriteAtlas('./sprites/crab1.png', {
  crab: {
    x: 0,
    y: 0,
    width: 1000,
    height: 380,
    sliceX: 2,
    anims: {
      walk: { from: 0, to: 1, loop: true, speed: 3 },
    },
  },
});

// CONSTANTS
const SPEED = 220;
const JUMP_STRENGTH = height() / 1.3;

scene('game', (level = 1, scoreValue = 0) => {
  // ADD BACKROUND

  let levelLayout;

  if (level === 1) {
    levelLayout = levelOneLayout;
    add([sprite('bg1', { width: width(), height: height() }), fixed()]);
  } else if (level === 2) {
    add([sprite('bg2', { width: width(), height: height() }), fixed()]);
    levelLayout = levelTwoLayout;
  } else if (level === 3) {
    add([sprite('bg3', { width: width(), height: height() }), fixed()]);
    levelLayout = levelThreeLayout;
  }

  addLevel(levelLayout, {
    width: width() / 20,
    height: height() / 20,
    '#': () => [
      sprite('ground-purple'),
      scale(0.3),
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
      pos(),
      origin('bot'),
      { speed: 200 },
      'enemy',
    ],
    $: () => [
      sprite('collect'),
      scale(0.2),
      area(),
      solid(),
      rotate(0),
      origin('center'),
      'collect',
    ],
  });

  const player = add([
    sprite('player'),
    pos(width() / 2, height() / 2),
    scale(0.5),
    origin('center'),
    body(),
    area({ height: 160 }),
    'player',
  ]);

  // score
  const score = add([
    text(`Score: ${scoreValue}`),
    pos(12, 120),
    { value: scoreValue },
    fixed(),
  ]);

  // countdown
  let ttt = 80;

  const timer = add([text(ttt), pos(12, 12), fixed()]);

  action(() => {
    ttt = ttt - dt();
    timer.text = ttt.toFixed(2);
    if (ttt <= 0) {
      timer.text = 'Time is up!';

      every('enemy', (e) => {
        e.speed = 0;
      });

      shake(5);

      wait(1.5, () => {
        go('game-over');
      });
      timer.text = 'Game over!';
    }
  });

  player.play('idle');

  keyDown('right', () => {
    if (player.curAnim() !== 'run-side' && player.isGrounded()) {
      player.play('run-side');
    }
    player.flipX(false);
    player.move(SPEED, 0);
  });

  keyRelease('right', () => {
    player.play('idle');
  });

  keyDown('left', () => {
    if (player.curAnim() !== 'run-side' && player.isGrounded()) {
      player.play('run-side');
    }
    player.flipX(true);
    player.move(-SPEED, 0);
  });

  keyRelease('left', () => {
    player.play('idle');
    player.flipX(true);
  });

  keyDown('space', () => {
    if (player.isGrounded()) {
      player.jump(JUMP_STRENGTH);
    }
    player.play('jump');
  });

  keyDown('m', () => {
    if (player.isGrounded()) {
      player.jump(JUMP_STRENGTH * 1.5);
    }
    player.play('power-jump');
  });

  action('enemy', (e) => {
    if (e.curAnim() !== 'walk') {
      e.play('walk');
    }
    e.move(e.speed, 0);

    if (e.pos.x >= width() - 100 && e.speed > 0) {
      e.speed = -e.speed;
    } else if (e.pos.x <= 0 + 100 && e.speed < 0) {
      e.speed = -e.speed;
    }
  });

  onCollide('enemy', 'enemy', (e1, e2) => {
    if (e1.speed === 200) {
      e1.speed = -200;
    }

    e2.speed = -e2.speed;
  });

  player.collides('enemy', (e) => {
    if (!player.isGrounded()) {
      destroy(e);
      shake(5);
    } else {
      destroy(player);
      shake(5);
      wait(1.5, () => {
        go('game-over');
      });
    }
  });

  player.collides('ground', () => {
    if (player.curAnim() !== 'run-side') {
      player.play('idle');
    }
  });

  action('player', (p) => {
    var currCam = camPos();
    if (currCam.x < player.pos.x && currCam.x < 4200) {
      camPos(player.pos.x, currCam.y);
    }
    if (currCam.x > player.pos.x && currCam.x > width() / 2) {
      camPos(player.pos.x, currCam.y);
    }

    if (player.pos.x > 4930) {
      const newLevel = (level += 1);
      go('game', newLevel, score.value);
    }

    debug.log(p.pos.y);
  });

  player.collides('ground', () => {
    if (player.curAnim() !== 'run-side') {
      player.play('idle');
    }
  });

  player.collides('collect', (c) => {
    destroy(c);
    shake(1);
    score.value += 1;
    score.text = 'Score:' + score.value;
  });

  action('collect', (c) => {
    c.angle += 1;
  });
});

scene('game-over', () => {
  add([sprite('game-over', { width: width(), height: height() }), fixed()]);
});

go('game');
