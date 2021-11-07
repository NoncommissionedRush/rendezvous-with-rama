import { addOverlay } from "./functions";
export default function actions(player, SPEED, JUMP_STRENGTH) {
  every("lightning", (l) => {
    l.play("wiggle");
  });

  action("objekt1", (o) => {
    o.angle += 1;
  });
  action("objekt2", (o) => {
    o.angle += 0.5;
  });
  action("objekt3", (o) => {
    o.angle -= 0.5;
  });

  let goingRight = true;
  action("objekt4", (o) => {
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

  action("enemy", (e) => {
    if (e.curAnim() !== "walk") {
      e.play("walk");
    }
    e.move(e.speed, 0);

    // if (e.pos.x >= width() - 100 && e.speed > 0) {
    //   e.speed = -e.speed;
    // } else if (e.pos.x <= 0 + 100 && e.speed < 0) {
    //   e.speed = -e.speed;
    // }
  });

  action("player", () => {
    var currCam = camPos();
    if (currCam.x < player.pos.x && currCam.x < 3800) {
      camPos(player.pos.x, currCam.y);
    }
    if (currCam.x > player.pos.x && currCam.x > width() / 2) {
      camPos(player.pos.x, currCam.y);
    }

    if (player.pos.y > height() - 50) {
      addOverlay();
      wait(0.2, () => {
        go("game-over");
      });
    }
  });

  action("collect", (c) => {
    c.angle += 1;
  });
}
