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
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        width: 200,
        borderRadius: 100,
        backgroundColor: '#CF0000',
        borderColor: '#5C240F'
    },
    text: {
        fontSize: 42,
        fontFamily: 'TextMeOne_400Regular',
        color: '#5C240F'
    },
});

const ButtonView = ({ text, onPressCallback, disabled}) => {
    const enabledColors = { backgroundColor: '#CF0000', color: '#5C240F', borderColor: '#5C240F' };
    const opacity = disabled ? 0.4: 1;
    return (
        <View style={{ ...styles.view, opacity: opacity}}>
            <TouchableOpacity disabled={disabled} style={styles.circle} onPress={onPressCallback}>
                {text ? <Text style={styles.text}>{text}</Text>: null}
            </TouchableOpacity>
        </View>
    );
}


export default ButtonView;