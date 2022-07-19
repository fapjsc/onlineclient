import * as PIXI from 'pixi.js';
import { Globals } from './Globals';

export class Sign {
  constructor() {
    this.createSprite();
  }

  createSprite() {
    const sprite = new PIXI.Sprite(Globals.resources.sign.texture);
    // sprite.anchor.set(0.5);
    // sprite.scale = 0.5;
    // sprite.x = window.innerWidth / 2;
    // sprite.y = window.innerHeight / 2;

    sprite.x = 100;
    sprite.y = 100;

    this.sprite = sprite;

    console.log(sprite);
  }
}
