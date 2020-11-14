import React, { useRef, useState } from 'react';
import { Animated, Dimensions, Text } from 'react-native';

import styles from '../styles/play'
import { BUTTON_DIAMETER, PLAY_HEADER_HEIGHT } from '../styles/global'
import { getRandomInt, formatTime } from '../utils';

import ButtonView from '../components/ButtonView';

const SECONDS_BETWEEN_PUSHES = 10;
const SHRINK_MS = 5000;

const PlayView = () => {

    // UI Logic
    const [pushing, setPushing] = useState(false);
    const [shrinking, setSetShrinking] = useState(false);
    const [decisecondsElapsed, setDecisecondsElapsed] = useState(0);
    const [countdownSecondsLeft, setCountdownSecondsLeft] = useState(SECONDS_BETWEEN_PUSHES);
    const decisecondsElapsedRef = useRef(null);
    const countdownSecondsLeftRef = useRef(null);

    // Animation
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const buttonRadius = BUTTON_DIAMETER / 2;

    // Button Scale - Animation
    const buttonAnimation = useRef(new Animated.Value(0)).current;
    const inputRange = [0, 1];
    const outputRange = [1, 0.2];
    const buttonScale = buttonAnimation.interpolate({inputRange, outputRange});

    // Will need to be recalculated once button is styled on screen
    const maxWidthChange = (screenWidth / 2) - buttonRadius;
    const minWidthChange = -1 * maxWidthChange;
    const maxHeightChange = (screenHeight / 2) - buttonRadius;
    const minHeightChange = (-1 * maxHeightChange) + PLAY_HEADER_HEIGHT;
    const midWidth = 0;
    const midHeight = 0;

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

    const endPushing = () => {
        moveButton(midWidth, midHeight, 500);
        growButton();
        setPushing(false);
        // TODO: send results
        setDecisecondsElapsed(0);
        setCountdownSecondsLeft(SECONDS_BETWEEN_PUSHES)
        endPushingTimers();
    }

    const shrinkButton = () => {
        setSetShrinking(true);
        Animated.timing(buttonAnimation, {
            toValue: 1,
            duration: SHRINK_MS,
            useNativeDriver: true,
          }).start();
    }

    const growButton = () => {
        setSetShrinking(false);
        Animated.spring(buttonAnimation, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
    }
    
    const buttonDisplay = () => {
        if (pushing) {
            if (countdownSecondsLeft <= 0) {
                endPushing();
            } else if (countdownSecondsLeft * 1000 === SHRINK_MS & !shrinking) {
                shrinkButton();
            }
            return countdownSecondsLeft * 1000 <= SHRINK_MS ? countdownSecondsLeft : ''
        }
        return 'Begin'
    }
    

    const moveButtonRandomly = () => {
        const newX = getRandomInt(minWidthChange,  maxWidthChange);
        const newY = getRandomInt(minHeightChange,  maxHeightChange);
        moveButton(newX, newY, 500);
    }

    const press = () => {
        if (!pushing) {
            setPushing(true);
            startPushingTimers();
            moveButtonRandomly()
        } else {
            if (shrinking) {
                growButton();
            }
            moveButtonRandomly();
            setCountdownSecondsLeft(SECONDS_BETWEEN_PUSHES)
        }
    }

    return (
        <>
            { pushing ? <Text style={styles.timer}>{formatTime(decisecondsElapsed)}</Text> : null }
            { pushing ? <Text style={styles.chalenger}>Challenging: </Text> : null }
            <Animated.View style={[{transform: [{scale: buttonScale}, {translateX: buttonX}, {translateY: buttonY}]}]}>
                <ButtonView onPressCallback={press} text={buttonDisplay()} />
            </Animated.View>
        </>
    );
};

export default PlayView;