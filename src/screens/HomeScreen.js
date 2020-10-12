import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Context as AuthContext } from "../context/AuthContext";
import PlayView from "../components/PlayView";
import { promptLogout } from '../components/Alerts'

const HomeScreen = () => {
    const { state, signout } = useContext(AuthContext);


    const sendLogoutAlert = () => {
        promptLogout(signout)
    }

    return (
        <View style={styles.view}>
            <Text style={styles.header}>Hard Mode (ID: {state.userId})</Text>
            <PlayView mode="hard"/>
            <TouchableOpacity onPress={sendLogoutAlert}>
                <Text>LOGOUT</Text>
            </TouchableOpacity>
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