import { loadLevel } from './levels';
import { countdown } from './functions';
import { showLevel } from './functions';
import actions from './actions';
import collisions from './collisions';
import keys from './keys';
import { darkScifi } from '.';

let mainTheme;

export default function Game(level = 1, scoreValue = 0, timeLeft = 120) {
  // stop the game-over music if it is playing
  if (darkScifi) {
    darkScifi.pause();
  }

  // do not play main theme again when restarting game after finishing
  if (!mainTheme) {
    mainTheme = play('main_theme', {
      loop: true,
    });
  }

  // do not play main theme again when passing to next level
  if (level === 1) {
    mainTheme.play();
  }

  // load level and countdown
  loadLevel(level);
  countdown(timeLeft, mainTheme);

  // add player to screen
  const player = add([
    sprite('player'),
    pos(10, 10),
    scale(0.5),
    origin('center'),
    body(),
    area({ height: 160 }),
    {
      // initial speed
      speed: 220,
      // initial jump strength
      jump_strength: 800,
    },
    'player',
  ]);
  player.play('idle');

  // add scoreboard
  const score = add([
    text(`Samples: ${scoreValue}`, { font: 'sinko', size: 30 }),
    pos(20, 60),
    { value: scoreValue },
    fixed(),
  ]);

  // load actions, collisions and keys
  actions(player, mainTheme);
  collisions(player, score, level, mainTheme);
  keys(player);

  // show current level
  showLevel(level);
}
