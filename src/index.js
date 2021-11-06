import kaboom from "kaboom";

kaboom();

loadSprite("mario", "./sprites/mario.png");
loadSprite("ground2", "./sprites/ground2.png");
loadSprite("ladder", "./sprites/ladder.png");

// CONSTANTS
const SPEED = 300;
const JUMP_STRENGTH = 700;

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
    "                                        ",
    "           ###                          ",
    "                                        ",
    "                                        ",
    "                                        ",
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
    "@": () => [sprite("ladder"), scale(0.5), "ladder"],
  });

  const mario = add([
    sprite("mario"),
    pos(width() / 2, height() / 2),
    scale(0.1),
    origin("center"),
    body(),
    area(),
    "mario",
  ]);

  keyDown("right", () => {
    mario.move(SPEED, 0);
  });

  keyDown("left", () => {
    mario.move(-SPEED, 0);
  });

  keyPress("space", () => {
    if (mario.isGrounded()) {
      mario.jump(JUMP_STRENGTH);
    }
  });
});

go("game");
