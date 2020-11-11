import React, { useRef, useState, useContext } from 'react';
import { Animated, Dimensions, Text, View, Button } from 'react-native';

import styles from '../styles/home'
import { BUTTON_DIAMETER, PLAY_HEADER_HEIGHT, SECONDARY_COLOR, PRIMARY_COLOR } from '../styles/global'
import { getRandomInt, formatTime } from '../utils';

import ButtonView from '../components/ButtonView';
import { Context as AuthContext } from "../context/AuthContext";


const SECONDS_BETWEEN_PUSHES = 8;

const HomeScreen = () => {
    const [pushing, setPushing] = useState(false);
    const [decisecondsElapsed, setDecisecondsElapsed] = useState(0);
    const [countdownSecondsLeft, setCountdownSecondsLeft] = useState(SECONDS_BETWEEN_PUSHES);
    const decisecondsElapsedRef = useRef(null);
    const countdownSecondsLeftRef = useRef(null);
    const { state, signout } = useContext(AuthContext);
    const { userId, challengerId } = state;

    // API Hooks
    // const { loading, error, data } = useQuery(USER_ID_QUERY);

    // Animation
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const buttonRadius = BUTTON_DIAMETER / 2;
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
        setPushing(false);
        // TODO: send results
        setDecisecondsElapsed(0);
        setCountdownSecondsLeft(SECONDS_BETWEEN_PUSHES)
        endPushingTimers();
    }

    const getBackgroundColor = () => {
        if (pushing && countdownSecondsLeft <=3) {
            return (decisecondsElapsed % 8) === 0 ? PRIMARY_COLOR : SECONDARY_COLOR;
        }
        return SECONDARY_COLOR;
    }

    
    const buttonDisplay = () => {
        if (pushing && countdownSecondsLeft <= 0) {
            endPushing()
        } else if (pushing)  {
            return countdownSecondsLeft > 3 ? '' : countdownSecondsLeft
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
            moveButtonRandomly()
            setCountdownSecondsLeft(SECONDS_BETWEEN_PUSHES)
        }
    }

    return (
        <View style={{...styles.view, backgroundColor: getBackgroundColor()}} >
            { pushing ? <Text style={styles.timer}>{formatTime(decisecondsElapsed)}</Text> : null }
            { pushing ? <Text style={styles.chalenger}>Challenging: </Text> : null }
            <Animated.View style={[{transform: [{translateX: buttonX}, {translateY: buttonY}]}]}>
                <ButtonView onPressCallback={press} text={buttonDisplay()} />
            </Animated.View>
            <Button onPress={signout} title="LOGOUT"/>
        </View>
        
    );
};

export default HomeScreen;