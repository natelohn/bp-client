import React, { useContext, useEffect } from 'react';

import { useQuery } from '@apollo/client';
import { PUSHOFFS_QUERY } from '../apollo/gql'

import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushContext } from "../context/PushContext";
import PlayView from '../components/PlayView';
import PendingListView from '../components/PendingListView';


const MS_POLLING_FOR_NEW_PUSHOFFS = 600000; // 10 minutes

const HomeScreen = () => {
    // Auth Logic
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;

    // User's Push Data 
    const { loading, error, data } = useQuery(PUSHOFFS_QUERY, { variables: { challengerId }, pollInterval: MS_POLLING_FOR_NEW_PUSHOFFS });
    const { state, setPushData } = useContext(PushContext);
    const { pushesPending } = state;

    useEffect(() => {
        if (!loading) {
            setPushData(data, error, challengerId);
        }
    }, [loading]);

    return (
        <>
            <PendingListView/>
            <PlayView/>
        </>

    );
};

export default HomeScreen;