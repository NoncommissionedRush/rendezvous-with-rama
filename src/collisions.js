import { addOverlay } from "./functions";
import { ttt } from "./functions";

export default function collisions(player, score, level, mainTheme) {
  // change enemy direction on collision with end of platform
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

  // change enemy direction on collision with another enemy
  onCollide("enemy", "enemy", (e1, e2) => {
    if (e1.speed === 200) {
      e1.speed = -200;
    }
    e2.speed = -e2.speed;
  });

  // player collisions with enemy
  player.collides("enemy", (e) => {
    // kill crab when jumping
    if (!player.isGrounded()) {
      play("crab_jump");
      destroy(e);
      shake(5);
    } else {
      // kill player when not jumping
      play("crab_collision");
      destroy(player);
      addOverlay();

      wait(0.8, () => {
        // stop the music and go to game-over screen
        mainTheme.pause();
        go("game-over");
      });
    }
  });

  // slow down player for 3 seconds when he collides with lightning
  player.collides("lightning", () => {
    play("flash_collision");
    shake(4);
    player.speed -= 100;
    wait(3, () => {
      player.speed += 100;
    });
  });

  // stop jumping animation when player hits ground
  player.collides("ground", () => {
    if (player.curAnim() !== "run-side") {
      player.play("idle");
    }
  });
  player.collides("ground", () => {
    if (player.curAnim() !== "run-side") {
      player.play("idle");
    }
  });

  // player collision with collectible
  player.collides("collect", (c) => {
    play("collect");
    destroy(c);
    shake(1);
    score.value += 1;
    score.text = "Samples:" + score.value;
  });

  // allow player to pass through flags designating end of platforms
  player.collides("right-flag", (f) => {
    f.solid = false;
  });
  player.collides("left-flag", (f) => {
    f.solid = false;
  });

  // go to next level on collision with finish flag
  player.collides("finish", (f) => {
    play("finish", {
      volume: 0.2,
    });
    f.solid = false;
    const newLevel = (level += 1);
    go("game", newLevel, score.value, ttt);
  });

  // go to winner screen on collision with plant
  player.collides("endgame", () => {
    play("finish", {
      volume: 0.2,
    });
    go("winner");
  });
}
