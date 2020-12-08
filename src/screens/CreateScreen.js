import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { navigate } from "../navigationRef";

import styles from '../styles/create';
const CreateScreen = () => {

    const navHome = () => {
        navigate("Home");
    }
    return (
        <View style={styles.view}>
            <Text>Create Screen Placeholder</Text>
            <TouchableOpacity onPress={navHome}><Text>Back</Text></TouchableOpacity>
        </View>
    );
};

export default CreateScreen;