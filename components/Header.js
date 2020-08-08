/* eslint-disable react/prop-types */
import React from "react";
import {StyleSheet, Text, View, Platform} from "react-native";

import Colors from "../constants/colors";
import defaultStyles from "../constants/default-styles";

const Header = (props) => {
    return (
        <View
            style={{
                ...styles.header,
                ...Platform.select({
                    ios: styles.headerIOS,
                    android: styles.headerAndroid,
                }),
            }}
        >
            <Text
                style={{
                    ...defaultStyles.title,
                    ...styles.title,
                }}
            >
                {props.title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    headerIOS: {
        backgroundColor: "white",
        borderBottomColor: "#ccc",
        borderBottomWidth: 2,
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
    },
    title: {
        color: Platform.OS === "ios" ? Colors.primary : "white",
    },
});

export default Header;
