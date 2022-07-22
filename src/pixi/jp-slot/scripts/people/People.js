import * as PIXI from 'pixi.js';
import { Globals } from '../Globals';
import { PeopleAnim } from './PeopleAnim';

export class People extends PIXI.Container {
  constructor(id, sexual, offsetX, offsetY) {
    super();
    this.position.set(offsetX, offsetY);
    this.people = new PeopleAnim(id, sexual);
    this.addChild(this.people);
    // eslint-disable-next-line prefer-template
    this.id = id;
  }

  show(id) {
    if (id === this.id) {
      this.visible = false;
      console.log('showId', id, this.id);
    }
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
