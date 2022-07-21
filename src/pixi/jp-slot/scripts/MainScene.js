import * as PIXI from 'pixi.js';
// import { Globals } from './Globals';
import { Sign } from './Sign';
import { Background } from './Background';
import { SlotPeopleContainer } from './SlotPeopleContainer';

export class MainScene extends PIXI.Container {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
    this.bg = new Background();
    this.addChild(this.bg);
    this.visible = true;
    this.name = 'MainScene';
  }

  createSlot(horizonID, offsetX, offsetY, amount) {
    const sexual = ['w1', 'm1', 'w2', 'm1', 'w1', 'w1'];
    const level = ['vip', 'vip', '', 'vip', '', 'vip'];

    this.createSign();

    this.slot1 = new SlotPeopleContainer(offsetX, offsetY, amount);
    this.slot1.createContainer(sexual, level, horizonID);

    this.addChild(this.slot1);
    //this.addChild(this.people);
  }

  createSign() {
    this.sign = new Sign();
    this.addChild(this.sign);
  }
}
