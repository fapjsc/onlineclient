import * as PIXI from 'pixi.js';
import { Globals } from './Globals';

export class Background extends PIXI.Container {
  constructor() {
    super();
    this.createSprites();
  }

  createSprites() {
    this.createSprite();
    // this.createSprite();
  }

  createSprite() {
    const sprite = new PIXI.Sprite(Globals.resources.bg.texture);

    this.addChild(sprite);
  }
}
