import * as PIXI from 'pixi.js';
import { Globals } from './Globals';
import { store } from '../../../store/index';
import { setPixiStatus } from '../../../store/actions/pixiAction';

export class Slot extends PIXI.Sprite {
  constructor(id, offsetX, offsetY, slotType) {
    let machine = null;
    if (slotType === 'slotGizon') {
      machine = 'slotGizon';
    } else if (slotType === 'slot') {
      machine = 'slot';
    }
    super(Globals.resources[machine].texture);
    // eslint-disable-next-line prefer-template
    this.id = id;
    this.interactive = true;
    this.buttonMode = true;
    this.name = machine;
    this.width = 130;
    this.height = 130;
    this.position.set(offsetX, offsetY - 10);
    this.Event();
  }

  Event() {
    this.on('pointerover', () => {
      this.tint = 0xFFE66F;
    });
    this.on('pointerout', () => {
      this.tint = 0xFFFFFF;
    });
    this.on('pointerdown', () => {
      console.log(`slot ${this.id} is clicked`);
      store.dispatch(setPixiStatus(true, this.name));
    });
  }
}
