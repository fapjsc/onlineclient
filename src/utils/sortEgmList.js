/* eslint-disable */
const sortEgmList = (Arr) => {
  let sorted = Arr.sort((a, b) => a?.id - b?.id)
  // console.log(sorted)
  return sorted;
};
export default sortEgmList;
