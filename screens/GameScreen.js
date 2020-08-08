import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, Text, View, Button, Alert, ScrollView, FlatList, Dimensions} from 'react-native'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card'
import { Ionicons } from '@expo/vector-icons'

import DefaultStyles from '../constants/default-styles'
import MainButton from '../components/MainButton'
import BodyText from '../components/BodyText'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum
    };
}

// for ScrollView:
// const renderListItem = (value, numbOfRound) => (
//     <View key={value} style={styles.listItem}>
//         <BodyText>Round #{numbOfRound}</BodyText>
//         <BodyText>{value}</BodyText>
//     </View>
// )

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>Round #{listLength - itemData.index}</BodyText>
        <BodyText>{itemData.item}</BodyText>
    </View>
)

const GameScreen = (props) => {
    const initialGuess = generateRandomBetween(1,100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    //const [pastGuesses, setPastGuesses] = useState([initialGuess]) // for ScrollView
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()])
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const { userChoice, onGameOver } = props // Destruct the props in order to not use 'props' in useEffect

    useEffect(() => {
        if (currentGuess == userChoice) {
            onGameOver(pastGuesses.length)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = (direction) => {
        if ((direction == 'lower' && currentGuess < props.userChoice) || 
            (direction == 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('Dont\'t lie', 'You know this is wrong...', [
                { 
                    text: 'sorry!', 
                    style: 'cancel'
                }
            ]);
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current, 
            currentHigh.current, 
            currentGuess
        )
        setCurrentGuess(nextNumber)
        //setRounds(currentRounds => currentRounds + 1)
        //setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]) // for ScrollView
        setPastGuesses(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])
    }

    // Example for conditional Styles for Dimensions API
    // let listContainerStyle = styles.listContainer
    // if (Dimensions.get('window').width < 350){
    //     listContainerStyle = styles.listContainerBig;
    // }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponents Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name='md-remove' size={24} color='white'/>
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')}>
                    <Ionicons name='md-add' size={24} color='white'/>    
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => (
                        renderListItem(guess,  pastGuesses.length - index )
                    ))}
                </ScrollView> */}
                <FlatList 
                    keyExtractor={(item) => item} 
                    data={pastGuesses} 
                    renderItem={renderListItem.bind(this, pastGuesses.length)}>
                </FlatList>
            </View>
        </View>
    )
}

export default GameScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 300,
        maxWidth: '90%'
    },
    listContainer: {
        width: Dimensions.get('window').width > 350 ? '60%' : '80%',
        flex: 1,
    },
    list:{
        flexGrow: 1, // more flexable that flex for lists
        // alignItems: 'center',
        justifyContent: 'flex-end'
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        //width: '80%', for ScrollView
        width: '100%'
    }
})
