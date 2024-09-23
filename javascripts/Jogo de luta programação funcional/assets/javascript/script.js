const player = createKnight("playerName");
const enemy = createLittleMonster();

Stage.start(
  player,
  enemy,
  document.querySelector("#player"),
  document.querySelector("#enemy")
);
