import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/button'

const ButtonView = ({ displayText, onPressCallback, disabled}) => {
    const opacity = disabled ? 0.4: 1;
    return (
        <View style={{ ...styles.view, opacity: opacity}}>
            <TouchableOpacity disabled={disabled} style={styles.circle} onPress={onPressCallback}>
                <Text style={styles.text}>{displayText}</Text>
            </TouchableOpacity>
        </View>
    );
}


export default ButtonView;