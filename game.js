import kaboom from "kaboom";

kaboom();

loadSprite("mario", "./sprites/mario.png");

scene("game", () => {
  add([
    sprite("mario"),
    scale(0.1),
    pos(width() / 2, height() / 2),
    area(),
    "mario",
  ]);
});

go("game");
