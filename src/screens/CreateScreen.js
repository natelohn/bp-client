import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
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