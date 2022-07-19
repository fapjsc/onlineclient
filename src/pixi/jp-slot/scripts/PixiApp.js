import * as PIXI from 'pixi.js';
import { Loader } from './Loader';
import { MainScene } from './MainScene';

export class PixiApp {
  constructor() {
    this.element = document.getElementById('jp-pixi');
    this.width = this.element.clientWidth;
    this.height = 1206;
  }

  run() {
    this.app = new PIXI.Application({
      backgroundColor: 0x5BBA6F,
      width: this.width,
      height: this.height,
    });

    this.element.appendChild(this.app.view);

    // load sprite
    this.loader = new Loader(this.app.loader);

    this.loader.preload().then(() => {
      this.start();
    });
  }

  start() {
    console.log('game start!');
    this.scene = new MainScene(this.width, this.height);
    this.app.stage.addChild(this.scene.container);
  }

  destroy() {
    this.app.destroy();
  }
}
