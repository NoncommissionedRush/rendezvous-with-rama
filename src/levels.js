const levelOneLayout = [
  "                                                                     ",
  "          $                                                          ",
  "                                $         $                          ",
  "                                                                     ",
  "   $      E                          E  (   |                        ",
  "         ##                   ##############                         ",
  "                                                                     ",
  "######                     #                                         ",
  "                  $                                   $              ",
  "                                                                     ",
  "                (                                                 $  ",
  "             #############                          ####             ",
  "                                                                    &",
  "                                                                 ####",
  "          #                                                          ",
  "                                                           ####      ",
  "              $                                      $               ",
  "                                                         $           ",
  "@E               (             E       |        @  (   E    |        ",
  "#######################################         ############         ",
];
export default levelOneLayout;

export const levelTwoLayout = [
  "                                                                     ",
  "                                                                     ",
  "                                                                     ",
  "                                $       $                            ",
  "                             @ (    E    |                           ",
  "                             ############    #          $            ",
  "              $                                  #                   ",
  "   $                                                   (             ",
  "          #        $                                 ######          ",
  "                                                                     ",
  "                 E                                                   ",
  "               #######                        #                      ",
  "      #                                                              ",
  "                                                                     ",
  "                                         $       #                   ",
  "                                        ###                          ",
  "  #      $                                            $              ",
  "                                                                     ",
  "@    (E    |        @      $    E (   |            @  E  (        | &",
  "###########         ##################             ##################",
];

export const levelThreeLayout = [
  "                                                                     ",
  "                                                                     ",
  "                                        $                            ",
  "                               $                                     ",
  " $                    $      @     ( E (    |                        ",
  "                             ###############                         ",
  "                                                                     ",
  "##                       #                                           ",
  "                    $                                                ",
  "                                                                     ",
  "              @$ ( E|                                                ",
  "             #######                                               { ",
  "                            #                                     ###",
  "                                                                     ",
  "     #   #                      #                                    ",
  "                                     #                         #     ",
  "                           $                     $        $          ",
  "                                         #   #                       ",
  "                 @    (  E      E |               (       @    E  |   ",
  "                 #################               ####    ########    ",
];

export function loadLevel(level) {
  let levelLayout;

  if (level === 1) {
    levelLayout = levelOneLayout;
    add([sprite("bg1", { width: width(), height: height() }), fixed()]);
    add([
      sprite("objekt1"),
      pos(width() / 2 + 100, height() / 2 + 50),
      origin("center"),
      scale(0.7),
      rotate(0),
      fixed(),
      "objekt1",
    ]);
  } else if (level === 2) {
    add([sprite("bg2", { width: width(), height: height() }), fixed()]);
    add([
      sprite("objekt2"),
      pos(width() / 2, height() / 2),
      origin("center"),
      scale(0.7),
      rotate(0),
      fixed(),
      "objekt2",
    ]);
    add([
      sprite("objekt3"),
      pos(width() / 2 + 350, height() / 2),
      origin("center"),
      scale(0.7),
      rotate(0),
      fixed(),
      "objekt3",
    ]);
    levelLayout = levelTwoLayout;
  } else if (level === 3) {
    add([sprite("bg3", { width: width(), height: height() }), fixed()]);
    add([
      sprite("objekt4"),
      pos(width() / 2, height() - 100),
      fixed(),
      scale(0.8),
      origin("center"),
      "objekt4",
    ]);
    levelLayout = levelThreeLayout;
  }

  addLevel(levelLayout, {
    width: width() / 22,
    height: height() / 20,
    "#": () => [
      sprite("groundBlue"),
      scale(0.5),
      area(0.5),
      solid(),
      origin("topleft"),
      "ground",
    ],

    E: () => [
      sprite("crab"),
      scale(0.15),
      area(),
      solid(),
      body(),
      pos(),
      origin("bot"),
      { speed: 200 },
      "enemy",
    ],
    $: () => [
      sprite("collect"),
      scale(0.2),
      area(),
      rotate(0),
      origin("center"),
      "collect",
    ],
    "(": () => [
      sprite("lightning"),
      scale(0.2),
      origin("center"),
      area({ scale: 0.5 }),
      "lightning",
    ],
    "{": () => [
      sprite("plant"),
      scale(0.2),
      origin("center"),
      area(),
      "endgame",
    ],
    "|": () => [rect(1, 40), area(), solid(), opacity(0), "right-flag"],
    "@": () => [rect(1, 40), area(), solid(), opacity(0), "left-flag"],
    "&": () => [
      sprite("finish"),
      scale(0.2),
      area(),
      solid(),
      opacity(0),
      "finish",
    ],
  });
}
