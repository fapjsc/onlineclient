import * as PIXI from 'pixi.js';
import { Globals } from './Globals';

export class Background {
  constructor() {
    this.container = new PIXI.Container();
    this.createSprites();
  }

  createSprites() {
    this.createSprite();
    // this.createSprite();
  }

  createSprite() {
    const sprite = new PIXI.Sprite(Globals.resources.bg.texture);
    this.container.addChild(sprite);
  }
}
