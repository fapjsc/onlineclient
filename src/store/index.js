import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// 持久化存储 state
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducer
import { userReducer, cryptoReducer } from './reducers/userReducer';
import { menuReducer } from './reducers/menuReducer';
import {
  egmListReducer,
  selectEgmReducer,
  egmButtonPressReducer,
  cashInOutReducer,
  brandReducer,
  aftFormReducer,
  egmStatusReducer,
  leaveEgmReducer,
  bookingListReducer,
} from './reducers/egmReducer';

import { japanSlotReducer } from './reducers/japanSlotReducer';

import chatReducer from './reducers/chatReducer';
import {
  pixiReducer, slotReducer, peopleReducer,
} from './reducers/pixiReducer';

import { warningReducer } from './reducers/warningReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'selectEgm', 'egmStatus', 'japanSlot'], // only member will be persisted
};

const reducer = combineReducers({
  warning: warningReducer,
  peopleList: peopleReducer,
  slotList: slotReducer,
  pixi: pixiReducer,
  user: userReducer,
  egmList: egmListReducer,
  egmStatus: egmStatusReducer,
  selectEgm: selectEgmReducer,
  egmButtonPress: egmButtonPressReducer,
  cashInOut: cashInOutReducer,
  brand: brandReducer,
  crypto: cryptoReducer,
  aftForm: aftFormReducer,
  menu: menuReducer,
  leaveEgm: leaveEgmReducer,
  chat: chatReducer,
  japanSlot: japanSlotReducer,
  bookingList: bookingListReducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    storage.removeItem('persist:root');
    return reducer(undefined, action);
  }

  return reducer(state, action);
};

const middleware = [thunk];

// 持久化根reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export const persisStore = persistStore(store);
