// overlay
export function addOverlay() {
  add([
    uvquad(width(), height()),
    shader('spiral'),
    color([255, 0, 0]),
    opacity(0.2),
    fixed(),
    shake(5),
    'overlay',
  ]);
}

export let ttt;

export function countdown(timeLeft, mainTheme) {
  // countdown
  ttt = timeLeft;

  const countdown = add([
    text(ttt, { font: 'sinko', size: 30 }),
    pos(12, 12),
    fixed(),
  ]);

  action(() => {
    ttt = ttt - dt();
    countdown.text = `Time: ${ttt.toFixed(2)}`;
    if (ttt <= 0) {
      countdown.text = 'Time is up!';

      every('enemy', (e) => {
        e.speed = 0;
      });

      shake(5);

      wait(1.5, () => {
        mainTheme.pause();
        go('game-over');
      });
    }
  });
}
