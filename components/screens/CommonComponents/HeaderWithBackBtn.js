import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class HeaderWithBackBtn extends Component {
    pop() {
        // this.props.navigationProps.navigation.pop()
        console.log("===")
    }
    render() {
        return (
            <View style={{backgroundColor:'green', height: 65, justifyContent: 'center', alignItems: 'flex-start' }}>
                <TouchableOpacity style={{ justifyContent: 'center', backgroundColor: 'red', alignItems: 'center' ,zIndex: 1}} onPress={() => console.log("press===")}>
                    {/* <Image
                        source={require('../../../assets/back.png')}
                        style={styles.backImage}
                    /> */}
                    <Text>back</Text>
                </TouchableOpacity>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    backImage: {
        height: 25,
        width: 24,
        marginLeft: 9,
        marginRight: 12,
        marginVertical: 12,
        resizeMode: 'contain',

    },
});
