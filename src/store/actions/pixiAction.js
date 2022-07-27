import { pixiActionTypes } from '../types';
import { store } from '../index';

export const setPixiStatus = (status, slotType = null) => {
  if (status) {
    return { type: pixiActionTypes.STATUS_ON, payload: slotType };
  }
  return { type: pixiActionTypes.STATUS_OFF };
};

// eslint-disable-next-line arrow-body-style
export const setPeople = (data) => {
  //data => {id: , sexual: , level: }
  //const { people } = store.getState().peopleList;
  console.log(data);
  return {
    type: pixiActionTypes.SET_PEOPLE,
    payload: [data],
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

// eslint-disable-next-line arrow-body-style
export const setSlot = (data) => {
  //data => {id: , machine: , mode: }
  //const { slot } = store.getState().slotList;
  console.log(data);
  return {
    type: pixiActionTypes.SET_SLOT,
    payload: [data],
  };
};

export const changeSlot = (id, machine, mode) => {
  const { slot } = store.getState().slotList;
  //console.log(id, machine, mode);
  const slotChanged = slot.map((item) => {
    if (item.id === id) {
      //console.log('change => ', id);
      return {
        id: id,
        machine: machine,
        mode: mode,
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
