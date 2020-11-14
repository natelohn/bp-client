import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/pending'
import { formatDate } from '../utils';

const PendingPushInfo = ({ pendingPush }) => {
    const totalUsersChallenged = pendingPush.pending.length + pendingPush.pushes.length - 2;
    const others = totalUsersChallenged === 1 ? 'other' : 'others';
    const othersText = `(and ${totalUsersChallenged} ${others})`
    const formatedDate = formatDate(pendingPush.created);

    return (
        <View style={styles.view}>
            <Text style={styles.name}>{pendingPush.instigator.username}</Text>
            <Text style={styles.challenge}>Challenged You!</Text>
            { totalUsersChallenged != 0 ? <Text style={styles.others}>{othersText}</Text> : null }
            <Text style={styles.date}>{formatedDate}</Text>
        </View>
    );
}


export default PendingPushInfo;