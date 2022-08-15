/* eslint-disable */
import * as PIXI from 'pixi.js';
import { store } from '../../../store/index';
import { setPixiStatus } from '../../../store/actions/pixiAction';
import HitAreaShapes from 'hitarea-shapes';
import aruze from '../sprites/老虎機/aruze.json';
import aristocrat from '../sprites/老虎機/aristocrat.json';
import igt from '../sprites/老虎機/igt.json';
import daito from '../sprites/daito.json';
import sammy from '../sprites/sammy.json';
export class Slot extends PIXI.Container {
  #_brandName;
  constructor(id, offsetX, offsetY, brandName) {
    super();
    this.id = id;
    this.#_brandName = brandName;
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

    slot.gotoAndStop(0);
    this.addChild(slot);
    this.#_hitArea(slot)
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
    modeSign.width = 40;
    modeSign.height = 40;
    if (this.#_isJpSlot) {
      modeSign.position.set(20, -10);
    } else {
      modeSign.position.set(10, -10);
    }
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

  #_isJpSlot() {
    if (this.#_brandName === 'daito' || this.#_brandName === 'sammy') {
      return true;
    }
    return false;
  }

  #_hitArea(sprite) {
    let areaJson;
    switch(this.#_brandName) {
    case 'aruze':
      areaJson = aruze;
      break;
    case 'aristocrat':
      areaJson = aristocrat;
      break;
    case 'igt':
      areaJson = igt;
      break;
    case 'sammy':
      areaJson = sammy;
      break;
    case 'daito':
      areaJson = daito;
      break;
    default:
      areaJson = igt;
      break;
    }
    sprite.hitArea = new HitAreaShapes(areaJson)
  }
}
