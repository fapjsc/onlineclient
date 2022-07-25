import { pixiActionTypes } from '../types';
import { store } from '../index';

export const setPixiStatus = (status, slotType = null) => {
  if (status) {
    return { type: pixiActionTypes.STATUS_ON, payload: slotType };
  }
  return { type: pixiActionTypes.STATUS_OFF };
};

export const setPeople = (data) => {
  const { people } = store.getState().peopleList;
  return {
    type: pixiActionTypes.SET_PEOPLE,
    payload: [...people, data],
  };
};

export const changePeople = (id, sexual, level) => {
  const { people } = store.getState().peopleList;
  //console.log(people);
  const peopleChanged = people.map((item) => {
    if (item.id === id) {
      return {
        id: id,
        sexual: sexual,
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

export const setSlot = (data) => {
  const { slot } = store.getState().slotList;
  return {
    type: pixiActionTypes.SET_SLOT,
    payload: [...slot, data],
  };
};

export const changeSlot = (id, machine, mode) => {
  const { slot } = store.getState().slotList;
  //console.log(people);
  const slotChanged = slot.map((item) => {
    if (item.id === id) {
      return {
        id: id,
        machine: machine,
        mode: mode,
      };
    }
    return item;
  });
  //console.log(peopleChanged);
  return {
    type: pixiActionTypes.CHANGE_SLOT,
    payload: slotChanged,
  };
};
