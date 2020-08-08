import React from 'react'
import { StyleSheet, Text, View, Button, Image, Dimensions, ScrollView } from 'react-native'
import DefaultStyles from '../constants/default-styles'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'

import Colors from '../constants/colors'

const GameOverScreen = (props) => {
    return (
        <ScrollView>
        <View style={ styles.screen}>
            <Text style={DefaultStyles.title}>Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image
                    style={styles.image} 
                    //source={require('../assets/success.png')}
                    source={{uri: 'https://uiaa-web.azureedge.net/wp-content/uploads/2017/12/2018_banner.jpg'}}
                    // Network images MUST be resized directly, not from the parent
                    resizeMode='cover' />
            </View>
                <View style={styles.resultContainer}>
                    <BodyText style={styles.resultText}>
                        Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text>
                    </BodyText>
                </View>

            <MainButton onPress={props.onRestart}>New Game</MainButton>
        </View>
        </ScrollView>
    )
}

export default GameOverScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderRadius: Dimensions.get('window').width * 0.7 / 2,
        borderWidth: 3,
        borderColor: 'black',
        width: Dimensions.get('window').width * 0.7,
        height: Dimensions.get('window').width * 0.7,
        overflow: 'hidden',
        marginVertical: Dimensions.get('window').height / 30 
    },
    resultContainer: {
        marginHorizontal: 30,
        marginVertical: Dimensions.get('window').height / 60 
    },
    resultText: {
        textAlign: 'center',
        fontSize: Dimensions.get('window').height < 400 ? 16 : 20  
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
})
