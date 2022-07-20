import * as PIXI from 'pixi.js';
import { Globals } from '../Globals';
import { PeopleAnim } from './PeopleAnim';

export class PeopleContainer extends PIXI.Container {
  constructor(id, sexual, level) {
    super();
    this.position.set(0, 0);
    this.people = new PeopleAnim(id, sexual);
    this.addChild(this.people);
    this.createVipSign(level);
  }

  createVipSign(level) {
    this.vipSign = new PIXI.Sprite(Globals.resources.vipSign.texture);
    this.vipSign.position.set(90, 20);
    this.vipSignEvent();
    this.addChild(this.vipSign);
  }

  vipSignEvent() {
    this.vipSign.on('click', () => {
    });
  }
}
