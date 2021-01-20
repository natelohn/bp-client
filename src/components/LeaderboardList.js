import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Context as AuthContex } from '../context/AuthContext';
import { ACCENT_COLOR } from '../styles/global';
import styles from '../styles/leaderboard';
import { addOrdinalSuffix, getDisplayUsername, isRoboId } from '../utils';

const Leaderboard = ({ leaderboard }) => {
    const { title, list, formatCallback } = leaderboard;
    
    // Get the user's stat for this list
    const { state } = useContext(AuthContex);
    const { challengerId } = state
    let myRank = 0;
    for(let entry of list){
        const { challenger } = entry;
        myRank = myRank + 1;
        if (challenger.id === challengerId){
            break;
        }
    }
    const myEntry = list[myRank - 1];
    const myRankText = `${addOrdinalSuffix(myRank)} of ${list.length}`
    const myStatText = formatCallback(myEntry.stat);

    return (
        <View style={styles.caroselView}>
            <View style={styles.view}>
                <Text style={styles.title}>{title}</Text>
                <View style={styles.myEntry}>
                    <Text style={styles.myName}>My Rank</Text>
                    <View style={styles.myResults}>
                        <Text style={styles.resultText}>{myRankText}</Text>
                        <Text style={styles.resultText}>{myStatText}</Text>
                    </View>
                </View>
                <View style={styles.leaderboard}>
                    <FlatList 
                        data={list}
                        keyExtractor={item => item.challenger.id}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                            const rankText = addOrdinalSuffix(index + 1);
                            const usernameText = getDisplayUsername(item.challenger.username);
                            const isRobo = isRoboId(item.challenger.id)
                            const formattedStat = formatCallback(item.stat)
                            return (
                                <View style={styles.leaderboardEntry}>
                                    <Text style={styles.entryRank}>{rankText}</Text>
                                    <View style={styles.entryNameView}>
                                        <Text style={styles.entryName}>{usernameText}</Text>
                                        { isRobo ?
                                        <Icon
                                            containerStyle={styles.roboIcon}
                                            name='robot'
                                            type='font-awesome-5'
                                            size={10}
                                            color={ ACCENT_COLOR }
                                        />
                                        : null}
                                    </View>
                                    <Text style={styles.entryStat}>{formattedStat}</Text>
                                </View>
                            );
                        }}
                    />
                </View>
            </View>
        </View>
    );
}


export default Leaderboard;