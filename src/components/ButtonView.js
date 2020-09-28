import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    circle: {
        zIndex : 0,
        borderWidth: 1,
        borderColor: '#5C240F',
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 200,
        backgroundColor: '#CF0000',
        borderRadius: 100
    },
    text: {
        fontSize: 42,
        color: '#5C240F',
        fontFamily: 'TextMeOne_400Regular',
    },
});

const ButtonView = ({ text, onPressCallback}) => {
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.circle} onPress={onPressCallback}>
                {text ? <Text style={styles.text}>{text}</Text>: null}
            </TouchableOpacity>
        </View>
    );
}


export default ButtonView;