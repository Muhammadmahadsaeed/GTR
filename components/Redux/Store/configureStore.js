import {createStore, combineReducers,applyMiddleware} from 'redux';
import userReducer from '../Reducer/reducer';
import AsyncStorage from '@react-native-community/async-storage';
import counter from '../Reducer/countReducer';
import { persistStore, persistReducer } from 'redux-persist' 
import thunk from 'redux-thunk';
const persistConfig = { // configuration object for redux-persist
  key: 'root',
  storage : AsyncStorage // define which storage to use
}

const rootReducer = combineReducers({user: userReducer,counter:counter});
const configureStore = persistReducer(persistConfig, rootReducer); // create a persisted reducer

const store = createStore(
  configureStore, // pass the persisted reducer instead of rootReducer to createStore
  applyMiddleware(thunk) // add any middlewares here
);

const persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export {store, persistor};


