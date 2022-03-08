// 千分位加上小數點
export const thousandsFormat = (text) => (text * 1).toFixed(0).replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

export const temp = () => {};
