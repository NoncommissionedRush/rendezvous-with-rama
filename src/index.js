import kaboom from "kaboom";
import levelOneLayout, { levelThreeLayout, levelTwoLayout } from "./levels";
import Game from "./game";

kaboom({
  background: [0, 0, 255],
  width: 1425,
  height: 752,
});

loadSprite("game-over", "./sprites/game_over.png");
loadSprite("bg1", "./sprites/bg1.png");
loadSprite("bg2", "./sprites/bg2.png");
loadSprite("bg3", "./sprites/bg3.png");
loadSprite("objekt1", "./sprites/objekt.png");
loadSprite("objekt2", "./sprites/bg2-circle1.png");
loadSprite("objekt3", "./sprites/bg2-circle2.png");
loadSprite("objekt4", "./sprites/waves.png");
loadSprite("ground-pink", "./sprites/ground_pink.png");
loadSprite("ground-purple", "./sprites/ground_purple.png");
loadSprite("ground-yellow", "./sprites/ground_yellow.png");
loadSprite("collect", "./sprites/collect.png");
loadSprite("right-flag", "./sprites/right-flag.png");
loadSprite("left-flag", "./sprites/left-flag.png");
loadSprite("finish", "./sprites/finish.png");
loadSprite("plant", "./sprites/plant.png");
loadSprite("winner", "./sprites/winner.png");
loadSpriteAtlas("./sprites/ground_blue.png", {
  groundBlue: {
    x: 0,
    y: 0,
    width: 700,
    height: 100,
    sliceX: 4,
  },
});
loadSpriteAtlas("./sprites/lightning.png", {
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
loadSpriteAtlas("./sprites/run.png", {
  player: {
    x: 0,
    y: 0,
    width: 900,
    height: 160,
    sliceX: 9,
    anims: {
      "run-side": { from: 1, to: 6, loop: true, speed: 15 },
      idle: { from: 0, to: 0 },
      jump: { from: 7, to: 7 },
      "power-jump": { from: 8, to: 8 },
    },
  },
});
loadSpriteAtlas("./sprites/crab1.png", {
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
let SPEED = 220;
const JUMP_STRENGTH = height() / 1.3;

scene("game", Game);

scene("game-over", () => {
  add([
    sprite("game-over", {
      width: width(),
      height: height(),
    }),
    fixed(),
  ]);
  onKeyPress("space", () => {
    go("game");
  });
});

scene("winner", () => {
  add([sprite("winner", { width: width(), height: height() }), fixed()]);
});

go("game");
