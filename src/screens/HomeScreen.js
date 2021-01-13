import React, { useContext, useEffect, useReducer } from 'react';
import { View } from 'react-native';

import { useQuery } from '@apollo/client';
import { PUSHOFF_QUERY } from '../apollo/gql'

import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushOffContext } from "../context/PushOffContext";

import LaunchView from '../components/LaunchView';
import ReviewPendingView from '../components/ReviewPendingView';

import styles from '../styles/home';



const reducer = (state, { type }) => {
    switch (type) {
        case 'launch_state':
            return { ...state, launch: true, reviewing: false };
        case 'review_state':
            return { ...state, launch: false, reviewing: true };
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
    });
    const { launch, reviewing } = state;

    const { setPushOffData } = useContext(PushOffContext);

    // User's Push Data 
    const pushOffQuery = useQuery(PUSHOFF_QUERY, { variables: { challengerId }, pollInterval: MS_POLLING });

    useEffect(() => {
        if (!pushOffQuery.loading) {
            setPushOffData(pushOffQuery.data, pushOffQuery.error, challengerId);
        }
    }, [ pushOffQuery.loading ]);
    
    //Callback Functions
    const launchState = () => {
        dispatch({ type: 'launch_state' });
    }

    const reviewState = () => {
        dispatch({ type: 'review_state' });
    }

    
    return (
        <View style={ styles.view }>
        { launch ?
            <LaunchView beginReview={ reviewState }/>
        : null }
        { reviewing ?
            <ReviewPendingView endReview={ launchState }/>
        : null }
        </View>
    );
};

export default HomeScreen;