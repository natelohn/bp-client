import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { navigate } from "../navigationRef";
import styles from '../styles/history';
import { ACCENT_COLOR } from '../styles/global';

const HistoryScreen = () => {
    return (
        <View style={styles.view}>
            <Icon 
                name='chevron-left'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.back}
                onPress={ () => { navigate("Home") } }
            />
            <Text>HistoryScreen</Text>
        </View>
    );
};

export default HistoryScreen;