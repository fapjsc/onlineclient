import * as PIXI from 'pixi.js';
import { Globals } from './Globals';

export default class Stage extends PIXI.Sprite {
  constructor() {
    super(Globals.resources.slotStage.texture);
    this.position.set(-20, -100);
    this.buttonMode = false;
  }
}
