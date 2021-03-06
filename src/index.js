import kaboom from 'kaboom';
import Game from './game';

// kaboom init
kaboom({
  background: [0, 0, 255],
  width: 1425,
  height: 752,
});

//  load sounds
loadSound('collect', './sounds/collect.mp3');
loadSound('crab_collision', './sounds/crab_collision.mp3');
loadSound('crab_jump', './sounds/crab_jump.mp3');
loadSound('dark_scifi', './sounds/dark_scifi.mp3');
loadSound('finish', './sounds/finish.mp3');
loadSound('flash_collision', './sounds/flash_collision.mp3');
loadSound('main_theme', './sounds/main_theme.mp3');
loadSound('scream', './sounds/scream.mp3');

// load images
loadSprite('game-over', './sprites/game_over.png');
loadSprite('main', './sprites/rama_main.jpg');
loadSprite('intro', './sprites/rama_intro.png');
loadSprite('objectives', './sprites/game_objectives.png');

loadSprite('bg1', './sprites/bg1.png');
loadSprite('bg2', './sprites/bg2.png');
loadSprite('bg3', './sprites/bg3.png');
loadSprite('objekt1', './sprites/Objekt.png');
loadSprite('objekt2', './sprites/bg2-circle1.png');
loadSprite('objekt3', './sprites/bg2-circle2.png');
loadSprite('objekt4', './sprites/waves.png');
loadSprite('collect', './sprites/collect.png');
loadSprite('finish', './sprites/finish.png');
loadSprite('plant', './sprites/Plant.png');
loadSprite('winner', './sprites/winner.png');
loadSprite('groundBlue', './sprites/Ground_blue.png', { sliceX: 3 });
loadSprite('groundPurple', './sprites/Ground_purple.png', { sliceX: 3 });
loadSprite('groundYellow', './sprites/Ground_yellow.png', { sliceX: 3 });
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

// game scene
scene('game', Game);

// game-over scene
export let darkScifi;
scene('game-over', () => {
  darkScifi = play('dark_scifi', { loop: true });
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

// winner scene
scene('winner', () => {
  add([sprite('winner', { width: width(), height: height() }), fixed()]);
  onKeyPress('space', () => {
    go('main');
  });
});

// main scene
scene('main', () => {
  add([sprite('main', { width: width(), height: height() }), fixed()]);
  onKeyPress('space', () => {
    go('intro');
  });
});

// intro scene
scene('intro', () => {
  add([sprite('intro', { width: width(), height: height() }), fixed()]);
  onKeyPress('space', () => {
    go('objectives');
  });
});

// objectives scene
scene('objectives', () => {
  add([sprite('objectives', { width: width(), height: height() }), fixed()]);
  onKeyPress('space', () => {
    go('game');
  });
});

// on load
go('main');
focus();
