import * as PIXI from 'pixi.js';
import { Loader } from './Loader';
import { MainScene } from './MainScene';
import { store } from '../../../store/index';

export class PixiApp extends PIXI.Application {
  Scene = 0;

  constructor(width) {
    super({
      width: width,
      height: 600,
      backgroundColor: 0xFBBA6F,
      antialias: true,
      resolution: 1,
    });
    this.mainScene = null;

    //let mobile can slide this canvas;
    this.renderer.plugins.interaction.autoPreventDefault = false;
    this.view.style.touchAction = 'auto';
    this.prevPeopleSexual = [];
    this.prevSlot = [];
  }

  async active(rowSlotAmount) {
    const loaders = new Loader(this.loader);

    this.mainScene = await loaders.preload().then(() => {
      console.log('game start!');
      const mainScene = new MainScene(this.view.width, this.view.height);
      // eslint-disable-next-line no-plusplus
      for (let item = 0; item < rowSlotAmount.length; item++) {
        // eslint-disable-next-line
        mainScene.createGroup(item + 1, 30, 450 + 300 * item, rowSlotAmount[item]);
      }
      this.ticker.add((delta) => this.#_effectUpdate(delta));
      this.stage.addChild(mainScene);
      return mainScene;
    });
    console.log();
  }

  #_effectUpdate(numbers) {
    this.#_peoplenAnim(numbers);
    this.#_slotAnim();
  }

  // eslint-disable-next-line no-unused-vars
  #_peoplenAnim(delta) {
    let startFrame = 0;
    let endFrame = 0;
    const { people } = store.getState().peopleList;
    // eslint-disable-next-line array-callback-return
    if (!people || people?.length === 0) return;
    // eslint-disable-next-line array-callback-return
    people.map((item, index) => {
      switch (item.sexual) {
      case 'm1':
        startFrame = 0;
        endFrame = 5;
        break;
      case 'w1':
        startFrame = 6;
        endFrame = 11;
        break;
      case 'w2':
        startFrame = 12;
        endFrame = 17;
        break;
      default:
        startFrame = 1;
        endFrame = 2;
        break;
      }
      if (!this.mainScene.people[index]?.people) return;
      if (item !== this.prevPeopleSexual[index] || (startFrame === 1 && endFrame === 2)) {
        //如果沒有人或是 item 是新的item
        this.mainScene.people[index].people.alpha = 0;
        this.mainScene.people[index].people.visible = false;
      }
      if (this.mainScene.people[index].people.anim.currentFrame >= endFrame) {
        this.mainScene.people[index].people.anim.gotoAndPlay(startFrame);
        const interval = setInterval(() => {
          this.mainScene.people[index].people.alpha += 0.05;
          this.mainScene.people[index].people.visible = true;
          if (this.mainScene.people[index].people.alpha >= 1) clearInterval(interval);
        }, [100]);
      }
    });

    people.map((item, index) => {
      if (!this.mainScene.people[index]?.people) return;
      if (item.level === 'vip') {
        this.mainScene.people[index].people.vipSign.visible = true;
      } else {
        this.mainScene.people[index].people.vipSign.visible = false;
      }
      return item;
    });
    this.prevPeopleSexual = people;
  }

  #_slotAnim() {
    const { slot } = store.getState().slotList;
    let modeFrame = 0;
    let slotFrame = 0;
    slot.map((item, index) => {
      if (!this.mainScene.slot[index]?.slot) return;
      switch (item.machine) {
      case 'slot':
        slotFrame = 0;
        break;
      case 'slotGizon':
        slotFrame = 1;
        break;
      default:
        slotFrame = 0;
        break;
      }
      this.mainScene.slot[index]?.slot?.anim.gotoAndStop(slotFrame);
      this.mainScene.slot[index].slot.visible = true;
      return item;
    });

    slot.map((item, index) => {
      if (!this.mainScene.slot[index]?.slot) return;
      switch (item.mode) {
      case '4':
        this.mainScene.slot[index].slot.modeSign.visible = true;
        modeFrame = 0;
        break;
      case '5':
        this.mainScene.slot[index].slot.modeSign.visible = true;
        modeFrame = 1;
        break;
      case '6':
        this.mainScene.slot[index].slot.modeSign.visible = true;
        modeFrame = 2;
        break;
      case '456':
        this.mainScene.slot[index].slot.modeSign.visible = true;
        modeFrame = 3;
        break;
      default:
        this.mainScene.slot[index].slot.modeSign.visible = false;
        modeFrame = 0;
        break;
      }
      this.mainScene.slot[index]?.slot?.modeSign.gotoAndStop(modeFrame);
      return item;
    });
  }
}
