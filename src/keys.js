export default function keys(player) {
  keyDown("right", () => {
    // do not restart the animation if it is already playing
    if (player.curAnim() !== "run-side" && player.isGrounded()) {
      player.play("run-side");
    }
    player.flipX(false);
    player.move(player.speed, 0);
  });

  // go back to idle animation on key release
  keyRelease("right", () => {
    player.play("idle");
  });

  keyDown("left", () => {
    if (player.curAnim() !== "run-side" && player.isGrounded()) {
      player.play("run-side");
    }
    player.flipX(true);
    player.move(-player.speed, 0);
  });

  keyRelease("left", () => {
    player.play("idle");
    player.flipX(true);
  });

  // jump
  keyDown("space", () => {
    if (player.isGrounded()) {
      player.jump(player.jump_strength);
    }
    player.play("power-jump");
  });
}
