import { loadLevel } from './levels';
import { countdown } from './functions';
import actions from './actions';
import collisions from './collisions';
import keys from './keys';
import { darkScifi } from '.';

let mainTheme;

export default function Game(level = 1, scoreValue = 0, timeLeft = 120) {
  let SPEED = 220;
  const JUMP_STRENGTH = 800;

  if (darkScifi) {
    darkScifi.pause();
  }

  if (!mainTheme) {
    mainTheme = play('main_theme', {
      loop: true,
    });
  }

  if (level === 1) {
    mainTheme.play();
  }

  // ADD BACKROUND

  loadLevel(level);
  countdown(timeLeft, mainTheme);

  const player = add([
    sprite('player'),
    pos(10, 10),
    scale(0.5),
    origin('center'),
    body(),
    area({ height: 160 }),
    'player',
  ]);

  // score
  const score = add([
    text(`Samples: ${scoreValue}`, { font: 'sinko', size: 30 }),

    pos(12, 60),
    { value: scoreValue },
    fixed(),
  ]);

  actions(player, mainTheme);
  collisions(player, score, SPEED, level, mainTheme);
  keys(player, SPEED, JUMP_STRENGTH);

  player.play('idle');
}
