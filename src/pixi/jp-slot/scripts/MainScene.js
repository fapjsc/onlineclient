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
    this.createBackground();
    this.createSign();
  }

  createBackground() {
    const sexual = ['w1', 'm1', 'w2', 'm1', 'w1', 'w1'];
    const level = ['vip', 'vip', '', 'vip', '', 'vip'];
    this.bg = new Background();
    this.slot1 = new SlotPeopleContainer(30, 450, 5);
    this.slot2 = new SlotPeopleContainer(70, 750, 6);
    this.slot3 = new SlotPeopleContainer(70, 1050, 3);
    this.slot1.createContainer(sexual, level);
    this.slot2.createContainer(sexual, level);
    this.slot3.createContainer(sexual, level);
    this.addChild(this.bg);
    this.addChild(this.slot1, this.slot2, this.slot3);
    //this.addChild(this.people);
  }

  createSign() {
    this.sign = new Sign();
    this.addChild(this.sign);
  }
}
