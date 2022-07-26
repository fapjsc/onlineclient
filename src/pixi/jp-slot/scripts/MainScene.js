import * as PIXI from 'pixi.js';
import { Globals } from './Globals';
import { Background } from './Background';
import { People } from './people/People';
import { Slot } from './Slot';
import { store } from '../../../store';
import { setPeople, setSlot } from '../../../store/actions/pixiAction';

export class MainScene extends PIXI.Container {
  prevBg = null;

  mainSceneWidth = 0;

  constructor(width, height) {
    super();
    this.width = width;
    this.mainSceneWidth = width;
    this.height = height;
    const bgCount = Math.ceil(height / 1206);
    //console.log(bgCount, height, 501 - width);
    new Array(bgCount).fill('').forEach((item, index) => {
      const bg = new Background();
      if (index > 0) {
        bg.y = this.prevBg.height + this.prevBg.y;
      }
      this.addChild(bg);
      this.prevBg = bg;
    });
    this.visible = true;
    this.name = 'MainScene';
    this.slot = [];//this is the slot group  and store the slot info at here;
    this.people = [];//this is the people group and store the people info at here
  }

  createGroup(horizonID, offsetX, offsetY, amount) {
    //horizonID => 列的id string
    //offsetX offsetY  => 整個列的偏移量 number
    //amount => 列的機台數量 number
    //slotType => 機器種類 [string, string .....]
    //sexual => 性別 [string, string .....]
    this.#_createSign();
    const rwdOffset = (501 - this.mainSceneWidth) / 2;

    const peopleContainer = new PIXI.Container();
    const slotContainer = new PIXI.Container();
    //container.position.set(offsetX, offsetY);
    this.#_createStage(slotContainer);
    this.#_createTimes(slotContainer);
    // eslint-disable-next-line no-plusplus
    for (let item = amount; item > 0; item--) {
      // eslint-disable-next-line prefer-template
      const id = parseInt((horizonID + '') + (item + ''), 10);

      peopleContainer.position.set(offsetX - 80 + item * 47, offsetY - item + 20);
      const newPeople = new People(id, offsetX - 30 + item * 47, 0 - item * 20);
      this.people.push({ people: newPeople, id: id });//store to people arr
      peopleContainer.addChild(newPeople);

      slotContainer.position.set(offsetX - 80 + item * 47, offsetY - item + 20);
      const newSlot = new Slot(id, offsetX - 30 + item * 47, 0 - item * 20);
      this.slot.push({ slot: newSlot, id: id });
      slotContainer.addChild(newSlot);//store to slot arr

      store.dispatch(setSlot({ id: id, machine: 'slot', mode: '' }));
      store.dispatch(setPeople({ id: id, sexual: '', level: '' }));
    }
    if (rwdOffset > 0) {
      slotContainer.width -= rwdOffset + 30;
      slotContainer.height -= rwdOffset + 30;
      peopleContainer.width -= rwdOffset - 10;
      peopleContainer.height -= rwdOffset - 30;
    }

    console.log('Peoplecontainer => ', peopleContainer.width, peopleContainer.height, this.mainSceneWidth);
    console.log('slotcontainer => ', slotContainer.width, slotContainer.height, rwdOffset);
    this.addChild(slotContainer, peopleContainer);
    this.people.sort((item1, item2) => item1.id - item2.id);
    this.slot.sort((item1, item2) => item1.id - item2.id);
  }

  #_createStage(container) {
    //機台台階
    const stage = new PIXI.Sprite(Globals.resources.slotStage.texture);
    stage.position.set(0, -100);
    stage.buttonMode = false;
    container.addChild(stage);
  }

  #_createTimes(container) {
    //機台倍率場景
    const times = new PIXI.Sprite(Globals.resources.times.texture);
    times.position.set(20, -280);
    times.rotation = 0.07;
    times.buttonMode = false;
    container.addChild(times);
  }

  #_createSign() {
    //最上面的東西
    const sign = new PIXI.Sprite(Globals.resources.sign.texture);
    sign.y = -70;
    this.addChild(sign);
  }
}
