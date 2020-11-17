import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements'
import styles from '../styles/homeIcons'
import { ACCENT_COLOR } from '../styles/global'

const openMenu = () => {
    // TODO: Create an interactive menu...
    console.log('Open Menu');
}

const openLeaderboard = () => {
    // TODO: Create an interactive leaderboard screen...
    console.log('Open Leaderboard');
}

const HomeIcons = () => {
    return (
        <>
            <Icon 
                name='bars'
                type='font-awesome-5'
                size='32'
                color={ ACCENT_COLOR }
                containerStyle={styles.menuIcon}
                onPress={ openMenu } />
            <Icon 
                name='clipboard-list'
                type='font-awesome-5'
                size='32'
                color={ ACCENT_COLOR }
                containerStyle={styles.leaderboardIcon}
                onPress={ openLeaderboard } />
        </>
    );
}


export default HomeIcons;