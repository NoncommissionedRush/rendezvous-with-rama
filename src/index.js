import kaboom from "kaboom";

kaboom({
  background: [0, 0, 255],
});

loadSprite("ground2", "./sprites/ground2.png");
loadSprite("bg", "./sprites/bg1.png");
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
  layers(["bg", "game", "ui"], "game");

  const levelLayout = [
    "                                                    ",
    "                                                    ",
    "                                                    ",
    "                                                    ",
    "                                                    ",
    "                              ##############        ",
    "                                                    ",
    "######                   ##                         ",
    "                                                    ",
    "                                                    ",
    "                                                    ",
    "                 #########                          ",
    "             ##                                     ",
    "                                                    ",
    "          #                                         ",
    "                                                    ",
    "                                                    ",
    "                                                    ",
    "                                E                   ",
    "#######################################         ####",
  ];

  add([sprite("bg"), { width: 200, tiled: true }, scale(0.2)]);

  addLevel(levelLayout, {
    width: width() / 20,
    height: height() / 20,
    "#": () => [
      sprite("ground2"),
      scale(0.2),
      area(0.5),
      solid(),
      origin("topleft"),
      layer("game"),
      "ground",
    ],
    E: () => [
      sprite("crab"),
      scale(0.2),
      area(),
      solid(),
      body(),
      pos(),
      origin("bot"),
      { speed: 200 },
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

  // score
  // const scoreLabel = add([
  //   text(score),
  //   pos(30, 6),
  //   layer('ui'),
  //   {
  //     value: score,
  //   },
  // ]);

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
  });

  keyDown("m", () => {
    if (player.isGrounded()) {
      player.jump(JUMP_STRENGTH * 1.5);
    }
    player.play("power-jump");
  });

  action("enemy", (e) => {
    e.move(e.speed, 0);

    if (e.pos.x >= width() - 100 && e.speed > 0) {
      e.speed = -e.speed;
    } else if (e.pos.x <= 0 + 100 && e.speed < 0) {
      e.speed = -e.speed;
    }
  });

  onCollide("enemy", "enemy", (e1, e2) => {
    if (e1.speed === 200) {
      e1.speed = -200;
    }

    e2.speed = -e2.speed;
  });

  player.collides("enemy", (e) => {
    if (!player.isGrounded()) {
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
  action("player", () => {
    var currCam = camPos();
    if (currCam.x < player.pos.x) {
      camPos(player.pos.x, currCam.y);
    }
    if (currCam.x > player.pos.x && currCam.x > width() / 2) {
      camPos(player.pos.x, currCam.y);
    }
  });

  player.collides("ground", () => {
    if (player.curAnim() !== "run-side") {
      player.play("idle");
    }
  });
});

go("game");
