import kaboom from "kaboom";

kaboom({
  background: [0, 0, 255],
});

let isJumping;

loadSprite("ground2", "./sprites/ground2.png");
loadSprite("crab", "./sprites/crab.png");
loadSprite("ladder", "./sprites/ladder.png");
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

// CONSTANTS
const SPEED = 220;
const JUMP_STRENGTH = height() / 1.3;

scene("game", () => {
  const levelLayout = [
    "                                        ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                ###                     ",
    "                                        ",
    "                                        ",
    "######                   ##             ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                   #######              ",
    "                                        ",
    "                                        ",
    "          ###                           ",
    "                                        ",
    "                                        ",
    "                                        ",
    "                                E       ",
    "####################################### ",
  ];

  addLevel(levelLayout, {
    width: width() / 40,
    height: height() / 20,
    "#": () => [
      sprite("ground2"),
      scale(0.2),
      area(0.5),
      solid(),
      origin("topleft"),
      "ground",
    ],
    E: () => [
      sprite("crab"),
      scale(0.2),
      area(),
      solid(),
      body(),
      origin("bot"),
      "enemy",
    ],
  });

  const player = add([
    sprite("player"),
    pos(width() / 2, height() / 2),
    scale(0.5),
    origin("center"),
    body(),
    area({ height: 160 }),
    "player",
  ]);

  player.play("idle");

  keyDown("right", () => {
    if (player.curAnim() !== "run-side" && player.isGrounded()) {
      player.play("run-side");
    }
    player.flipX(false);
    player.move(SPEED, 0);
  });

  keyRelease("right", () => {
    player.play("idle");
  });

  keyDown("left", () => {
    if (player.curAnim() !== "run-side" && player.isGrounded()) {
      player.play("run-side");
    }
    player.flipX(true);
    player.move(-SPEED, 0);
  });

  keyRelease("left", () => {
    player.play("idle");
    player.flipX(true);
  });

  keyDown("space", () => {
    if (player.isGrounded()) {
      player.jump(JUMP_STRENGTH);
    }
    player.play("jump");
    isJumping = true;
  });

  keyDown("m", () => {
    if (player.isGrounded()) {
      player.jump(JUMP_STRENGTH * 1.5);
    }
    player.play("power-jump");
    isJumping = true;
  });

  // enemy collisions
  action("enemy", (e) => {
    e.move(-200, 0);
    cleanup();
  });

  // action("player", (player) => {
  //   if (!player.isGrounded()) {
  //     player.play("jump");
  //   }
  // });

  player.collides("enemy", (e) => {
    if (isJumping) {
      destroy(e);
      shake(5);
    } else {
      destroy(player);
      shake(5);
    }
  });

  player.collides("ground", () => {
    if (player.curAnim() !== "run-side") {
      player.play("idle");
    }
  });
});

go("game");
