import kaboom from 'kaboom';
import levelOneLayout, { levelThreeLayout, levelTwoLayout } from './levels';

kaboom({
  background: [0, 0, 255],
  width: 1920,
  height: 1080,
});

loadSprite('game-over', './sprites/game_over.png');
loadSprite('bg1', './sprites/bg1.png');
loadSprite('bg2', './sprites/bg2.png');
loadSprite('bg3', './sprites/bg3.png');
loadSprite('objekt1', './sprites/Objekt.png');
loadSprite('objekt2', './sprites/bg2-circle1.png');
loadSprite('objekt3', './sprites/bg2-circle2.png');
loadSprite('objekt4', './sprites/waves.png');
loadSprite('ground-blue', './sprites/Ground_blue.png');
loadSprite('ground-pink', './sprites/Ground_pink.png');
loadSprite('ground-purple', './sprites/Ground_purple.png');
loadSprite('ground-yellow', './sprites/Ground_yellow.png');
loadSprite('collect', './sprites/collect.png');
loadSprite('right-flag', './sprites/right-flag.png');
loadSprite('left-flag', './sprites/left-flag.png');
loadSprite('finish', './sprites/finish.png');
loadSprite('plant', './sprites/Plant.png');
loadSpriteAtlas('./sprites/Ground_blue.png', {
  groundBlue: {
    x: 0,
    y: 0,
    width: 700,
    height: 100,
    sliceX: 4,
  },
});
loadSpriteAtlas('./sprites/lightning.png', {
  lightning: {
    x: 0,
    y: 0,
    width: 500,
    height: 500,
    sliceX: 2,
    anims: {
      wiggle: { from: 0, to: 1, loop: true, speed: 15 },
    },
  },
});
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

