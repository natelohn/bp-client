import { StyleSheet } from 'react-native';

import { MAIN_FONT_STYLE, ACCENT_COLOR } from './global';

const text = {
    textAlign: 'center',
    fontFamily: MAIN_FONT_STYLE,
    color: ACCENT_COLOR,
}

const shaddowText = {
    textShadowColor: ACCENT_COLOR,
    textShadowOffset: {width: -0.5, height: 0.5},
    textShadowRadius: 10,
}

const styles = StyleSheet.create({
    caroselView: {
        flexBasis: '100%',
        flex: 1,
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: "center"
    },
    view: {
        alignItems: 'center',
        width: '100%'
    },
    title: {
        ...text,
        fontSize: 36,
        textDecorationLine: 'underline'
    },
    myEntry: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    myName: {
        ...text,
        alignSelf: 'center',
        fontSize: 24,
        paddingRight: 5
    },
    myResults: {
        borderLeftWidth: 1,
        borderColor: ACCENT_COLOR,
        paddingLeft: 5
    },
    resultText: {
        ...text,
        fontSize: 16
    },
    leaderboard: {
        height: '82%',
        width: '95%'
    },
    leaderboardEntry: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: ACCENT_COLOR,
        marginTop: 5
    },
    entryRank: {
        ...text,
        fontSize: 18,
        width: 55
    },
    entryNameView: {
        flex: 1,
        flexDirection: 'row'
    },
    entryName: {
        ...text,
        fontSize: 18,
        textAlign: 'left'
    },
    roboIcon: {
        marginLeft: 2
    },
    entryStat: {
        ...text,
        fontSize: 18
    },
});

export default styles;