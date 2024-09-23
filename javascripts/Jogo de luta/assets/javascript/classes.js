class Character {
  _life = 1;
  get life() {
    return this._life;
  }
  set life(value) {
    this._life = value < 0 ? 0 : value;
  }
  maxLife = 1;
  attack = 0;
  defense = 0;

  constructor(name) {
    this.name = name;
  }
}

class Knight extends Character {
  constructor(name) {
    super(name);
    this.maxLife = 100;
    this.life = this.maxLife;
    this.attack = 10;
    this.defense = 5;
  }
}

class Sorcerer extends Character {
  constructor(name) {
    super(name);
    this.maxLife = 80;
    this.life = this.maxLife;
    this.attack = 15;
    this.defense = 3;
  }
}

class LittleMonster extends Character {
  constructor() {
    super("little Monster");
    this.maxLife = 30;
    this.life = this.maxLife;
    this.attack = 4;
    this.defense = 4;
  }
}
class BigMonster extends Character {
  constructor() {
    super("Big Monster");
    this.maxLife = 120;
    this.life = this.maxLife;
    this.attack = 10;
    this.defense = 5;
  }
}

class Stage {
  constructor(player, enemy, playerElement, enemyElement, log) {
    this.player = player;
    this.enemy = enemy;
    this.playerElement = playerElement;
    this.enemyElement = enemyElement;
    this.log = log;
  }

  start() {
    this.update();

    this.playerElement
      .querySelector(".attack_button")
      .addEventListener("click", () => this.doAttack(this.player, this.enemy));
    this.enemyElement
      .querySelector(".attack_button")
      .addEventListener("click", () => this.doAttack(this.enemy, this.player));
  }

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
  }

  doAttack(attack, receiver) {
    if (attack.life <= 0 || receiver.life <= 0) return;

    let attackFactor = (Math.random() * 2).toFixed(2);
    console.log(attackFactor);

    let attackDamage = attackFactor * attack.attack;

    let damage =
      attackDamage - receiver.defense > 0 ? attackDamage - receiver.defense : 0;

    receiver.life -= damage;

    this.log.addMessage(
      `${attack.name} causou ${damage.toFixed(2)} em ${
        receiver.name
      } que ficou com ${receiver.life.toFixed(2)}`
    );

    this.update();
  }
}

class Log {
  list = [];

  constructor(listElement) {
    this.listElement = listElement;
  }
  addMessage(msg) {
    this.list.push(msg);
    this.render();
  }
  render() {
    this.listElement.innerHTML = "";

    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];

      this.listElement.innerHTML += `<li>${element}</li>`;
    }
  }
}
