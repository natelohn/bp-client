import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';

import Carousel from '../components/Carousel';
import { formatResultTime } from '../utils';
import { navigate } from "../navigationRef";
import styles from '../styles/leaderboardScreen';
import { ACCENT_COLOR, PRIMARY_COLOR, SECONDARY_COLOR } from '../styles/global';

const LeaderboardScreen = ({ navigation }) => {
    const {
        longestPushFriends,
        longestPushGlobal,
        longestPushTotalFriends,
        longestPushTotalGlobal,
        mostWinsFriends,
        mostWinsGlobal
    } = navigation.getParam('leaderboardData', {});

    const winsFormat = (i) =>  {
        return `${i} Wins`
    }
    const titles = ["Longest Push", "Most Wins", "Most Time Pushing"];
    const friendsList = [
        { title: titles[0], list: longestPushFriends, formatCallback: formatResultTime },
        { title: titles[1], list: mostWinsFriends, formatCallback: winsFormat },
        { title: titles[2], list: longestPushTotalFriends, formatCallback: formatResultTime }
    ];
    const globalList = [
        { title: titles[0], list: longestPushGlobal, formatCallback: formatResultTime },
        { title: titles[1], list: mostWinsGlobal, formatCallback: winsFormat },
        { title: titles[2], list: longestPushTotalGlobal, formatCallback: formatResultTime }
    ];

    const [ globalView, setGlobalView ] = useState(false);
    const friendsView = !globalView;
    
    const globalIconColor = globalView ? PRIMARY_COLOR : ACCENT_COLOR;
    const friendsIconColor = friendsView ? PRIMARY_COLOR : ACCENT_COLOR;

    const displayList = globalView ? globalList : friendsList;

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
            <View style={styles.header}>
                <Icon
                    name='users'
                    type='font-awesome-5'
                    size={32}
                    color={ friendsIconColor }
                    disabled={friendsView}
                    disabledStyle={{ backgroundColor: SECONDARY_COLOR }}
                    onPress={ () => { setGlobalView(false) } }
                />
                <Text style={styles.title}>Leaderboard</Text>
                <Icon
                    name='globe-americas'
                    type='font-awesome-5'
                    size={32}
                    color={ globalIconColor }
                    disabled={globalView}
                    disabledStyle={{ backgroundColor: SECONDARY_COLOR }}
                    onPress={ () => { setGlobalView(true) } }
                />
            </View>
            <View style={styles.main}>
                <Carousel
                    items={displayList}
                    style={"leaderboard"}
                    carouselX={0}
                />
            </View>
        </View> 
    );
};

export default LeaderboardScreen;