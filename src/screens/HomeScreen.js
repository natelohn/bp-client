import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Text, View } from 'react-native';

import styles from '../styles/home'
import { getRandomInt, formatTime } from '../utils';

import ButtonView from '../components/ButtonView';



const SECONDS_BETWEEN_PUSHES = 8;

const HomeScreen = () => {
    const [pushing, setPushing] = useState(false)
    const [decisecondsElapsed, setDecisecondsElapsed] = useState(0)
    const [countdownSecondsLeft, setCountdownSecondsLeft] = useState(SECONDS_BETWEEN_PUSHES)
    const decisecondsElapsedRef = useRef(null)
    const countdownSecondsLeftRef = useRef(null)

    // Animation
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const buttonDiameter = 200;
    const buttonRadius = buttonDiameter / 2;
    // Will need to be recalculated once button is styled on screen
    const maxWidthChange = (screenWidth / 2) - buttonRadius;
    const minWidthChange = -1 * maxWidthChange;
    const maxHeightChange = screenHeight - buttonDiameter;
    const minHeightChange = 0;
    const midWidth = 0;
    const midHeight = maxHeightChange / 2

    const buttonX = useRef(new Animated.Value(midWidth)).current;
    const buttonY = useRef(new Animated.Value(midHeight)).current;

    const moveButton = (x, y, duration) => {
        Animated.timing(buttonX, {
            toValue: x,
            duration,
            useNativeDriver: true
        }).start();
        Animated.timing(buttonY, {
            toValue: y,
            duration,
            useNativeDriver: true
        }).start();
    }

    // Helpers
    const startPushingTimers = () => {
        console.log('Here', decisecondsElapsed, countdownSecondsLeft)
        decisecondsElapsedRef.current = setInterval(() => {
            setDecisecondsElapsed((i) => i + 1)
        }, 100)
        countdownSecondsLeftRef.current = setInterval(() => {
            setCountdownSecondsLeft((i) => i - 1)
        }, 1000)
    }

    const endPushingTimers = () => {
        clearInterval(decisecondsElapsedRef.current)
        clearInterval(countdownSecondsLeftRef.current)
        // Send/store time pushed
    }

    // TODO: Ensure timer ends when app is quit/on component unmount

    const startPushing = () => {
        setPushing(true);
        startPushingTimers();
    }

    const endPushing = () => {
        moveButton(midWidth, midHeight, 250);
        setPushing(false);
        endPushingTimers();
    }
    
    const buttonDisplay = () => {
        if (pushing && countdownSecondsLeft <= 0) {
            endPushing()
        } else if (pushing)  {
            return countdownSecondsLeft > 3 ? '' : countdownSecondsLeft;
        }
        return 'Begin'
        
    }

    const press = () => {
        if (!pushing) {
            startPushing()
        } else {
            const newX = getRandomInt(minWidthChange,  maxWidthChange);
            const newY = getRandomInt(minHeightChange,  maxHeightChange);
            moveButton(newX, newY, 500)
            setCountdownSecondsLeft(SECONDS_BETWEEN_PUSHES)
        }
    }


    return (
        <View style={styles.view} >
            <Animated.View style={[{transform: [{translateX: buttonX}, {translateY: buttonY}]}]}>
                <ButtonView onPressCallback={press} text={buttonDisplay()} />
            </Animated.View>
            <Text style={styles.timer}>{formatTime(decisecondsElapsed)}</Text>
        </View>
        
    );
};``

export default HomeScreen;