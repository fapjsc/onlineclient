// import * as PIXI from 'pixi.js';
// import { Loader } from './Loader';
// import { MainScene } from './MainScene';

// export class PixiApp {
//   constructor(width) {
//     //this.element = document.getElementById('jp-pixi');
//     this.width = width;
//     this.height = 1206;
//   }

//   run() {
//     this.app = new PIXI.Application({
//       backgroundColor: 0x5BBA6F,
//       width: this.width,
//       height: this.height,
//       antialias: true,
//       resolution: 1,
//     });

//     //this.element.appendChild(this.app.view);

//     // load sprite
//     this.loader = new Loader(this.app.loader);

//     this.loader.preload().then(() => {
//       this.start();
//     });

//     return this.app;
//   }

//   start() {
//     console.log('game start!');
//     this.scene = new MainScene(this.width, this.height);
//     this.app.stage.addChild(this.scene);
//   }

//   destroy() {
//     this.app.destroy();
//   }
// }

import * as PIXI from 'pixi.js';
import { Loader } from './Loader';
import { MainScene } from './MainScene';

export class PixiApp extends PIXI.Application {
  Scene = 0;

  constructor(width) {
    super({
      width: width,
      height: 1206,
      backgroundColor: 0xFBBA6F,
      antialias: true,
      resolution: 1,
    });
  }

  active(rowSlotAmount, rowAmount) {
    const sexual = ['w1', 'm1', 'w2', 'm1', 'w1', 'w1'];
    const level = ['vip', 'vip', '', 'vip', '', 'vip'];
    const slotType = ['slot', 'slotGizon', 'slotGizon', 'slotGizon', 'slot', 'slotGizon'];
    const loaders = new Loader(this.loader);

    loaders.preload().then(() => {
      console.log('game start!');
      const mainScene = new MainScene(this.width, this.height);
      // eslint-disable-next-line no-plusplus
      for (let item = 0; item < rowAmount; item++) {
        mainScene.createGroup(item + 1, 30, 450 + 300 * item, rowSlotAmount[item], slotType, sexual, level);
      }
      mainScene.people.show('12');
      //this.ticker.add((delta) => console.log(delta));
      this.stage.addChild(mainScene);
      console.log('get child', this.stage.getChildAt(0));
    });
  }

  effectUpdate(numbers) {
    this.ticker.update(numbers);
    this.ticker.start();
  }

  gameLoop(delta) {
    console.log(delta);
  }
}
