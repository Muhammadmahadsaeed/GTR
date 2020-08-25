import React from 'react';
import {

  StyleSheet,
  ImageBackground,
  View, Image,
  Text, TouchableOpacity,ActivityIndicator

} from 'react-native';



export default class SplashScreen extends React.Component {
  constructor(){
    super()
    this.state = {
      loading : true
    }
  }
  componentDidMount() {
    setTimeout( () => {
       this.setTimePassed();
    },2000);

  }
  setTimePassed() {
     this.setState({loading : false}) 
     this.props.navigation.navigate('AuthScreen')
  }
  render() {
    return (

      <View style={styles.container} >
        <ImageBackground style={styles.backgroundImage} source={require('../../../../assets/bg.png')}>

          <View style={styles.logoContainer}>
            <View style={styles.centerImage}>
               <Image style={styles.logo} source={require('../../../../assets/Logo.png')} /> 

            </View>
            
               <ActivityIndicator size="large" color="white" />
            


          </View>
        </ImageBackground>
      </View>
    );
  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  logoContainer: {
    
    justifyContent: "center",
    alignItems: "center",
    flex:1
  },
  
  centerImage : {
    
    justifyContent: "center",
    alignItems: "center",
    height:400,
    width:"80%"
  },
  logo: {
   height:150,
   width : "100%"
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
   
  },
});