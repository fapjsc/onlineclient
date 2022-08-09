/* eslint-disable */
import * as PIXI from 'pixi.js';
import { Loader } from './Loader';
import { MainScene } from './MainScene';
import { store } from '../../../store/index';

export class PixiApp extends PIXI.Application {
  Scene = 0;
  #_brandName = ''
  #_timeAmount = []
  appWidth = 0

  constructor(width, brandName) {
    super({
      width: width,
      height: 500,
      backgroundColor: 0xFBBA6F,
      antialias: true,
      resolution: 1,
    });
    this.appWidth = width;
    this.mainScene = null;
    this.#_brandName = brandName

    //let mobile can slide this canvas;
    this.renderer.plugins.interaction.cursorStyles.default = 'default'
    // this.view.style.touchAction = 'none';
    this.prevPeopleSexual = [];
    this.prevSlot = [];
  }

  async active(rowSlotAmount) {
    const loaders = new Loader(this.loader);
    this.#_timeAmount = rowSlotAmount
    this.mainScene = await loaders.preload().then(() => {
      console.log('game start!');
      const resize = this.view.height + 250 * rowSlotAmount?.length
      this.renderer.resize(this.appWidth, resize)
      const mainScene = new MainScene(this.appWidth, resize, this.#_brandName);
      // eslint-disable-next-line no-plusplus
      for (let item = 0; item < rowSlotAmount?.length; item++) {
        // eslint-disable-next-line
        mainScene.createGroup(item + 1, 30, 450 + 300 * item, rowSlotAmount[item]);
      }
      this.ticker.add((delta) => this.#_effectUpdate(delta));
      this.stage.addChild(mainScene);
      return mainScene;
    });
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
    if (!people || people?.length === 0) {
      this.mainScene.people.forEach((item, index) => {
        item.people.visible = false;
        item.people.anim.gotoAndStop(0)
      })
      return;
    }
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
    let timeStartFrame = 0;
    let timeEndFrame = 0;
    const firstSlot = slot.filter((slotItem, slotIndex) => {
      const findItem = this.#_timeAmount.find((timeItem, timeIndex) =>  
        (slotItem.id + '') === `${timeIndex + 1}1`
      )

      if (findItem) return slotItem;

    })//only catch first slot in slot group

    if (slot?.length === 0 || !slot) {
      this.mainScene.slotTime.forEach((item, index) => {
        if (this.#_brandName === 'sammy' || this.#_brandName === 'daito') {
          item.times.gotoAndStop(0)
        } else { item.times.gotoAndStop(1)}
      })
    }

    firstSlot.forEach((item, index) => {
      const slotTime = this.mainScene.slotTime[index]?.times
      if (!slotTime) return;
      switch (item.times) {
        case 'd1':
          timeStartFrame = 1;
          timeEndFrame = 30;
          break;
        default:
          timeStartFrame = 0;
          timeEndFrame = 1;
          break;
      }
      // console.log(slotTime, timeStartFrame, timeEndFrame, slotTime.currentFrame, index, item, firstSlot)
      if (slotTime.currentFrame >= timeEndFrame) {
        slotTime.gotoAndPlay(timeStartFrame)
      }
    })

    slot.forEach((item, index) => {
      const slotMachine = this.mainScene.slot[index]?.slot
      if (!slotMachine) return;
      switch (item.brandName) {
      case 'sammy':
        slotFrame = 0;
        break;
      case 'daito':
        slotFrame = 1;
        break;
      case 'igt':
        slotFrame = 2;
        break;
      case 'aruze':
        slotFrame = 3;
        break;
      case 'aristocrat':
        slotFrame = 4;
        break;
      default:
        slotFrame = 0;
        break;
      }
      slotMachine?.anim.gotoAndStop(slotFrame);
      slotMachine.visible = true;
    });

    slot.forEach((item, index) => {
      const slotMachine = this.mainScene.slot[index]?.slot
      if (!slotMachine) return;
      switch (item.mode) {
      case '4':
        slotMachine.modeSign.visible = true;
        modeFrame = 0;
        break;
      case '5':
        slotMachine.modeSign.visible = true;
        modeFrame = 1;
        break;
      case '6':
        slotMachine.modeSign.visible = true;
        modeFrame = 2;
        break;
      case '456':
        slotMachine.modeSign.visible = true;
        modeFrame = 3;
        break;
      default:
        slotMachine.modeSign.visible = false;
        modeFrame = 0;
        break;
      }
      slotMachine?.modeSign?.gotoAndStop(modeFrame);
    });
  }
}
