import React, {useState, useEffect} from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Button,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
//import * as ScreenOrientation from 'expo-screen-orientation'

import Card from "../components/Card";
import Colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
    //ScreenOrientation.unlockAsync()

    const [enteredValue, setEnteredValue] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonWidth, setButtonWidth] = useState(
        Dimensions.get("window").width / 4
    );

    const numberInputHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ""));
    };

    const resetInputHandler = () => {
        setEnteredValue("");
        setConfirmed(false);
    };

    // This will run at every render, every time the screen is rotated
    useEffect(() => {
        // This will update the dimensions every time the device is rotated / if the width changes.
        const updateLayout = () => {
            setButtonWidth(Dimensions.get("window").width / 4);
        };

        //Listener if the user rotates the device
        Dimensions.addEventListener("change", updateLayout);

        // Cleaner, deletes the eventlister so a new one will be created after render
        return () => {
            Dimensions.removeEventListener("change", updateLayout);
        };
    });

    const confirmInputHandler = () => {
        // these all all activate at the same time.
        const chosenNumber = parseInt(enteredValue);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            // only valid numbers and non negative numbers are allowed
            Alert.alert(
                "InvalidNumber!",
                "Number has to be a number between 1 and 99",
                [
                    {
                        text: "Okay",
                        style: "destructive",
                        onPress: resetInputHandler,
                    },
                ]
            );
            return;
        }
        setEnteredValue("");
        setSelectedNumber(parseInt(enteredValue)); // this will parse the string into a number
        setConfirmed(true);
        Keyboard.dismiss();
    };

    let confirmedOutput;
    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text> Chosen Number: </Text>
                <NumberContainer> {selectedNumber} </NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={30}
            >
                {/* behavior="position" best of iOS, behavior="padding best on Android" */}
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss(); // This will dismiss the keyboard if tapped elsewhere on the screen
                    }}
                >
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>
                            Start New Game!
                        </TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText> Select a Number </BodyText>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredValue}
                            />
                            <View style={styles.buttonContainer}>
                                <View
                                    style={{
                                        width: buttonWidth,
                                    }}
                                >
                                    <Button
                                        title="Reset"
                                        onPress={resetInputHandler}
                                        color={Colors.accent}
                                    />
                                </View>
                                <View
                                    style={{
                                        width: buttonWidth,
                                    }}
                                >
                                    <Button
                                        title="Confirm"
                                        onPress={confirmInputHandler}
                                        color={Colors.primary}
                                    />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: "open-sans-bold",
    },
    inputContainer: {
        width: "80%",
        //maxWidth: '80%',
        maxWidth: "95%",
        minWidth: 300,
        alignItems: "center",
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 15,
    },
    // button: {
    //     // width: 100
    //     width: Dimensions.get('window').width / 4 // for finding out how many pixels you have available on the width and on the height
    //     //width: '40%' //  percentage here always refers to the direct parent view and not always to the available width of the device
    // },
    input: {
        width: 50,
        textAlign: "center",
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});
