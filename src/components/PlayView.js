import React, { useRef, useState, useContext } from 'react';
import { Animated, Dimensions, Text } from 'react-native';
import { useMutation } from '@apollo/client';
import {  RESPOND_TO_PUSHOFF } from '../apollo/gql'
import { navigate } from "../navigationRef";
import styles from '../styles/play'
import { BUTTON_DIAMETER, PLAYVIEW_HEADER_HEIGHT } from '../styles/global'
import { getRandomInt, formatTime } from '../utils';
import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushContext } from "../context/PushContext";
import ButtonView from '../components/ButtonView';

const SECONDS_BEFORE_START_BUFFER = 4;
const SECONDS_BETWEEN_PUSHES = 10;
const INITIAL_COUNTDOWN = SECONDS_BETWEEN_PUSHES + SECONDS_BEFORE_START_BUFFER;
const SHRINK_MS = 5000;

const PlayView = ({ playViewParams }) => {
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;
    const { state, respondToPushOff } = useContext(PushContext);
    const { pushOff } = state;
    
    const { 
        hasPendingPushes,
        pendingPushOffList,
        reviewingChallenges,
        setReviewingChallenges,
        pushing,
        setPushing,
        prePush,
        setPrePush,
        setPushOffInterval
    } = playViewParams;

    // API Calls
    const [ callRespondToPushOff ] = useMutation(RESPOND_TO_PUSHOFF);

    // UI Logic    
    const [decisecondsElapsed, setDecisecondsElapsed] = useState(0);
    const [countdownSecondsLeft, setCountdownSecondsLeft] = useState(INITIAL_COUNTDOWN);
    
    const [shrinking, setSetShrinking] = useState(false);
    const decisecondsElapsedRef = useRef(null);
    const countdownSecondsLeftRef = useRef(null);

    // Animation
    const screenSize = Dimensions.get('window');
    const screenWidth = screenSize.width;
    const screenHeight = screenSize.height;
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
    const minHeightChange = (-1 * maxHeightChange) + PLAYVIEW_HEADER_HEIGHT;
    const midWidth = 0;
    const midHeight = 0;

    const buttonX = useRef(new Animated.Value(midWidth)).current;
    const buttonY = useRef(new Animated.Value(midHeight)).current;

    // Helpers
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
    
    const getOthersText = () => {
        let totalOthers = 0;
        if (pushOff) {
            totalOthers = pushOff.pending.length + pushOff.pushes.length - 2;
        }
        const otherText = totalOthers > 1 ? 'others' : 'other'
        return  totalOthers > 0 ? `(and ${totalOthers} ${otherText})` : 'Who wants it more?'
    }

    const startPlayTimer = () => {
        decisecondsElapsedRef.current = setInterval(() => {
            setDecisecondsElapsed((i) => i + 1)
        }, 100)
    }
    const startCountdown = () => {
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

    const transitionToResults = ( score ) => {
        respondToPushOff(challengerId, pushOff.id, score, callRespondToPushOff);
    }

    const resetState = () => {
        setReviewingChallenges(false);
        setPushing(false);
        setPrePush(false);
        setPushOffInterval(1);
    }

    const endPlay = () => {
        const finalDecisecondsElapsed = decisecondsElapsed;
        moveButton(midWidth, midHeight, 500);
        growButton();
        resetState();
        setDecisecondsElapsed(0);
        setCountdownSecondsLeft(INITIAL_COUNTDOWN)
        endPushingTimers();
        transitionToResults(finalDecisecondsElapsed);
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


    const startPlay = () => {
        setPrePush(false);
        setPushing(true);
        startPlayTimer();
        moveButtonDrastically();
    }

    const press = () => {
        if (!prePush) {
            if (pushing) {
                if (shrinking) {
                    growButton();
                }
                moveButtonRandomly();
                setCountdownSecondsLeft(SECONDS_BETWEEN_PUSHES);
            } else if (!hasPendingPushes && !pushing) {
                 navigate("Create");
            } else if (hasPendingPushes && !reviewingChallenges) {
                // TODO: Make it a smoother transition
                setReviewingChallenges(true);
            } else if (!pushing) {
                setPrePush(true);
                startCountdown();
            }
        }
    }

    const buttonDisplay = () => {
        // TODO: Fix issue with Auth Flow Button Display Text
        if (pushing) {
            // TODO: Find a better place for this logic
            if (countdownSecondsLeft <= 0) {
                endPlay();
            } else if (countdownSecondsLeft * 1000 === SHRINK_MS & !shrinking) {
                shrinkButton();
            }
            return countdownSecondsLeft * 1000 <= SHRINK_MS ? countdownSecondsLeft : '';
        } else if (prePush) {
            const countingDown = SECONDS_BETWEEN_PUSHES <= countdownSecondsLeft && countdownSecondsLeft <= INITIAL_COUNTDOWN
            if (!countingDown) {
                // TODO: Find a better place for this logic
                startPlay();
            }
            const countdownSeconds = countdownSecondsLeft - SECONDS_BETWEEN_PUSHES;
            if (countdownSeconds > 3) {
                return 'GET READY...'
            } else if (countdownSeconds >= 1 && countdownSeconds <= 3) {
                return countdownSeconds
            }
            return 'PUSH!'
        } else if (!hasPendingPushes && !pushing) {
            return 'Test Your Will';
        } else if (hasPendingPushes && !reviewingChallenges) {
            return `${pendingPushOffList.length} New Push-Offs!`;
        } else if (reviewingChallenges) {
            return 'Begin'
        }
    }
    

    return (
        <>
            { pushing || prePush ? <Text style={styles.chalenger}>Push-Off with {pushOff.instigator.username} </Text> : null }
            { pushing || prePush ? <Text style={styles.others}>{getOthersText()}</Text> : null }
            { pushing ? <Text style={styles.timer}>{formatTime(decisecondsElapsed)}</Text> : null }
            <Animated.View style={[{transform: [{scale: buttonScale}, {translateX: buttonX}, {translateY: buttonY}]}]}>
                <ButtonView onPressCallback={press} displayText={buttonDisplay()} />
            </Animated.View>
        </>
    );
};

export default PlayView;