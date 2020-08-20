
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import MainNavigator from './components/config/Navigation';



function App(){
  return (
    <View style={styles.container}>
      <MainNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1
  }
 
});

export default App;
