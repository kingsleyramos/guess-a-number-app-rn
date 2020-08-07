import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const TitleText = (props) => {
    return (
        <Text style={{...props.style, ...styles.headerTitle}}>{props.children}</Text>
    )
}

export default TitleText

const styles = StyleSheet.create({
    headerTitle:{
        color: 'black',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    }
})
