// overlay
export function addOverlay() {
  add([
    uvquad(width(), height()),
    shader("spiral"),
    color([255, 0, 0]),
    opacity(0.2),
    fixed(),
    shake(5),
    "overlay",
  ]);
}

// exporting time left to be able to pass it to next level
export let ttt;

// countdown
export function countdown(timeLeft, mainTheme) {
  ttt = timeLeft;

  // display remaining time
  const countdown = add([
    text(ttt, { font: "sinko", size: 30 }),
    pos(12, 12),
    fixed(),
  ]);

  // update remaining time
  action(() => {
    ttt = ttt - dt();
    countdown.text = `Time: ${ttt.toFixed(2)}`;
    // when time runs out stop enemies and go to game-over screen
    if (ttt <= 0) {
      countdown.text = "Time is up!";

      every("enemy", (e) => {
        e.speed = 0;
      });

      shake(5);

      wait(1.5, () => {
        mainTheme.pause();
        go("game-over");
      });
    }
  });
}
