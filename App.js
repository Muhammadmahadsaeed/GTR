import React from 'react';
import MainNavigator from './components/config/Navigation';
import {Provider} from 'react-redux';
import reduxStore from './components/Redux/Store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';
import SplashScreen from './components/screens/AuthScreen/SplashScreen/SplashScreen';
function App() {
  const {store, persistor} = reduxStore();
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
