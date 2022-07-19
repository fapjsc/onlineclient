import * as PIXI from 'pixi.js';
// import { Globals } from './Globals';
import { Sign } from './Sign';
import { Background } from './Background';

export class MainScene {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.container = new PIXI.Container();
    this.createBackground();
    this.createSign();
  }

  createBackground() {
    this.bg = new Background();
    this.container.addChild(this.bg.container);
  }

  createSign() {
    this.sign = new Sign();
    this.container.addChild(this.sign.sprite);
  }
}
