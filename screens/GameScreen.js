/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import React, {useState, useRef, useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    Alert,
    FlatList,
    Dimensions,
} from "react-native";
//import * as ScreenOrientation from 'expo-screen-orientation'

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import {Ionicons} from "@expo/vector-icons";

import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
};

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
);

const GameScreen = (props) => {
    //ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)

    const initialGuess = generateRandomBetween(1, 100, props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    //const [pastGuesses, setPastGuesses] = useState([initialGuess]) // for ScrollView
    const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);
    const [availableDeviceWidth, setAvailableDeviceWidth] = useState(
        Dimensions.get("window").width
    );
    const [availableDeviceHeight, setAvailableDeviceHeight] = useState(
        Dimensions.get("window").height
    );
    const currentLow = useRef(1);
    const currentHigh = useRef(100);

    const {userChoice, onGameOver} = props; // Destruct the props in order to not use 'props' in useEffect

    // This will set state available width and height every time screen rotates, if the Dimensions change.
    useEffect(() => {
        const updateLayout = () => {
            setAvailableDeviceWidth(Dimensions.get("window").width);
            setAvailableDeviceHeight(Dimensions.get("window").height);
        };

        Dimensions.addEventListener("change", updateLayout);

        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    });

    useEffect(() => {
        if (currentGuess == userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [currentGuess, userChoice, onGameOver]);

    const nextGuessHandler = (direction) => {
        if (
            (direction == "lower" && currentGuess < props.userChoice) ||
            (direction == "greater" && currentGuess > props.userChoice)
        ) {
            Alert.alert("Don't lie", "You know this is wrong...", [
                {
                    text: "sorry!",
                    style: "cancel",
                },
            ]);
            return;
        }

        if (direction === "lower") {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }
        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHigh.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
        //setRounds(currentRounds => currentRounds + 1)
        //setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses]) // for ScrollView
        setPastGuesses((curPastGuesses) => [
            nextNumber.toString(),
            ...curPastGuesses,
        ]);
    };

    // Example for conditional Styles for Dimensions API
    let listContainerStyle = styles.listContainer;
    if (availableDeviceWidth < 350) {
        listContainerStyle = styles.listContainerBig;
    }

    let gameControls = (
        <React.Fragment>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
        </React.Fragment>
    );

    if (availableDeviceHeight < 500) {
        gameControls = (
            <View style={styles.controls}>
                <MainButton onPress={nextGuessHandler.bind(this, "lower")}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <NumberContainer>{currentGuess}</NumberContainer>
                <MainButton onPress={nextGuessHandler.bind(this, "greater")}>
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </View>
        );
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            {gameControls}
            <View style={listContainerStyle}>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {pastGuesses.map((guess, index) => (
                        renderListItem(guess,  pastGuesses.length - index )
                    ))}
                </ScrollView> */}
                <FlatList
                    keyExtractor={(item) => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        // marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
        width: 300,
        maxWidth: "90%",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "80%",
        alignItems: "center",
    },
    listContainer: {
        width: Dimensions.get("window").width > 350 ? "60%" : "80%",
        flex: 1,
    },
    listContainerBig: {
        flex: 1,
        width: "80%",
    },
    list: {
        flexGrow: 1, // more flexible that flex for lists
        // alignItems: 'center',
        justifyContent: "flex-end",
    },
    listItem: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-around",
        //width: '80%', for ScrollView
        width: "100%",
    },
});
