import { addOverlay } from './functions';
import { ttt } from './functions';
export default function collisions(player, score, SPEED, level, mainTheme) {
  onCollide('enemy', 'right-flag', (e) => {
    if (e.speed > 0) {
      e.speed = -e.speed;
    }
  });

  onCollide('enemy', 'left-flag', (e) => {
    if (e.speed < 0) {
      e.speed = -e.speed;
    }
  });

  onCollide('enemy', 'enemy', (e1, e2) => {
    if (e1.speed === 200) {
      e1.speed = -200;
    }

    e2.speed = -e2.speed;
  });

  player.collides('enemy', (e) => {
    if (!player.isGrounded()) {
      play('crab_jump');
      destroy(e);
      shake(5);
    } else {
      play('crab_collision');
      destroy(player);
      addOverlay();

      wait(0.8, () => {
        mainTheme.pause();
        go('game-over');
      });
    }
  });

  player.collides('lightning', () => {
    play('flash_collision');
    shake(4);
    SPEED -= 20;
    wait(10, () => {
      SPEED += 20;
    });
  });

  player.collides('ground', () => {
    if (player.curAnim() !== 'run-side') {
      player.play('idle');
    }
  });

  player.collides('endgame', () => {
    play('finish', {
      volume: 0.2,
    });
    go('winner');
  });

  player.collides('ground', () => {
    if (player.curAnim() !== 'run-side') {
      player.play('idle');
    }
  });

  player.collides('collect', (c) => {
    play('collect');
    destroy(c);
    shake(1);
    score.value += 1;
    score.text = 'Samples:' + score.value;
  });

  player.collides('right-flag', (f) => {
    f.solid = false;
  });

  player.collides('left-flag', (f) => {
    f.solid = false;
  });

  player.collides('finish', (f) => {
    play('finish', {
      volume: 0.2,
    });
    f.solid = false;
    const newLevel = (level += 1);
    go('game', newLevel, score.value, ttt);
  });
}
