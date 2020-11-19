import React, { useContext, useEffect, useState} from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

import { useQuery } from '@apollo/client';
import { PUSHOFFS_QUERY } from '../apollo/gql'

import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushContext } from "../context/PushContext";

import Carousel from '../components/Carousel';
import PlayView from '../components/PlayView';
import HomeIcons from '../components/HomeIcons'

import styles from '../styles/home';
import { navigate } from '../navigationRef';
import { showForfeitPrompt } from '../components/Alerts'


const MS_POLLING_FOR_NEW_PUSHOFFS = 600000; // 10 minutes

const HomeScreen = () => {
    // Auth Logic
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;

    // User's Push Data 
    const { loading, error, data } = useQuery(PUSHOFFS_QUERY, { variables: { challengerId }, pollInterval: MS_POLLING_FOR_NEW_PUSHOFFS });
    const { state, setPushData, setPushOff} = useContext(PushContext);
    const { pendingPushList, hasPendingPushes, pushOff } = state;

    const [ reviewingChallenges, setReviewingChallenges ] = useState(false);
    const [ pushing, setPushing ] = useState(false);
    const [ prePush, setPrePush] = useState(false);
    const [ interval, setInterval ] = useState(1);


    useEffect(() => {
        setPushOff(pendingPushList[interval - 1]);
    }, [reviewingChallenges, interval]);

    useEffect(() => {
        if (!loading) {
            setPushData(data, error, challengerId);
        }
    }, [loading]);

    const navToCreate = () => {
        console.log("Nav to create")
        navigate("Create");
    }

    const forfeitCallback = () => {
        console.log("Forfeit")
        // TODO: Write 
    }

    const forfeitPushOff = () => {
        const instigatorName = pushOff.instigator.username;
        const totalLosses = pushOff.pending.length + pushOff.pushes.length - 1;
        showForfeitPrompt(forfeitCallback, instigatorName, totalLosses)
    }
    
    const playViewParams = {
        hasPendingPushes,
        pendingPushList,
        reviewingChallenges,
        setReviewingChallenges,
        pushing,
        setPushing,
        prePush,
        setPrePush
    };

    // SANDBOX

    return (
        <View style={ styles.view } >
            { !pushing && !prePush ? <HomeIcons reviewingChallenges={reviewingChallenges} setReviewingChallenges={setReviewingChallenges} /> : null }
            { !pushing ? <Carousel
                hidden={!reviewingChallenges || pushing || prePush}
                items={pendingPushList}
                style={"pending"}
                interval={interval}
                setInterval={setInterval}
            /> : null }
            <PlayView playViewParams={playViewParams} />
            { hasPendingPushes && !reviewingChallenges ?
                <TouchableOpacity onPress={navToCreate}>
                    <Text style={styles.create}>Create Push-Off</Text>
                </TouchableOpacity>
            : null }
            { reviewingChallenges && !pushing && !prePush?
                <TouchableOpacity onPress={forfeitPushOff}>
                    <Text style={styles.create}>Forfeit</Text>
                </TouchableOpacity>
            : null }
        </View>
    );
};

export default HomeScreen;