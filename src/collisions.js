import { addOverlay } from "./functions";
import { ttt } from "./functions";
export default function collisions(player, score, SPEED, level, timeLeft) {
  onCollide("enemy", "right-flag", (e) => {
    if (e.speed > 0) {
      e.speed = -e.speed;
    }
  });

  onCollide("enemy", "left-flag", (e) => {
    if (e.speed < 0) {
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
      addOverlay();

      wait(0.8, () => {
        go("game-over");
      });
    }
  });

  player.collides("lightning", () => {
    shake(4);
    SPEED -= 20;
    wait(10, () => {
      SPEED += 20;
    });
  });

  player.collides("ground", () => {
    if (player.curAnim() !== "run-side") {
      player.play("idle");
    }
  });

  player.collides("endgame", () => {
    go("winner");
  });

  player.collides("ground", () => {
    if (player.curAnim() !== "run-side") {
      player.play("idle");
    }
  });

  player.collides("collect", (c) => {
    destroy(c);
    shake(1);
    score.value += 1;
    score.text = "Score:" + score.value;
  });

  player.collides("right-flag", (f) => {
    f.solid = false;
  });

  player.collides("left-flag", (f) => {
    f.solid = false;
  });

  player.collides("finish", (f) => {
    f.solid = false;
    const newLevel = (level += 1);
    go("game", newLevel, score.value, ttt);
  });
}
