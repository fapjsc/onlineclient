/* eslint-disable */
import * as PIXI from 'pixi.js';
import { store } from '../../../store/index';
import { setPixiStatus } from '../../../store/actions/pixiAction';

export class Slot extends PIXI.Container {
  constructor(id, offsetX, offsetY) {
    super();
    this.id = id;
    this.name = null;
    this.position.set(offsetX, offsetY - 10);
    this.visible = true;
    this.anim = this.#_createSlot();
    this.modeSign = this.#_createMode();
    this.#_Event();
  }

  static createTexture(frames) {
    const textureArray = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < frames.length; i++) {
      const texture = PIXI.Texture.from(frames[i]);
      textureArray.push(texture);
    }
    return textureArray;
  }

  #_createSlot() {
    const frames = [
      'sammy',
      'daito',
      'igt',
      'aruze',
      'aristocrat'
    ];
    const texture = Slot.createTexture(frames);
    const slot = new PIXI.AnimatedSprite(texture);
    // eslint-disable-next-line prefer-template
    slot.id = this.id;
    slot.interactive = true;
    slot.buttonMode = true;
    slot.name = frames[slot.currentFrame];
    slot.width = 130;
    slot.height = 130;
    slot.gotoAndStop(0);
    this.addChild(slot);
    return slot;
  }

  #_createMode() {
    const frames = [
      'modeSign4',
      'modeSign5',
      'modeSign6',
      'modeSign456',
    ];
    const modeSign = new PIXI.AnimatedSprite(Slot.createTexture(frames));
    modeSign.animationSpeed = 0.1;
    modeSign.width = 50;
    modeSign.height = 50;
    modeSign.position.set(30, -20);
    //modeSign.play();
    this.addChild(modeSign);
    return modeSign;
  }

  #_Event() {
    this.anim.on('pointerover', () => {
      this.anim.tint = 0xFFE66F;
    });
    this.anim.on('pointerout', () => {
      this.anim.tint = 0xFFFFFF;
    });
    this.anim.on('pointerdown', () => {
      console.log(`slot ${this.id} is clicked`);
      const { slot: slotArr } = store.getState().slotList;
      console.log(slotArr);
      const findSlot = slotArr.find((item) => item.id === this.id);
      store.dispatch(setPixiStatus(true, findSlot));
    });
  }
}
