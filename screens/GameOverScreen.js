import React from 'react'
import { StyleSheet, Text, View, Button, Image } from 'react-native'
import DefaultStyles from '../constants/default-styles'
import BodyText from '../components/BodyText'
import MainButton from '../components/MainButton'

import Colors from '../constants/colors'

const GameOverScreen = (props) => {
    return (
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
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        overflow: 'hidden',
        margin: 30
    },
    highlight: {
        color: Colors.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        marginHorizontal: 30,
        marginBottom: 20
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20
    }
})
