import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/button'

const ButtonView = ({ displayText, onPressCallback, disabled, small }) => {
    const opacity = disabled ? 0.4 : 1;
    const buttonStyle = small ? styles.smallCircle : styles.mainCircle
    return (
        <View style={{ ...styles.view, opacity: opacity}}>
            <TouchableOpacity
                disabled={disabled}
                style={buttonStyle}
                onPress={onPressCallback}>
                <Text style={styles.text}>{displayText}</Text>
            </TouchableOpacity>
        </View>
    );
}


export default ButtonView;