import { addOverlay } from './functions';
export default function actions(player, mainTheme) {
  // play lightning animation
  every('lightning', (l) => {
    l.play('wiggle');
  });

  // play collectible animation
  action('collect', (c) => {
    c.angle += 1;
  });

  // animate background objects
  // level 1
  action('objekt1', (o) => {
    o.angle += 1;
  });
  // level 2
  action('objekt2', (o) => {
    o.angle += 0.5;
  });
  action('objekt3', (o) => {
    o.angle -= 0.5;
  });

  // level 3
  let goingRight = true;
  action('objekt4', (o) => {
    if (o.pos.x < width() / 2 + 30 && goingRight) {
      o.pos.x += 1;
    } else if (o.pos.x > width() / 2 - 30) {
      goingRight = false;
      o.pos.x -= 1;
      if (o.pos.x <= width() / 2 - 29) {
        goingRight = true;
      }
    }
  });

  // move enemy and run animation
  action('enemy', (e) => {
    if (e.curAnim() !== 'walk') {
      e.play('walk');
    }
    e.move(e.speed, 0);
  });

  action('player', () => {
    // scroll camera on player movement
    var currCam = camPos();
    if (currCam.x < player.pos.x && currCam.x < 3800) {
      camPos(player.pos.x, currCam.y);
    }
    if (currCam.x > player.pos.x && currCam.x > width() / 2) {
      camPos(player.pos.x, currCam.y);
    }

    // call gameover when player falls out of screen bottom
    if (player.pos.y > height() - 50) {
      mainTheme.pause();
      play('scream', { volume: 0.5 });
      addOverlay();
      wait(0.2, () => {
        go('game-over');
      });
    }
  });
}
