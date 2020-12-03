import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigate } from "../navigationRef";
import { Context as PushContext } from "../context/PushContext";

import styles from '../styles/create';
const CreateScreen = () => {

    const { state } = useContext(PushContext);
    const { pushOff } = state;

    const navHome = () => {
        navigate("Home");
    }

    return (
        <View style={styles.view}>
            <Text>Results Screen Placeholder</Text>
            <TouchableOpacity onPress={navHome}><Text>Home</Text></TouchableOpacity>
        </View>
    );
};

export default CreateScreen;