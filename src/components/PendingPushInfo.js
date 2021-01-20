import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/pending'
import { formatDate, getDisplayUsername } from '../utils';

const PendingPushInfo = ({ pendingPush }) => {
    const instigatorName = getDisplayUsername(pendingPush.instigator.username);
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