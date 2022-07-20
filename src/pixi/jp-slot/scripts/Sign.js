import * as PIXI from 'pixi.js';
import { Globals } from './Globals';

export class Sign extends PIXI.Sprite {
  constructor() {
    super(Globals.resources.sign.texture);
    this.y = -70;
  }
}
