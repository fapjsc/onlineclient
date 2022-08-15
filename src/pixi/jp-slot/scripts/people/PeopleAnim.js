/* eslint-disable */
import * as PIXI from 'pixi.js';
import { Slot } from '../Slot';
import HitAreaShapes from 'hitarea-shapes';
import people from '../../sprites/people.json'

const textureArr = () => {
  const frames = [
    'manFrame11',
    'manFrame12',
    'manFrame13',
    'manFrame14',
    'manFrame15',
    'manFrame16',
    'womanFrame11',
    'womanFrame12',
    'womanFrame13',
    'womanFrame14',
    'womanFrame15',
    'womanFrame16',
    'womanFrame21',
    'womanFrame22',
    'womanFrame23',
    'womanFrame24',
    'womanFrame25',
    'womanFrame26',
  ];

  return Slot.createTexture(frames);
};

export class PeopleAnim extends PIXI.AnimatedSprite {
  constructor(id) {
    super(textureArr());
    this.position.set(60, 20);
    this.animationSpeed = 0.2;
    this.name = 'people';
    this.interactive = true;
    this.buttonMode = true;
    this.#Event();
    this.#_hitArea()
    // let frames = 0;
    // if (sexual === 'w1') {
    //   frames = 6;
    // } else if (sexual === 'w2') {
    //   frames = 12;
    // }
    // this.gotoAndPlay(frames);
    /* eslint-disable prefer-template */
    this.id = id;
    this.play();

    //this.peopleEvent = this.Event;
  }

  #Event() {
    this.on('pointerover', () => {
      this.tint = 0xD0D0D0;
    });
    this.on('pointerout', () => {
      this.tint = 0xFFFFFF;
    });
    this.on('click', () => {
      console.log(`people ${this.id} is clicked`);
    });
  }

  #_hitArea() {
    this.hitArea = new HitAreaShapes(people)
  }
}
