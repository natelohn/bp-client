import React, { useEffect, useState, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import ChallengerIcon from './ChallengerIcon';
import { ACCENT_COLOR, PRIMARY_COLOR } from '../styles/global'
import styles from '../styles/duration';
import { formatResultTime, isRoboId } from '../utils';

const Duration = ({ result, rank, windthMultiplier, longestDuration, challengerCount, isPending }) => {
    const { challenger, duration } = result;
    const width = !isPending ? (duration / longestDuration) * windthMultiplier : 0;
    const [durationDisplay, setDurationDisplay] = useState('0:00');
    const [timeIndicatorElapsed, setTimeIndicatorElapsed] = useState(1);

    //Animation
    const longestAnimationTime = 1000 * challengerCount;
    const barAnimationDuration = (duration / longestDuration) * longestAnimationTime;
    const currentWidth = useRef(new Animated.Value(0)).current;
    const [animationInitiated, setAnimationInitiated] = useState(false);

    const animateBar = () => {
        Animated.timing(currentWidth, {
            toValue: width,
            duration: barAnimationDuration,
            useNativeDriver: true
        }).start();
    }

    useEffect(()=>{
        if (!animationInitiated) {
            animateBar();
            setAnimationInitiated(true);
        }
        
        let interval = setInterval(() => {
            if (timeIndicatorElapsed < duration) {
                setTimeIndicatorElapsed(Math.ceil(timeIndicatorElapsed * 1.04));
                setDurationDisplay(formatResultTime(timeIndicatorElapsed));
            } else {
                setDurationDisplay(formatResultTime(duration));
                clearInterval(interval);
            }
        }, 1);
        return () => {
            clearInterval(interval);
        };
    });
    return (
            <>
            <View style={styles.header}>
            { !isPending ? <Text style={styles.rank}>#{rank}</Text> : null }
            <Text style={styles.name}>{challenger.username}</Text>
            <ChallengerIcon challengerId={challenger.id}/>
            </View>
            { !isPending ?
            <View style={styles.duration}>
                <Animated.View style={[styles.durationTextView, {transform: [{translateX: currentWidth}]}]}>
                    <Text style={styles.durationText}>{durationDisplay}</Text>
                </Animated.View>
                <View style={styles.bar}/>
            </View>
            :
            <Text style={styles.name}>Awaiting Completion</Text>
            }
            </>
        );
}
export default Duration;