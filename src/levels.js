// level layouts
const levelOneLayout = [
  "                                                                     ",
  "                                                                     ",
  "                                                                     ",
  "          $                     $         $     $                    ",
  "          E                          E  (   |                        ",
  "   $     ##                    #############                         ",
  "                                                                     ",
  "######                     #                                         ",
  "                                                                     ",
  "                 $                                    $           $  ",
  "                (                                                    ",
  "             ###########                             ###             ",
  "                                                                    &",
  "                                                                 ####",
  "          #                                                          ",
  "                                                           ####      ",
  "              $                                                      ",
  "                                     $               $   $           ",
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
  "                             ++++++++++++    +         $             ",
  "              $                                  +                   ",
  "   $                                                   (             ",
  "          +                                          ++++++          ",
  "                   $                                                 ",
  "                 E                                                   ",
  "               +++++++                        +                      ",
  "      +                                                              ",
  "                                         $                           ",
  "                                                 +                   ",
  "        $                               +++                          ",
  "  +                                                   $              ",
  "                           $                                         ",
  "@    (E    |        @           E (   |            @  E  (        | &",
  "+++++++++++         ++++++++++++++++++             ++++++++++++++++++",
];

export const levelThreeLayout = [
  "                                                                     ",
  "                                                                     ",
  "                                                                     ",
  "                               $        $                            ",
  "                      $      @     ( E (    |                        ",
  "                             ---------------                         ",
  "                                                                     ",
  "--                       -                                           ",
  "    $               $                                                ",
  "                                                                     ",
  "              @$ ( E|                                                ",
  "             -------                                               { ",
  "                            -                                     ---",
  "                                                                     ",
  "     -   -                      -                                    ",
  "                            $        -                         -     ",
  "                                                $                    ",
  "                                         -   -              $        ",
  "                 @    (  E      E |                (      @    E  |   ",
  "                 -----------------               ----    --------    ",
];

export function loadLevel(level) {
  let levelLayout;

  // load level layout based on current level
  if (level === 1) {
    levelLayout = levelOneLayout;
    // add level background
    add([sprite("bg1", { width: width(), height: height() }), fixed()]);
    // add moving bg object
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
    // add level background
    add([sprite("bg2", { width: width(), height: height() }), fixed()]);
    // add moving bg objects
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
    // add level background
    add([sprite("bg3", { width: width(), height: height() }), fixed()]);
    // add moving object (waves)
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
    // level width
    width: width() / 22,
    // level height
    height: height() / 20,
    // grounds
    "#": () => [
      sprite("groundBlue"),
      scale(0.5),
      area(0.5),
      solid(),
      origin("topleft"),
      "ground",
    ],
    "+": () => [
      sprite("groundPurple"),
      scale(0.5),
      area(0.5),
      solid(),
      origin("topleft"),
      "ground",
    ],
    "-": () => [
      sprite("groundYellow"),
      scale(0.5),
      area(0.5),
      solid(),
      origin("topleft"),
      "ground",
    ],
    // enemy
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
    // collectible
    $: () => [
      sprite("collect"),
      scale(0.2),
      area(),
      rotate(0),
      origin("center"),
      "collect",
    ],
    // lightning
    "(": () => [
      sprite("lightning"),
      scale(0.2),
      origin("center"),
      area({ scale: 0.5 }),
      "lightning",
    ],
    // endgame plant
    "{": () => [
      sprite("plant"),
      scale(0.2),
      origin("center"),
      area(),
      "endgame",
    ],
    // end of platform flags
    "|": () => [rect(1, 1), area(), solid(), opacity(0), "right-flag"],
    "@": () => [rect(1, 1), area(), solid(), opacity(0), "left-flag"],
    // end of level flag
    "&": () => [
      rect(1, height() * 2),
      pos(0, -height()),
      area(),
      solid(),
      opacity(0),
      "finish",
    ],
  });
}
