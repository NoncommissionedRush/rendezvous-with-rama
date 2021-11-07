export default function keys(player, SPEED, JUMP_STRENGTH) {
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
    player.play("power-jump");
  });

  //   keyDown("m", () => {
  //     if (player.isGrounded()) {
  //       player.jump(JUMP_STRENGTH * 1.5);
  //     }
  //     player.play("power-jump");
  //   });
}
