import * as PIXI from 'pixi.js';
import { Globals } from '../Globals';

export class PeopleAnim extends PIXI.AnimatedSprite {
  constructor(id, sexual) {
    const frames = [
      'manFrame1',
      'manFrame2',
      'manFrame3',
      'manFrame4',
      'manFrame5',
      'manFrame6',
    ];
    const textureArray = [];
    for (let i = 0; i < frames.length; i++) {
      const texture = PIXI.Texture.from(frames[i]);

      textureArray.push(texture);
    }
    if (sexual === 1) {
      super(textureArray);
    } else {
      super(Globals.resources.woman.texture);
    }
    this.id = id;
    this.width = 70;
    this.height = 90;
    this.position.set(60, 20);
    this.animationSpeed = 0.1;
    this.name = 'people';
    this.interactive = true;
    this.buttonMode = true;
    this.Event();
    this.play();

    //this.peopleEvent = this.Event;
  }

  Event() {
    this.on('pointerover', () => {
      this.tint = 0xFF093;
    });
    this.on('pointerout', () => {
      this.tint = 0xFFFFFF;
    });
    this.on('click', () => {
      console.log(`people ${this.id} is clicked`);
    });
  }
}
