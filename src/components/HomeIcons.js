import React from 'react';
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



const HomeIcons = ({ reviewingChallenges, setReviewingChallenges }) => {

    const endReview = () => {
        // TODO: Make it a smoother transition
        setReviewingChallenges(false);
    }

    return (
        <>
            { reviewingChallenges ?
            <Icon 
                name='window-close'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.menuIcon}
                onPress={ endReview }
            />
            : null }
            { !reviewingChallenges ?
            <Icon 
                name='bars'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.menuIcon}
                onPress={ openMenu }
            />
            : null }
            { !reviewingChallenges ?
            <Icon 
                name='clipboard-list'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.leaderboardIcon}
                onPress={ openLeaderboard }
            />
            : null }
        </>
    );
}


export default HomeIcons;