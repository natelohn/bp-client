import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Text } from 'react-native';
import { useMutation } from '@apollo/client';
import {  RESPOND_TO_PUSHOFF } from '../apollo/gql'
import { navigate } from "../navigationRef";
import styles from '../styles/play'
import { MAIN_BUTTON_DIAMETER, PLAYVIEW_HEADER_HEIGHT, PLAY_BUTTON_TOP_MARGIN } from '../styles/global'
import { getRandomInt, formatTime } from '../utils';
import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushContext } from "../context/PushContext";
import ButtonView from '../components/ButtonView';

const DECISECONDS_BEFORE_START_BUFFER = 50; // 4 seconds
const DECISECONDS_BETWEEN_PUSHES = 100; // 10 seconds
const SHRINK_MS = 5000;
const PRE_PUSH_TEXT = 'Ready?'

const PlayView = () => {
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;
    const [ callRespondToPushOff ] = useMutation(RESPOND_TO_PUSHOFF);
    const { state, respondToPushOff } = useContext(PushContext);
    const { pushOff } = state;

    // State  
    const [ decisecondsElapsed, setDecisecondsElapsed ] = useState(0);
    const [ pushTimeElapsed, setPushTimeElapsed ] = useState(0);
    const [ decisecondPushedLast, setDecisecondPushedLast ] = useState(0);
    const [ shrinking, setSetShrinking ] = useState(false);
    const [ buttonDisplay, setButtonDisplay ] = useState(PRE_PUSH_TEXT);
    const [ pushFinalized, setPushFinalized ] = useState(false);
    const [ pushCount, setPushCount ] = useState(0);

    useEffect(()=>{
        if (!pushFinalized) {
            let interval = setInterval(() => {
                handleStartCountdown();
                handlePushTermination();
                setDecisecondsElapsed((i) => i + 1);
            }, 100);
            return () => {
                clearInterval(interval);
            }; 
        }
    });

    const handleStartCountdown = () => {
        if (decisecondsElapsed > DECISECONDS_BEFORE_START_BUFFER) {
            // Countdown has finished
            setPushTimeElapsed((i) => i + 1);
            if (pushTimeElapsed >= 20 && pushCount === 0) {
                setButtonDisplay('PUSH ME!');
            }
        } else {
            // Countdown to start
            const decisecondsToStart = DECISECONDS_BEFORE_START_BUFFER - decisecondsElapsed;
            const secondsToStart = Math.ceil(decisecondsToStart / 10);
            if (secondsToStart >= 2 && secondsToStart < 5) {
                setButtonDisplay(secondsToStart - 1)    
            } else if (secondsToStart <= 1) {
                setButtonDisplay('BEGIN!');
                moveButtonDrastically();
            } else {
                setButtonDisplay(PRE_PUSH_TEXT);
            }
        }
    };

    const handlePushTermination = () => {
        const decisecondsSincePush = pushTimeElapsed - decisecondPushedLast;
        const decisecondsUntilTermination = DECISECONDS_BETWEEN_PUSHES - decisecondsSincePush;
        const secondsToTermination = Math.ceil(decisecondsUntilTermination / 10);
        if (secondsToTermination <= 0 && !pushFinalized) {
            setPushFinalized(true);
            respondToPushOff(challengerId, pushOff.id, pushTimeElapsed, callRespondToPushOff);
        } else if ( secondsToTermination <= 5 ) {
            shrinkButton();
            setButtonDisplay(secondsToTermination);
        }
    }

    // Animation
    const screenSize = Dimensions.get('window');
    const screenWidth = screenSize.width;
    const screenHeight = screenSize.height;
    const buttonRadius = MAIN_BUTTON_DIAMETER / 2;
    const maxWidthChange = (screenWidth / 2) - buttonRadius;
    const minWidthChange = -1 * maxWidthChange;
    const maxHeightChange = (screenHeight / 2) - buttonRadius - (PLAY_BUTTON_TOP_MARGIN / 2);
    const minHeightChange = (-1 * maxHeightChange) + PLAYVIEW_HEADER_HEIGHT - PLAY_BUTTON_TOP_MARGIN;
    const midWidth = 0;
    const midHeight = 0;
    const buttonX = useRef(new Animated.Value(midWidth)).current;
    const buttonY = useRef(new Animated.Value(midHeight)).current;

    // Button Scale - Animation
    const buttonAnimation = useRef(new Animated.Value(0)).current;
    const inputRange = [0, 1];
    const outputRange = [1, 0.2];
    const buttonScale = buttonAnimation.interpolate({inputRange, outputRange});

    // Animation Helpers
    const shrinkButton = () => {
        if (!shrinking) {
            Animated.timing(buttonAnimation, {
                toValue: 1,
                duration: SHRINK_MS,
                useNativeDriver: true,
            }).start();
        }
        setSetShrinking(true);
    }

    const growButton = () => {
        if (shrinking) {
            Animated.spring(buttonAnimation, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
        }
        setSetShrinking(false);
    }

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

    const moveButtonRandomly = () => {
        const newX = getRandomInt(minWidthChange,  maxWidthChange);
        const newY = getRandomInt(minHeightChange,  maxHeightChange);
        moveButton(newX, newY, 500);
    }

    const moveButtonDrastically = () => {
        const directions = [
            [minWidthChange, minHeightChange],
            [minWidthChange, maxHeightChange],
            [maxWidthChange, minHeightChange],
            [maxWidthChange, maxHeightChange]
        ]
        const direction = directions[getRandomInt(0, directions.length - 1)];
        const offset = getRandomInt(0, 20);
        const newX = direction[0] > 0 ? direction[0] - offset: direction[0] + offset;
        const newY = direction[1] > 0 ? direction[1] - offset: direction[1] + offset;
        moveButton(newX, newY, 500);
    }

    // TODO: Ensure timer ends when app is quit/on component unmount

    const updateButtonDisplay = () => {
        // TODO: Add user's name to the initial messages list
        const initialButtonMessages = ['That\'s It!', 'Push Me!', 'Again!', 'AGAIN!!', 'Oh Yeah!', 'Just...', 'Keep...', 'Pushing!!'];
        // TODO: Only show this for newer users
        if (pushCount <= initialButtonMessages.length) {
            setButtonDisplay(initialButtonMessages[pushCount]);
        } else if (pushCount % 100 === 0) {
            setButtonDisplay(`${pushCount} PUSHES!`);
        } else {
            setButtonDisplay('');
        }
    }

    const press = () => {
        if (pushTimeElapsed === 0) {
            // skip countdown
            setDecisecondsElapsed(decisecondsElapsed + DECISECONDS_BEFORE_START_BUFFER);
            setButtonDisplay('');
        } else {
            updateButtonDisplay();
        }
        setDecisecondPushedLast(pushTimeElapsed);
        growButton();
        moveButtonRandomly();
        setPushCount(pushCount + 1);
    }
    
    const getOthersText = () => {
        const totalOthers = pushOff.pending.length + pushOff.pushes.length - 2;
        const otherText = totalOthers > 1 ? 'others' : 'other'
        // TODO: Extend functionality to allow for push off creation
        return  totalOthers > 0 ? `(and ${totalOthers} ${otherText})` : 'Who wants it more?'
    }

    return (
        <>
            <Text style={styles.chalenger}>Push-Off with {pushOff.instigator.username} </Text>
            <Text style={styles.others}>{getOthersText()}</Text>
            <Text style={styles.timer}>{formatTime(pushTimeElapsed)}</Text>
            <Animated.View style={[{ ...styles.buttonView, transform: [{ scale: buttonScale }, { translateX: buttonX }, { translateY: buttonY }]}]}>
                <ButtonView onPressCallback={press} displayText={buttonDisplay} small={false} />
            </Animated.View>
        </>
    );
};

export default PlayView;