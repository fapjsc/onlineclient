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
    image = require(`../assets/brand/${brand}.png`);
  } catch (error) {
    // eslint-disable-next-line
    image = require(`../assets/slot-list/找不到圖片.png`);
  }

  return image;
};
