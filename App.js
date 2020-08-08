import React, {useState} from 'react';
import { StyleSheet, View, SafeAreaView } from 'react-native';
import Header from './components/Header'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen'

const fetchFonts = () => {
    return Font.loadAsync({
        'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
    })
}

export default function App(props) {
    const [userNumber, setUserNumber] = useState();
    const [guessRounds, setGuessRounds] = useState(0)
    const [dataLoaded, setDataLoaded] = useState(false)

    if (!dataLoaded) {
        return (
        <AppLoading 
            startAsync={fetchFonts} 
            onFinish={() => setDataLoaded(true)}
            onError={() => console.log(err)} />
            // StartAsync needs to be a function and need to return a promise
        )
    }

    const configureNewGameHandler = () => {
        setGuessRounds(0);
        setUserNumber(null)
    }

    const startGameHandler = (SelectedNumber) => {
        setUserNumber(SelectedNumber);
        setGuessRounds(0)
    }

    const gameOverHandler = (numberOfRounds) => {
        setGuessRounds(numberOfRounds)
    }

    let content = <StartGameScreen onStartGame={startGameHandler} />

    if (userNumber && guessRounds <= 0) {
        content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler}/>
    } else if (guessRounds > 0) {
        content = <GameOverScreen roundsNumber={guessRounds} userNumber={userNumber} onRestart={configureNewGameHandler} />
    }
    

    return (
        <SafeAreaView style={styles.container}>
            <Header title='Guess a Number' />
            {content}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
