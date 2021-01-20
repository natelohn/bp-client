import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from '../styles/button'

const ButtonView = ({ displayText, onPressCallback, disabled, small, textOpacity }) => {
    const opacity = disabled ? 0.4 : 1;
    const buttonStyle = small ? styles.smallCircle : styles.mainCircle
    const textStyle = small ? styles.smallText : styles.text
    return (
        <View style={{ ...styles.view, opacity: opacity}}>
            <TouchableOpacity
                disabled={disabled}
                style={buttonStyle}
                onPress={onPressCallback}
            >
                {textOpacity != null ?
                <Text style={{...textStyle, opacity: textOpacity}}>{displayText}</Text>
                :
                <Text style={textStyle}>{displayText}</Text>
                }
            </TouchableOpacity>
        </View>
    );
}


export default ButtonView;