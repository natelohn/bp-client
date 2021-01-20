import { StyleSheet } from 'react-native';

// TODO: Figure out a way to programatically find these values
const TOP_OFFSET = 40;
const SIDE_OFFSET = 20;

const styles = StyleSheet.create({
    menuIcon: {
        position: 'absolute',
        top: TOP_OFFSET,
        left: SIDE_OFFSET
    },
    leaderboardIcon: {
        position: 'absolute',
        top: TOP_OFFSET,
        right: SIDE_OFFSET
    }
});

export default styles;