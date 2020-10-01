import {createStore, combineReducers} from 'redux';
import userReducer from '../Reducer/reducer';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer } from 'redux-persist' 

const persistConfig = { // configuration object for redux-persist
  key: 'root',
  storage : AsyncStorage // define which storage to use
}

const rootReducer = combineReducers({user: userReducer});



const configureStore = persistReducer(persistConfig, rootReducer) // create a persisted reducer

const store = createStore(
  
  configureStore, // pass the persisted reducer instead of rootReducer to createStore
  // applyMiddleware() // add any middlewares here
)

const  persistor = persistStore(store); // used to create the persisted store, persistor will be used in the next step

export {store, persistor}


