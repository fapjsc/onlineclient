import * as PIXI from 'pixi.js';
import { Globals } from './Globals';
import { PeopleContainer } from './people/PeopleContainer';
import { Slot } from './Slot';
import Stage from './Stage';

export class SlotPeopleContainer extends PIXI.Container {
  constructor(positionX, positionY, amount) {
    super();
    this.width = 100;
    this.height = 100;
    this.position.set(positionX, positionY);
    this.amount = amount;
    this.createContainer();
  }

  createContainer() {
    this.createStage();
    this.createTimes();
    //eslint-disable-next-line
    for (let item = this.amount; item > 0; item--) {
      const container = new PIXI.Container();
      container.position.set(-30 + item * 47, 0 - item * 20);
      const slot = new Slot(item);
      const peopleContainer = new PeopleContainer(item, 1, 'vip');
      //slot.x = slot.toLocal(slot.position, people).x;
      container.addChild(slot, peopleContainer);
      this.addChild(container);
    }
  }

  createStage() {
    const stage = new Stage(this.amount);
    this.addChild(stage);
  }

  createTimes() {
    const times = new PIXI.Sprite(Globals.resources.times.texture);
    times.position.set(0, -280);
    times.rotation = 0.07;
    this.addChild(times);
  }
}
