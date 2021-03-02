import React, { useContext, useEffect, useRef } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements'
import { useMutation } from '@apollo/client';
import {  RESPOND_TO_PUSHOFF } from '../apollo/gql'
import { navigate } from '../navigationRef';
import ButtonView from './ButtonView'
import Carousel from './Carousel' 
import { showForfeitPrompt } from './Alerts'
import { Context as UserContext } from '../context/UserContext';
import { Context as PushOffContext } from '../context/PushOffContext';
import { ACCENT_COLOR } from '../styles/global'
import styles from '../styles/reviewPending'

const ReviewPendingView = ({ endViewPending }) => {
    // Context
    const userContext = useContext(UserContext);
    const { challengerId } = userContext.state;
    const { state, respondToPushOff} = useContext(PushOffContext);
    const { pendingPushOffList, pushOff } = state;
    const [ callRespondToPushOff ] = useMutation(RESPOND_TO_PUSHOFF);

    useEffect(() => {
        showCarosel();
    });

    // Animation
    const offScreenRight = Dimensions.get('window').width;
    const onScreen = 0;
    const carouselX = useRef(new Animated.Value(offScreenRight)).current;

    const showCarosel = () => {
        Animated.timing(carouselX, {
            toValue: onScreen,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const backToLaunch = () => {
        Animated.timing(carouselX, {
            toValue: offScreenRight,
            duration: 100,
            useNativeDriver: true
        }).start(({ finished }) => {
            if (finished) {
                endViewPending();
            }
        });
    }


    // Callbacks
    const forfeitCallback = () => {
        endViewPending();
        respondToPushOff(challengerId, pushOff.id, 0, callRespondToPushOff);
    }
    
    const forfeitPushOff = () => {
        const instigatorName = pushOff.instigator.username;
        const totalLosses = pushOff.pending.length + pushOff.pushes.length - 1;
        showForfeitPrompt(forfeitCallback, instigatorName, totalLosses)
    }

    const startPushOff = () => {
        endViewPending();
        navigate("Play")
    }

    return (
        <>
            <Icon 
                name='window-close'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.exit}
                onPress={ backToLaunch }
            />
            <Carousel
                items={pendingPushOffList}
                style={"pending"}
                carouselX={carouselX}
            />
            <ButtonView displayText={'Begin'} onPressCallback={startPushOff}/>
            <TouchableOpacity onPress={forfeitPushOff}>
                <Text style={styles.create}>Forfeit</Text>
            </TouchableOpacity>
        </>
    );
}

export default ReviewPendingView;