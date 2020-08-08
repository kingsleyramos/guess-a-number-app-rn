/* eslint-disable react/prop-types */
import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TouchableNativeFeedback,
    Platform,
} from "react-native";

import Colors from "../constants/colors";

const MainButton = (props) => {
    let ButtonComponent = TouchableOpacity;

    if (Platform === "android" && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default MainButton;

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 25,
    },
    buttonText: {
        color: "white",
        fontFamily: "open-sans",
        fontSize: 18,
    },
});
