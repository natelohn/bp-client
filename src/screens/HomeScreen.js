import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PlayView from "../components/PlayView";

const HomeScreen = () => {
    return (
        <View style={styles.view}>
            <Text style={styles.header}>Hard Mode</Text>
            <PlayView mode="hard"/>
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

export default HomeScreen;