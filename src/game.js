import { loadLevel } from "./levels";
import { countdown } from "./functions";
import actions from "./actions";
import collisions from "./collisions";
import keys from "./keys";

export default function Game(level = 1, scoreValue = 0, timeLeft = 120) {
  let SPEED = 220;
  const JUMP_STRENGTH = 800;

  // ADD BACKROUND

  loadLevel(level);
  countdown(timeLeft);

  const player = add([
    sprite("player"),
    pos(10, 10),
    scale(0.5),
    origin("center"),
    body(),
    area({ height: 160 }),
    "player",
  ]);

  // score
  const score = add([
    text(`Samples: ${scoreValue}`, { font: "sinko", size: 30 }),

    pos(12, 60),
    { value: scoreValue },
    fixed(),
  ]);

  actions(player, SPEED, JUMP_STRENGTH);
  collisions(player, score, SPEED, level, timeLeft);
  keys(player, SPEED, JUMP_STRENGTH);

  player.play("idle");
}
