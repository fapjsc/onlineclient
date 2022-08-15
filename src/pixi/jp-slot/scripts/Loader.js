/* eslint-disable */
import { loadConfig } from './loaderConfig';
import { Globals } from './Globals';
import * as PIXI from 'pixi.js';

export class Loader {
  #_text = null;
  #_progress = null;
  #_mainSceneWidth = 0;
  #_mainSceneHeight = 0;
  constructor(app) {
    this.loader = app.loader;
    this.resources = loadConfig;
    this.#_mainSceneWidth = app.appWidth;
    app.stage.addChild(this.container());
    console.log(app.appWidth)
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


  loadingHandler(event){
    // console.log("onProgress: ", event);
    this.#_text.text = '載入中  ' + (event.progress | 0) + '%';
    this.#_progress.beginFill(0x93ff93);
    this.#_progress.drawRoundedRect(0, 0, (event.progress | 0) * 3, 30, 50)
    this.#_progress.endFill();
  }

  container() {
    const progressContainer = new PIXI.Container()
    progressContainer.position.set((this.#_mainSceneWidth - 300 ) / 2, 200)
    console.log(this.#_mainSceneWidth)
    this.#_text = new PIXI.Text(this._now, {
      fontSize: 20,
      fill: 0xffffff
    });
    this.#_progress = new PIXI.Graphics();

    this.#_text.position.set(100, 50)
    progressContainer.addChild(this.#_text, this.#_progress)
    return progressContainer;
  }



  preload() {
    return new Promise((resolve) => {
      //可取得下載進度
      this.loader.onProgress.add(this.loadingHandler.bind(this));
      Object.keys(this.resources).forEach((key) => {
        this.loader.add(key, this.resources[key]);
      });
      this.loader.load((loader, resources) => {
        Globals.resources = resources;
        resolve();
      });
    });
  }
}
