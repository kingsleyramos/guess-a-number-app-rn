import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else return rndNum;
}

const GameScreen = (prop) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoice));
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({})
