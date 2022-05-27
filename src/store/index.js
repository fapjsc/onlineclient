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
} from './reducers/egmReducer';

import chatReducer from './reducers/chatReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'selectEgm', 'egmStatus'], // only member will be persisted
};

const reducer = combineReducers({
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
