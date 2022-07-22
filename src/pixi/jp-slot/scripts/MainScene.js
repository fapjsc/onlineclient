import * as PIXI from 'pixi.js';
import { Globals } from './Globals';
import { Background } from './Background';
import { People } from './people/People';
import { Slot } from './Slot';

export class MainScene extends PIXI.Container {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.bg = new Background();
    this.addChild(this.bg);
    this.visible = true;
    this.name = 'MainScene';
    this.slot = [];//this is the slot group  and store the slot info at here;
    this.people = [];//this is the people group and store the people info at here
  }

  createGroup(horizonID, offsetX, offsetY, amount, slotType, sexual, level) {
    //horizonID => 列的id string
    //offsetX offsetY  => 整個列的偏移量 number
    //amount => 列的機台數量 number
    //slotType => 機器種類 [string, string .....]
    //sexual => 性別 [string, string .....]
    //玩家等級 [string, string .....]
    this.#createSign();

    const peopleContainer = new PIXI.Container();
    const slotContainer = new PIXI.Container();
    //container.position.set(offsetX, offsetY);
    this.#createStage(slotContainer);
    this.#createTimes(slotContainer);
    // eslint-disable-next-line no-plusplus
    for (let item = amount; item > 0; item--) {
      // eslint-disable-next-line prefer-template
      const id = (horizonID + '') + (item + '');
      peopleContainer.position.set(offsetX - 30 + item * 47, offsetY - item * 20);
      const newPeople = new People(id, sexual[item - 1], offsetX - 30 + item * 47, 0 - item * 20);
      newPeople.createVipSign(level[item - 1]);
      this.people.push({ people: newPeople, id: id });//store to people arr
      peopleContainer.addChild(newPeople);

      slotContainer.position.set(offsetX - 30 + item * 47, offsetY - item * 20);
      const newSlot = new Slot(id, offsetX - 30 + item * 47, 0 - item * 20, slotType[item - 1]);
      this.slot.push({ slot: newSlot, id: id });
      slotContainer.addChild(newSlot);//store to slot arr
    }
    this.addChild(slotContainer, peopleContainer);
    this.people.sort((item1, item2) => item1.id - item2.id);
    this.slot.sort((item1, item2) => item1.id - item2.id);
  }

  #createStage(container) {
    //機台台階
    const stage = new PIXI.Sprite(Globals.resources.slotStage.texture);
    stage.position.set(0, -100);
    stage.buttonMode = false;
    container.addChild(stage);
  }

  #createTimes(container) {
    //機台倍率場景
    const times = new PIXI.Sprite(Globals.resources.times.texture);
    times.position.set(20, -280);
    times.rotation = 0.07;
    times.buttonMode = false;
    container.addChild(times);
  }

  #createSign() {
    //最上面的東西
    const sign = new PIXI.Sprite(Globals.resources.sign.texture);
    sign.y = -70;
    this.addChild(sign);
  }
}
