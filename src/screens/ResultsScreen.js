import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { navigate } from "../navigationRef";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushContext } from "../context/PushContext";
import styles from '../styles/results';
import { ACCENT_COLOR } from '../styles/global'
import { calculateRecord } from '../utils';

const ResultsScreen = ({ navigation }) => {
    // Context
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;
    const { state } = useContext(PushContext);
    // const id = navigation.getParam('id');
    const id = 'abfc0666-c8f1-43de-b2d0-5761637ede24';
    const pushOff = state.allPushOffs[id];
    const { wins, losses } = calculateRecord(pushOff, challengerId);

    const navHome = () => {
        navigate("Home");
    }

    return (
        <View style={styles.view}>
            <Icon 
                name='chevron-left'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.backIcon}
                onPress={ navHome }
            />
            <View style={styles.record}>
                <Text>Won: {wins}</Text>
                <Text>Lost: {losses}</Text>
            </View>
        </View>
    );
};

export default ResultsScreen;