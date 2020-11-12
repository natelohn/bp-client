import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/pending'

const PendingListView = () => {
    return (
        <View style={styles.view}>
            <Text style={styles.name}>POOPFACE</Text>
            <Text>Challenged You!</Text>
            <Text>and 5 others</Text>
            <Text>5:02pm, Dec 24th, 2019</Text>
        </View>

    );
}


export default PendingListView;