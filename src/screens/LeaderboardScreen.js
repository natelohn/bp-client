import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import { navigate } from "../navigationRef";
import styles from '../styles/leaderboard';
import { ACCENT_COLOR } from '../styles/global';

const LeaderboardScreen = () => {
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
            <Text>LeaderboardScreen</Text>
        </View>
    );
};

export default LeaderboardScreen;