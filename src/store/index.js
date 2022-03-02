import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

// 持久化存储 state
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducer
import { userReducer } from './reducers/userReducer';
import {
  egmListReducer,
  selectEgmReducer,
  egmButtonPressReducer,
  cashInOutReducer,
} from './reducers/egmReducer';

const reducer = combineReducers({
  user: userReducer,
  egmList: egmListReducer,
  selectEgm: selectEgmReducer,
  egmButtonPress: egmButtonPressReducer,
  cashInOut: cashInOutReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'selectEgm'], // only member will be persisted
};

const middleware = [thunk];

// 持久化根reducers
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export const persisStore = persistStore(store);
