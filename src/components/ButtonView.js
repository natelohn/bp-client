import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ButtonView = ({ text }) => {
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.circle}>
                {text ? <Text style={styles.text}>{text}</Text>: null}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        borderWidth: 1,
        borderColor:'#5C240F',
        alignItems:'center',
        justifyContent:'center',
        width:200,
        height:200,
        backgroundColor:'#CF0000',
        borderRadius:100,
    },
    text: {
        fontSize: 36,
        color: '#5C240F',
        fontFamily: 'TextMeOne_400Regular',
    },
});

export default ButtonView;