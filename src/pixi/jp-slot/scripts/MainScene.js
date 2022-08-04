/* eslint-disable */
import * as PIXI from 'pixi.js';
import { Globals } from './Globals';
import { People } from './people/People';
import { Slot } from './Slot';
import { store } from '../../../store';
import { setPeople, setSlot } from '../../../store/actions/pixiAction';

export class MainScene extends PIXI.Container {
  #_prevBg = null;
  #_brandName = '';
  #_mainSceneWidth = 0;
  #_mainSceneHeight = 0;

  constructor(width, height, brandName) {
    super();
    this.#_mainSceneWidth = width;
    this.#_brandName = brandName;
    this.#_mainSceneHeight = height
    this.visible = true;
    this.name = 'MainScene';
    this.slot = [];//this is the slot group  and store the slot info at here;
    this.people = [];//this is the people group and store the people info at here
    this.slotTime = []//this is the times of slot

    this.#_createBackground();
  }

  createGroup(horizonID, offsetX, offsetY, amount) {
    //horizonID => 列的id string
    //offsetX offsetY  => 整個列的偏移量 number
    //amount => 列的機台數量 number
    //slotType => 機器種類 [string, string .....]
    //sexual => 性別 [string, string .....]
    this.#_createSign();
    const rwdOffset = (486 - this.#_mainSceneWidth) / 2;

    const peopleContainer = new PIXI.Container();
    const slotContainer = new PIXI.Container();
    this.#_createStage(slotContainer);
    this.#_createTimes(slotContainer, horizonID);
    // eslint-disable-next-line no-plusplus
    for (let item = amount; item > 0; item--) {
      // eslint-disable-next-line prefer-template
      const id = parseInt((horizonID + '') + (item + ''), 10);

      peopleContainer.position.set(offsetX - 80 + item * 47, offsetY - item + 20);
      const newPeople = new People(id, offsetX - 30 + item * 47, 0 - item * 20);
      this.people.push({ people: newPeople, id: id });//store to people arr
      peopleContainer.addChild(newPeople);

      slotContainer.position.set(offsetX - 80 + item * 47, offsetY - item + 20);
      let newSlot;
      if (this.#_brandName === 'daito' || this.#_brandName === 'sammy') {
        newSlot = new Slot(id, offsetX - 30 + item * 47, 0 - item * 20);
      } else {
        newSlot = new Slot(id, offsetX - 30 + item * 47, 0 - item * 21);
        newSlot.position.set(newSlot.x, newSlot.y - 15)
      }
      
      this.slot.push({ slot: newSlot, id: id });
      slotContainer.addChild(newSlot);//store to slot arr

      store.dispatch(setSlot({ id: id, brandName: '', model: '', mode: '', times: '' }));
      store.dispatch(setPeople({ id: id, sexual: '', level: '' }));
    }

    if (rwdOffset > 0) {
      console.log('here need to resize', this.#_mainSceneWidth, this.width);
      this.width -= rwdOffset;
      this.height -= rwdOffset;
    }
    this.addChild(slotContainer, peopleContainer);

    this.people.sort((item1, item2) => item1.id - item2.id);
    this.slot.sort((item1, item2) => item1.id - item2.id);
  }

  #_createStage(container) {
    //機台台階
    const frames = [
      'stageJp',
      'stageNormal'
    ]
    const stage = new PIXI.AnimatedSprite(Slot.createTexture(frames))
    if (this.#_brandName === 'daito' || this.#_brandName === 'sammy') {
      stage.gotoAndStop(0)
    } else {stage.gotoAndStop(1)}
    stage.position.set(0, -100);
    stage.buttonMode = false;
    container.addChild(stage);
  }

  #_createTimes(container, horizonID) {
    //add to slotContainer
    //機台倍率場景
    const framesDallor1 = new Array(30).fill('').map((item, index) => `dallor1${index + 1}`)
    const framesCent1 = new Array(30).fill('').map((item, index) => `cent1${index + 1}`)
    const framesCent5 = new Array(30).fill('').map((item, index) => `cent5${index + 1}`)
    const framesCent10 = new Array(30).fill('').map((item, index) => `cent10${index + 1}`)
    const framesCent20 = new Array(30).fill('').map((item, index) => `cent20${index + 1}`)
    const framesCent50 = new Array(30).fill('').map((item, index) => `cent50${index + 1}`)
    const frames = ['times'].concat(framesCent1, framesCent10, framesCent20, framesCent5, framesCent50, framesDallor1)
    
    const times = new PIXI.AnimatedSprite(Slot.createTexture(frames));

    times.position.set(20, -280);
    times.rotation = 0.07;
    times.buttonMode = false;
    times.animationSpeed = 0.4;
    times.play()
    this.slotTime.push({times: times, id: horizonID})
    container.addChild(times);
    console.log('slotTime => ', this.slotTime)
  }

  #_createBackground() {
    const frames = [
      'bgJp',
      'bgNormal'
    ]

    const bgCount = Math.ceil(this.#_mainSceneHeight / 600);
    new Array(bgCount).fill('').forEach((item, index) => {
      const bg = new PIXI.AnimatedSprite(Slot.createTexture(frames))

      if (this.#_brandName === 'daito' || this.#_brandName === 'sammy') {
        bg.gotoAndStop(0)
      } else {bg.gotoAndStop(1)}
      if (index > 0) {
        bg.y = this.#_prevBg.height + this.#_prevBg.y;
      }
      this.addChild(bg);
      this.#_prevBg = bg;
      console.log('bg => ', bgCount, this.height, this.#_mainSceneHeight)
    });
  }

  #_createShowGirl(container) {
    //add to slotContainer
    const frames = [
      'showGirlLeft',
      'showGirlRight',
    ]
    const showGirl = new PIXI.AnimatedSprite(Slot.createTexture(frames))
    container.addChild(showGirl)
  }

  #_createSign() {
    const frames = [
      'signJp',
      'signNormal'
    ]
    //最上面的東西
    if (this.#_brandName === 'daito' || this.#_brandName === 'sammy') {
      const sign = new PIXI.AnimatedSprite(Slot.createTexture(frames))
      sign.gotoAndStop(0)
      sign.y = -70;
      this.addChild(sign);
    } else {return}
  }
}
