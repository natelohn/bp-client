import React, { useContext, useEffect, useReducer, useState} from 'react';
import { View } from 'react-native';

import { useQuery } from '@apollo/client';
import { CHALLENGER_DATA, PUSHOFF_QUERY } from '../apollo/gql'

import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushContext } from "../context/PushContext";

import LaunchView from '../components/LaunchView';
import ReviewPendingView from '../components/ReviewPendingView';
import PlayView from '../components/PlayView';

import styles from '../styles/home';



const reducer = (state, { type }) => {
    switch (type) {
        case 'launch_state':
            return { ...state, launch: true, reviewing: false, playing: false };
        case 'review_state':
            return { ...state, launch: false, reviewing: true, playing: false };
        case 'play_state':
            return { ...state, launch: false, reviewing: false, playing: true };
        default:
            return state;
    }
};


const MS_POLLING = 120000; // 2 minutes

const HomeScreen = ({ navigation }) => {
    // Auth Logic
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;

    // State Management
    const [state, dispatch] = useReducer(reducer, {
        launch: true,
        reviewing: false,
        playing: false,
    });
    const { launch, reviewing, playing } = state;
        
    // User's Push Data 
    const pushOffQuery = useQuery(PUSHOFF_QUERY, { variables: { challengerId }, pollInterval: MS_POLLING });

    // Other Challenger Data
    const challengerQuery = useQuery(CHALLENGER_DATA, { variables: { challengerId }, pollInterval: MS_POLLING });

    const { setPushOffData, setChallengerData } = useContext(PushContext);

    useEffect(() => {
        if (!pushOffQuery.loading) {
            setPushOffData(pushOffQuery.data, pushOffQuery.error, challengerId);
        }
        if (!challengerQuery.loading) {
            setChallengerData(challengerQuery.data, challengerQuery.error, challengerId);
        }
    }, [ pushOffQuery.loading, challengerQuery.loading ]);

    useEffect(() => {
        const id = navigation.getParam('id');
        if (id) {
            const unsubscribe = navigation.addListener('didFocus', () => {
                dispatch({ type: 'play_state' });
            });
            return unsubscribe.remove;
        } else {
            const unsubscribe = navigation.addListener('didFocus', () => {
                dispatch({ type: 'launch_state' });
            });
            return unsubscribe.remove;
        }
    }, [ navigation ]);


    
    //Callback Functions
    const launchState = () => {
        dispatch({ type: 'launch_state' });
    }

    const reviewState = () => {
        dispatch({ type: 'review_state' });
    }

    const playState = () => {
        dispatch({ type: 'play_state' });
    }
    
    return (
        <View style={ styles.view } >
        { launch ?
            <LaunchView beginReview={ reviewState }/>
        : null }
        { reviewing ?
            <ReviewPendingView endReview={ launchState } beginPlay={ playState }/>
        : null }
        { playing ? 
            <PlayView endPlay={ launchState }/> 
        : null }
        </View>
    );
};

export default HomeScreen;