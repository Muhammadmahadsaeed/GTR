import {createStore, combineReducers, applyMiddleware} from 'redux';
import user from '../Reducer/reducer';
import AsyncStorage from '@react-native-community/async-storage';
import counter from '../Reducer/countReducer';
import {persistStore, persistReducer} from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
const persistConfig = {
  // configuration object for redux-persist
  key: 'root',
  storage: AsyncStorage, // define which storage to use
  whitelist: ['user'],
};

// const rootReducer = combineReducers({user: userReducer});
const configureStore = persistReducer(persistConfig, user); // create a persisted reducer

const store = createStore(configureStore);

const persistor = persistStore(store);

export {store, persistor};
