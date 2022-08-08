/* eslint-disable */
import { loadConfig } from './loaderConfig';
import { Globals } from './Globals';
import * as PIXI from 'pixi.js';

export class Loader {
  #_text = null
  #_bg = 0
  #_now = 0
  constructor(loader) {
    this.loader = loader;
    this.resources = loadConfig;

    this.#_text = new PIXI.Text(this._now, {
      fontSize: 24,
      fill: 0xffffff
    });

    //載入檔案錯誤時
    // this.loader.onError.add((err) => {
    //   // console.log("error:", err);
    // });

    // //可取得下載進度
    // this.loader.onProgress.add((event) => {
    //   // console.log("onProgress: ", event.progress);
    // });

    // //每個檔案載入時都會呼叫
    // this.loader.onLoad.add((event, target) => {
    //   // console.log("onLoad: ", target.name);
    // });
    // this.loader.onComplete.add((loader, resources) => {
    //   // console.log("加載完成");
    // });
  }

  // loadingScene() {
  //   const loading = new PIXI.Constainer()
  // }


  loadingHandler(){

    let loadingWidth = 400; //範例進度條寬度400
    let once = loadingWidth / 100; //每1%跑多少距離
    let limit = this.loader.progress / 100 * loadingWidth //目前最多跑到哪

    if(this.#_bg.x < limit){
      // anim.x += once;
      bg.x += once;
      this.#_now < limit ? this.now++ : limit;
    }
    this.#_text.text = this.now + '%';
  }



  preload() {
    return new Promise((resolve) => {
      Object.keys(this.resources).forEach((key) => {
        this.loader.add(key, this.resources[key]);
      });

      // //可取得下載進度
      // this.loader.onProgress.add((event) => {
      //   console.log("onProgress: ", event.progress);
      //   new Promise((resolve) => {
      //     setTimeout(() => {
      //       this.loadingHandler();
      //     }, 2000);
      //   })
      // });

      this.loader.load((loader, resources) => {
        Globals.resources = resources;
        resolve();
      });
    });
  }
}
