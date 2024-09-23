let log = new Log(document.querySelector(".log"));
let character = new Knight("knight name");
let enemy = new LittleMonster();

//console.log(character.name);

const stage = new Stage(
  character,
  enemy,
  document.querySelector("#player"),
  document.querySelector("#enemy"),
  log
);

stage.start();
