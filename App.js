import React from 'react';
import {StyleSheet, View} from 'react-native';
import MainNavigator from './components/config/Navigation';
import {Provider} from 'react-redux';
import {store, persistor} from './components/Redux/Store/configureStore';
import {PersistGate} from 'redux-persist/integration/react';

function App() {
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
