import React from 'react';
import MainNavigator from './components/config/Navigation';
import {Provider} from 'react-redux';
import {store, persistor} from './components/Redux/Store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
