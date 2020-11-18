import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/pending'
import { formatDate } from '../utils';
import {showForfeitPrompt} from '../components/Alerts'

const PendingPushInfo = ({ pendingPush }) => {
    const instigatorName = pendingPush.instigator.username;
    const totalOtherUsersChallenged = pendingPush.pending.length + pendingPush.pushes.length - 2;
    const others = totalOtherUsersChallenged === 1 ? 'other' : 'others';
    const othersText = `(and ${totalOtherUsersChallenged} ${others})`
    const formatedDate = formatDate(pendingPush.created);

    return (
        <View style={styles.view}>
                <Text style={styles.name}>{instigatorName}</Text>
                <Text style={styles.challenge}>Challenged You!</Text>
                { totalOtherUsersChallenged != 0 ? <Text style={styles.others}>{othersText}</Text> : null }
                <Text style={styles.date}>{formatedDate}</Text>
        </View>
    );
}


export default PendingPushInfo;