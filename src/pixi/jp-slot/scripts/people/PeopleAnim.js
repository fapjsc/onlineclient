import * as PIXI from 'pixi.js';
import { Globals } from '../Globals';

const textureArr = (sexual) => {
  let frames = [];
  const textureArray = [];
  if (sexual === 'm1') {
    frames = [
      'manFrame11',
      'manFrame12',
      'manFrame13',
      'manFrame14',
      'manFrame15',
      'manFrame16',
    ];
  } else if (sexual === 'w1') {
    frames = [
      'womanFrame11',
      'womanFrame12',
      'womanFrame13',
      'womanFrame14',
      'womanFrame15',
      'womanFrame16',
    ];
  } else if (sexual === 'w2') {
    frames = [
      'womanFrame21',
      'womanFrame22',
      'womanFrame23',
      'womanFrame24',
      'womanFrame25',
      'womanFrame26',
    ];
  }
  //console.log(sexual);
  for (let i = 0; i < frames.length; i++) {
    const texture = PIXI.Texture.from(frames[i]);

    textureArray.push(texture);
  }
  return textureArray;
};

export class PeopleAnim extends PIXI.AnimatedSprite {
  constructor(id, sexual) {
    super(textureArr(sexual));
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
      this.tint = 0xD0D0D0;
    });
    this.on('pointerout', () => {
      this.tint = 0xFFFFFF;
    });
    this.on('click', () => {
      console.log(`people ${this.id} is clicked`);
    });
  }
}
