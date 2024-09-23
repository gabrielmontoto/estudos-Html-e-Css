const defaultCharacter = {
  name: "",
  life: 1,
  maxLife: 1,
  defense: 0,
  attack: 0,
};

const createKnight = (name) => {
  return {
    ...defaultCharacter,
    name,
    life: 100,
    maxLife: 100,
    attack: 10,
    defense: 5,
  };
};

const createSorcerer = (name) => {
  return {
    ...defaultCharacter,
    name,
    life: 70,
    maxLife: 70,
    attack: 17,
    defense: 2,
  };
};

const createLittleMonster = () => {
  return {
    ...defaultCharacter,
    name: "Little Monster",
    life: 40,
    maxLife: 40,
    attack: 5,
    defense: 3,
  };
};

const createBigMonster = () => {
  return {
    ...defaultCharacter,
    name: "Big Monster",
    life: 120,
    maxLife: 120,
    attack: 8,
    defense: 5,
  };
};

const Stage = {
  player: null,
  enemy: null,
  playerElement: null,
  enemyElement: null,

  start(player, enemy, playerElement, enemyElement) {
    this.player = player;
    this.enemy = enemy;
    this.playerElement = playerElement;
    this.enemyElement = enemyElement;

    this.playerElement
      .querySelector(".attack_button")
      .addEventListener("click", () => this.doAttack(player, enemy));
    this.enemyElement
      .querySelector(".attack_button")
      .addEventListener("click", () => this.doAttack(enemy, player));

    this.update();
  },

  doAttack(attack, receiver) {
    if (attack.life <= 0 || receiver.life <= 0) return;

    let attackFactor = (Math.random() * 2).toFixed(2);
    console.log(attackFactor);

    let attackDamage = attackFactor * attack.attack;

    let damage =
      attackDamage - receiver.defense > 0 ? attackDamage - receiver.defense : 0;

    receiver.life = receiver.life - damage <= 0 ? 0 : receiver.life - damage;

    Log.addMessage(
      `${attack.name} causou ${damage.toFixed(2)} em ${
        receiver.name
      } que ficou com ${receiver.life.toFixed(2)}`
    );

    this.update();
  },

  update() {
    this.playerElement.querySelector(".name").innerHTML = `${
      this.player.name
    } - ${this.player.life.toFixed(1)} HP`;
    let playerLifePerCent = (this.player.life / this.player.maxLife) * 100;
    this.playerElement.querySelector(
      ".life_bar_holder .life_bar"
    ).style.width = `${playerLifePerCent}%`;

    this.enemyElement.querySelector(".name").innerHTML = `${
      this.enemy.name
    } - ${this.enemy.life.toFixed(1)} HP`;
    let enemyLifePerCent = (this.enemy.life / this.enemy.maxLife) * 100;
    this.enemyElement.querySelector(
      ".life_bar_holder .life_bar"
    ).style.width = `${enemyLifePerCent}%`;
  },
};

const Log = {
  list: [],
  addMessage(msg) {
    this.list.push(msg);
    this.render();
  },
  render() {
    const logElement = document.querySelector(".log");
    logElement.innerHTML = "";

    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];

      logElement.innerHTML += `<li>${element}</li>`;
    }
  },
};
