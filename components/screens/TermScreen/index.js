import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    FlatList,
    Dimensions,
    Linking
} from 'react-native';

export default class TermAndCondition extends Component {

    render() {
        return (
            <ScrollView style={{ flex: 1, }}>
                <Image
                    style={styles.backgroundImage}
                    source={require('../../../assets/bg1.png')}
                />
                <View style={styles.Notification}>
                    <Text style={styles.NotificationText}>Term And Condition</Text>
                </View>
                <View style={styles.paraView}>
                    <Text style={styles.para}>
                        Through our Guess That Receipt Game Show(GTR) App 3 new Gamers will be selected and notified that (A).They have been selected (B) .The game starts in 10 minutes .
                    </Text>
                </View>
                <View style={styles.paraView}>
                    <Text style={styles.para}>
                        The GTR game show starts at 7 pm on Mon-Fri and is viewed only on the GTR game app .
                    </Text>
                </View>
                <View style={styles.paraView}>
                    <Text style={styles.para}>
                        There will be a 10 minute countdown premiering our sponsors before the game starts.
                    </Text>
                </View>
                <View style={styles.paraView}>
                    <Text style={styles.para}>
                        Once the game starts the host will appear and say their opening remarks and introduce the Gamers and the Buyer to each other .
                    </Text>
                </View>
                <View style={styles.paraView}>
                    <Text style={styles.para}>
                        The host will showcase what the Buyer is buying and give 10 Gamers a chance to observe the products, the amount and the cashier's prices as items add up on the cash register , but the Gamers won’t see the total amount until after the 10 seconds is up and the gamers guess that receipt. The host will announce the correct price on the receipt.
                    </Text>
                </View>
                <View style={styles.paraView}>
                    <Text style={styles.para}>
                        If two Gamers guess the same number they split the prize 50/50.
                    </Text>
                </View>
                <View style={styles.paraView}>
                    <Text style={styles.para}>
                        The buyer wins the total price if one of the Gamers guesses the correct price or comes within $4 of the total price on the receipt . All it takes is just one Gamer to win and the buyer wins their total purchase price .
                    </Text>
                </View>
                <View style={styles.paraView}>
                    <Text style={styles.para}>
                        The Buyers and Gamers will be just random people that GTR staff walks up too, contact,  select, and schedule to participate in the game.
                    </Text>
                </View>
                <View style={styles.paraView}>
                    <Text style={styles.para}>
                        Each Gamer will sign the rights to play when they download the GTR app. All the Buyers will sign authorization forms in person before the game starts or before the prize money in the form of a check is released. Walk-up Gamers will also sign an authorization form before the game starts .
                    </Text>
                </View>
                <View style={styles.paraView}>
                    <Text style={styles.para}>
                        All winners will be showcased in our winners profile page alone with interviews .
                    </Text>
                </View>
                <View style={[styles.paraView,{marginBottom:50}]}>
                    <Text style={styles.para}>
                        All rules are subject to change.
                    </Text>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    backgroundImage: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    Notification: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    NotificationText: {
        fontFamily: 'Montserrat-Bold',
        color: '#81b840',
        fontSize: 20,
    },
    paraView: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    para: {
        fontSize: 16,
        color: '#81b840',
        fontFamily: 'Montserrat-Regular',
        textAlign: 'justify',
    },
    btn: {
        marginTop: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        alignSelf: 'center',
        backgroundColor: '#81b840',
    },
    btnText: {
        color: 'white',
        fontFamily: 'Montserrat-Regular',
        fontSize: 16,
    },
});
