import React, { useEffect, useState, useRef } from 'react';
import { Animated, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { ACCENT_COLOR } from '../styles/global'
import styles from '../styles/duration';
import { formatResultTime } from '../utils';


const Duration = ({ durationInfo }) => {
    const { rank, name, isRobo, result, width, duration, longestDuration } = durationInfo;
    const [durationDisplay, setDurationDisplay] = useState('0:000');
    const [timeIndicatorElapsed, setTimeIndicatorElapsed] = useState(1);

    //Animation
    const longestAnimationTime = 3000;
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
            <Text style={styles.rank}>#{rank}</Text>
            <Text style={styles.name}>{name}</Text>
            { isRobo ?
            <Icon 
                name='robot'
                type='font-awesome-5'
                size={16}
                color={ ACCENT_COLOR }
                containerStyle={styles.robo}
            /> : null }
            
            <Text style={styles.result}>{result}</Text>
        </View>
        <View style={styles.duration}>
            <Animated.View style={[styles.durationTextView, {transform: [{translateX: currentWidth}]}]}>
                <Text style={styles.durationText}>{durationDisplay}</Text>
            </Animated.View>
            <View style={styles.bar}/>
        </View>
        </>
    );
}


export default Duration;