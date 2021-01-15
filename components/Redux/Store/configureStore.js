import {createStore, combineReducers,applyMiddleware} from 'redux';
import userReducer from '../Reducer/reducer';
import AsyncStorage from '@react-native-community/async-storage';
import counter from '../Reducer/countReducer';
import { persistStore, persistReducer } from 'redux-persist' 
import thunk from 'redux-thunk';
import logger from 'redux-logger'
const persistConfig = { // configuration object for redux-persist
  key: 'root',
  storage : AsyncStorage, // define which storage to use
  whitelist: ['userReducer']
}

const rootReducer = combineReducers({user: userReducer});
const configureStore = persistReducer(persistConfig, rootReducer); // create a persisted reducer

export default()=>{
  const store = createStore(configureStore, 
    // applyMiddleware(logger) 
  );
  
  const persistor = persistStore(store); 
  
  return {store, persistor};
}




