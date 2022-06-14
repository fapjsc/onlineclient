export const getEgmImage = ({ model, brandName }) => {
  let image;
  try {
    // eslint-disable-next-line
    image = require(`../assets/slot-list/${brandName}/${model}.webp`);
  } catch (error) {
    // eslint-disable-next-line
    image = require(`../assets/slot-list/找不到圖片.png`);
  }

  return image;
};

export const getBrandImage = (brand) => {
  let image;
  try {
    // eslint-disable-next-line
    image = require(`../assets/brand/${brand}.webp`);
  } catch (error) {
    // eslint-disable-next-line
    image = require(`../assets/slot-list/找不到圖片.png`);
  }

  return image;
};

export const getEgmBg = ({ brandName, model }) => {
  let image;

  try {
    // eslint-disable-next-line
    image = require(`../assets/game-machine/${brandName}/${model}.webp`);
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }

  return image;
};

export const getMainBtnImg = ({ name, brand, model }) => {
  let imgObj;
  try {
    //eslint-disable-next-line
    imgObj = require(`../assets/button/${brand}/${model}/main/en/${name}.webp`);
  } catch (error) {
    console.log(error);
    //eslint-disable-next-line
    // imgObj = require('../assets/button/aruze/sub/en/bet-1.webp');
  }

  return imgObj;
};

export const getCoinBtnImg = ({ model, brand }) => {
  let imgObj;
  try {
    //eslint-disable-next-line
    imgObj = require(`../assets/button/${brand}/${model}/coin.webp`);
  } catch (error) {
    console.log(error);
    //eslint-disable-next-line
    // imgObj = require('../assets/button/aruze/sub/en/bet-1.webp');
  }

  return imgObj;
};

export const getSubBtnImg = ({ name, brand }) => {
  let imgObj;
  try {
    //eslint-disable-next-line
    imgObj = require(`../assets/button/${brand}/sub/en/${name}.webp`);
  } catch (error) {
    console.log(error);
    //eslint-disable-next-line
    imgObj = require('../assets/button/aruze/sub/en/bet-1.webp');
  }

  return imgObj;
};

export const getSubBtnImgSelect = ({ name, brand }) => {
  let imgObj;
  try {
    //eslint-disable-next-line
    imgObj = require(`../assets/button/${brand}/sub/en/${name}-select.webp`);
  } catch (error) {
    //eslint-disable-next-line
    imgObj = require('../assets/button/aruze/sub/en/bet-100-select.webp');
  }

  return imgObj;
};

// Jp Slot
export const getGameDescriptionImg = ({ model, brand }) => {
  let imgObj;
  try {
    //eslint-disable-next-line
    imgObj = require(`../assets/game-description/${brand}/${model}.webp`);
  } catch (error) {
    console.log(error);
    //eslint-disable-next-line
    imgObj = require('../assets/game-description/sammy/拳王.webp');
  }

  return imgObj;
};
