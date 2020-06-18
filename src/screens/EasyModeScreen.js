import React, { useReducer } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PlayView from "../components/PlayView";

const EasyModeScreen = () => {
    return (
        <View style={styles.view}>
            <Text style={styles.header}>Easy Mode</Text>
            <PlayView mode={"easy"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'center'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 26,
        marginTop: 20
    }
});

export default EasyModeScreen;