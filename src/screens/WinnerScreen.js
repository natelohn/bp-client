import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const WinnerScreen = () => {
    return (
        <View>
            <Text style={styles.text}>You Win!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 100
    }
});

export default WinnerScreen;