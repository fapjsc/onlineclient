/* eslint-disable */
import { loadConfig } from './loaderConfig';
import { Globals } from './Globals';

export class Loader {
  constructor(loader) {
    this.loader = loader;
    this.resources = loadConfig;

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

  preload() {
    return new Promise((resolve) => {
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
