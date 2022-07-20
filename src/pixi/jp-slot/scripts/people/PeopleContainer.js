import * as PIXI from 'pixi.js';
import { Globals } from '../Globals';
import { PeopleAnim } from './PeopleAnim';

export class PeopleContainer extends PIXI.Container {
  constructor(id, sexual) {
    super();
    this.position.set(0, 0);
    this.people = new PeopleAnim(id, sexual);
    this.addChild(this.people);
  }

  createVipSign(level) {
    if (level === 'vip') {
      this.vipSign = new PIXI.Sprite(Globals.resources.vipSign.texture);
      this.vipSign.position.set(90, 20);
      this.vipSignEvent();
      this.addChild(this.vipSign);
    }
  }

  vipSignEvent() {
    this.vipSign.on('click', () => {
    });
  }
}
