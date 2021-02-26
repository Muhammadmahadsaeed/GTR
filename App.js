import React from 'react';
import MainNavigator from './components/config/Navigation';
import {Provider} from 'react-redux';
import {store, persistor} from './components/Redux/Store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './components/screens/AuthScreen/SplashScreen/SplashScreen';
function App() {
 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
        {/* <SplashScreen /> */}
      </PersistGate>
    </Provider>
  );
}

export default App;
