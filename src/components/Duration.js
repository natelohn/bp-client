import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { ACCENT_COLOR } from '../styles/global'
import styles from '../styles/duration';
import { formatResultTime } from '../utils';

const Duration = ({ durationInfo, width }) => {
    const durationText = formatResultTime(durationInfo.duration)
    return (
        <>
        <View style={styles.header}>
            <Text style={styles.rank}>#{durationInfo.rank}</Text>
            <Text style={styles.name}>{durationInfo.name}</Text>
            { durationInfo.isRobo ?
            <Icon 
                name='robot'
                type='font-awesome-5'
                size={16}
                color={ ACCENT_COLOR }
                containerStyle={styles.robo}
            /> : null }
            
            <Text style={styles.result}>{durationInfo.result}</Text>
        </View>
        <View style={styles.duration}>
            <View style={{...styles.bar, width}}/>
            <Text style={styles.durationText}>{durationText}</Text>
        </View>
        </>
    );
}


export default Duration;