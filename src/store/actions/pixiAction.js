import { pixiActionTypes } from '../types';
import { store } from '../index';

export const setPixiStatus = (status, slot) => {
  if (status) {
    return {
      type: pixiActionTypes.STATUS_ON,
      payload: slot,
    };
  }
  return { type: pixiActionTypes.STATUS_OFF };
};

export const initPeople = () => ({
  type: pixiActionTypes.INIT_PEOPLE,
  payload: null,
});

// eslint-disable-next-line arrow-body-style
export const setPeople = (data) => {
  //data => {id: , sexual: , level: }
  const { people } = store.getState().peopleList;
  const findMutiple = people.find((item) => item.id === data.id);
  const arr = people.filter((item) => item !== findMutiple);
  //console.log('findMutiple', findMutiple);
  return {
    type: pixiActionTypes.SET_PEOPLE,
    payload: [...arr, data],
  };
};

export const changePeople = (id, sexual, level) => {
  const { people } = store.getState().peopleList;
  //console.log(people);
  const peopleChanged = people.map((item) => {
    if (item.id === id) {
      return {
        id: id,
        sexual: (item.sexual !== '' && sexual !== '') ? item.sexual : sexual,
        level: level,
      };
    }
    return item;
  });
  //console.log(peopleChanged);
  return {
    type: pixiActionTypes.CHANGE_PEOPLE,
    payload: peopleChanged,
  };
};

export const initSLot = () => ({
  type: pixiActionTypes.INIT_SLOT,
  payload: null,
});

// eslint-disable-next-line arrow-body-style
export const setSlot = (data) => {
  const { slot } = store.getState().slotList;
  const findMutiple = slot.find((item) => item.id === data.id);
  const arr = slot.filter((item) => item !== findMutiple);
  //console.log(arr);
  return {
    type: pixiActionTypes.SET_SLOT,
    payload: [...arr, data],
  };
};

export const changeSlot = (id, brandName, model, mode, times, egmId) => {
  const { slot } = store.getState().slotList;
  const slotChanged = slot.map((item) => {
    if (item.id === id) {
      //console.log('change => ', id);
      return {
        id: id,
        brandName: brandName,
        model: model,
        mode: mode,
        times: times,
        egmId: egmId,
      };
    }
    return item;
  });
  //console.log(slotChanged);
  return {
    type: pixiActionTypes.CHANGE_SLOT,
    payload: slotChanged,
  };
};