scene('game', (level = 3, scoreValue = 0, timeLeft = 120) => {
  // ADD BACKROUND

  let levelLayout;

  if (level === 1) {
    levelLayout = levelOneLayout;
    add([sprite('bg1', { width: width(), height: height() }), fixed()]);
    add([
      sprite('objekt1'),
      pos(width() / 2 + 100, height() / 2 + 50),
      origin('center'),
      scale(0.7),
      rotate(0),
      fixed(),
      'objekt1',
    ]);
  } else if (level === 2) {
    add([sprite('bg2', { width: width(), height: height() }), fixed()]);
    add([
      sprite('objekt2'),
      pos(width() / 2, height() / 2),
      origin('center'),
      scale(0.7),
      rotate(0),
      fixed(),
      'objekt2',
    ]);
    add([
      sprite('objekt3'),
      pos(width() / 2 + 350, height() / 2),
      origin('center'),
      scale(0.7),
      rotate(0),
      fixed(),
      'objekt3',
    ]);
    levelLayout = levelTwoLayout;
  } else if (level === 3) {
    add([sprite('bg3', { width: width(), height: height() }), fixed()]);
    add([
      sprite('objekt4'),
      pos(width() / 2, height() - 100),
      fixed(),
      scale(0.8),
      origin('center'),
      'objekt4',
    ]);
    levelLayout = levelThreeLayout;
  }

  addLevel(levelLayout, {
    width: width() / 22,
    height: height() / 20,
    '#': () => [
      sprite('groundBlue'),
      scale(0.5),
      area(0.5),
      solid(),
      origin('topleft'),
      'ground',
    ],

    E: () => [
      sprite('crab'),
      scale(0.15),
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
      // solid(),
      rotate(0),
      origin('center'),
      'collect',
    ],
    '(': () => [sprite('lightning'), scale(0.2), origin('center'), 'lightning'],
    '{': () => [sprite('plant'), scale(0.2), origin('center'), 'finish'],
    '|': () => [
      sprite('right-flag'),
      scale(0.2),
      area(),
      solid(),
      opacity(0),
      'right-flag',
    ],
    '@': () => [
      sprite('left-flag'),
      scale(0.2),
      area(),
      solid(),
      opacity(0),
      'left-flag',
    ],
    '&': () => [
      sprite('finish'),
      scale(0.2),
      area(),
      solid(),
      opacity(0),
      'finish',
    ],
  });

  const player = add([
    sprite('player'),
    pos(10, 10),
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
  let ttt = timeLeft;

  const countdown = add([text(ttt), pos(12, 12), fixed()]);

  // overlay
  function addOverlay() {
    add([
      uvquad(width(), height()),
      shader('spiral'),
      color([255, 0, 0]),
      opacity(0.2),
      fixed(),
      shake(5),
    ]);
  }

  action(() => {
    ttt = ttt - dt();
    countdown.text = ttt.toFixed(2);
    if (ttt <= 0) {
      countdown.text = 'Time is up!';

      every('enemy', (e) => {
        e.speed = 0;
      });

      shake(5);

      wait(1.5, () => {
        go('game-over');
      });
      countdown.text = 'Game over!';
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

  every('lightning', (l) => {
    l.play('wiggle');
  });

  action('enemy', (e) => {
    if (e.curAnim() !== 'walk') {
      e.play('walk');
    }
    e.move(e.speed, 0);

    // if (e.pos.x >= width() - 100 && e.speed > 0) {
    //   e.speed = -e.speed;
    // } else if (e.pos.x <= 0 + 100 && e.speed < 0) {
    //   e.speed = -e.speed;
    // }
  });

  action('objekt1', (o) => {
    o.angle += 1;
  });
  action('objekt2', (o) => {
    o.angle += 0.5;
  });
  action('objekt3', (o) => {
    o.angle -= 0.5;
  });

  let goingRight = true;
  action('objekt4', (o) => {
    if (o.pos.x < width() / 2 + 30 && goingRight) {
      o.pos.x += 1;
    } else if (o.pos.x > width() / 2 - 30) {
      goingRight = false;
      o.pos.x -= 1;
      if (o.pos.x <= width() / 2 - 29) {
        goingRight = true;
      }
    }
  });

  onCollide('enemy', 'right-flag', (e) => {
    if (e.speed > 0) {
      e.speed = -e.speed;
    }
  });

  onCollide('enemy', 'left-flag', (e) => {
    if (e.speed < 0) {
      e.speed = -e.speed;
    }
  });

  onCollide('enemy', 'enemy', (e1, e2) => {
    if (e1.speed === 200) {
      e1.speed = -200;
    }

    e2.speed = -e2.speed;
  });

  onCollide('player', 'lightning', () => {
    debug.log('hovnoooo');
  });

  player.collides('enemy', (e) => {
    if (!player.isGrounded()) {
      destroy(e);
      shake(5);
    } else {
      destroy(player);
      addOverlay();

      wait(0.8, () => {
        go('game-over');
      });
    }
  });

  player.collides('ground', () => {
    if (player.curAnim() !== 'run-side') {
      player.play('idle');
    }
  });

  action('player', () => {
    var currCam = camPos();
    if (currCam.x < player.pos.x) {
      camPos(player.pos.x, currCam.y);
    }
    if (currCam.x > player.pos.x && currCam.x > width() / 2) {
      camPos(player.pos.x, currCam.y);
    }

    // if (player.pos.x > 4930) {
    //   const newLevel = (level += 1);
    //   go('game', newLevel, score.value, ttt);
    // }

    if (player.pos.y > height() - 50) {
      addOverlay();
      wait(0.2, () => {
        go('game-over');
      });
    }
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

  player.collides('right-flag', (f) => {
    f.solid = false;
  });

  player.collides('left-flag', (f) => {
    f.solid = false;
  });

  player.collides('finish', (f) => {
    f.solid = false;
    const newLevel = (level += 1);
    go('game', newLevel, score.value, ttt);
  });

  action('collect', (c) => {
    c.angle += 1;
  });
});

scene('game-over', () => {
  add([
    sprite('game-over', {
      width: width(),
      height: height(),
    }),
    fixed(),
  ]);
  onKeyPress('space', () => {
    go('game');
  });
});

go('game');
