import * as PIXI from 'pixi.js';
import { Globals } from '../Globals';
import { PeopleAnim } from './PeopleAnim';

export class People extends PIXI.Container {
  constructor(id, offsetX, offsetY) {
    super();
    this.position.set(offsetX, offsetY);
    this.anim = new PeopleAnim(id);
    this.addChild(this.anim);
    // eslint-disable-next-line prefer-template
    this.id = id;
    this.visible = true;
    this.alpha = 0;
    this.vipSign = this.#_createVipSign();
  }

  #_createVipSign() {
    const vipSign = new PIXI.Sprite(Globals.resources.vipSign.texture);
    vipSign.position.set(90, 20);
    vipSign.visible = false;
    this.#_vipSignEvent(vipSign);
    this.addChild(vipSign);
    return vipSign;
  }

  #_vipSignEvent(vipSign) {
    vipSign.on('click', () => {
    });
  }
}
