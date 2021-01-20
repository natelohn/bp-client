import React, { useContext, useEffect, useReducer, useState } from 'react';
import { LayoutAnimation, TouchableOpacity, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { useLazyQuery } from '@apollo/client';
import { CHALLENGER_DATA, LEADERBOARD_DATA } from '../apollo/gql';
import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushOffContext } from "../context/PushOffContext";
import { navigate } from '../navigationRef';
import ButtonView from '../components/ButtonView';
import LoadingView from '../components/LoadingView';
import styles from '../styles/launch'
import { ACCENT_COLOR, SECONDARY_COLOR } from '../styles/global'
import { sendServerAlert } from './Alerts';

const reducer = (state, { type }) => {
    switch (type) {
        case 'open_review':
            return { ...state, reviewOpen: true, settingsOpen: false };
        case 'open_settings':
            return { ...state, reviewOpen: false, settingsOpen: true };
        case 'close_review':
            return { ...state, reviewOpen: false };
        case 'close_settings':
            return { ...state, settingsOpen: false };
        case 'close_all':
            return { ...state, reviewOpen: false, settingsOpen: false };
        default:
            return state;
    }
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LaunchView = ({ viewPending }) => {
    // Prepare query for create screen
    const authContext = useContext(AuthContext)
    const challengerId = authContext.state.challengerId;
    const queryOptions = { variables: { challengerId }, fetchPolicy: "cache-and-network" };
    const [ getChallengers, challengers ] = useLazyQuery(CHALLENGER_DATA, queryOptions);
    const [ getLeaderboard, leaderboard ] = useLazyQuery(LEADERBOARD_DATA, queryOptions);
    const [ loadingChallengers, setLoadingChallengers ] = useState(false);
    const [ loadingLeaderboard, setLoadingLeaderboard ] = useState(false);

    useEffect(() => {
        setLoadingChallengers(challengers.loading)
        if(challengers.called && !challengers.loading) {
            if (challengers.error) {
                sendServerAlert();
            } else {
                const { challengerData } = challengers.data;
                navigate('Create', { challengerData });
            }
        }
    }, [challengers.called, challengers.loading]);

    useEffect(() => {
        setLoadingLeaderboard(leaderboard.loading)
        if(leaderboard.called && !leaderboard.loading) {
            if (leaderboard.error) {
                sendServerAlert();
            } else {
                const { leaderboardData } = leaderboard.data;
                navigate('Leaderboard', { leaderboardData });
            }
        }
    }, [leaderboard.called, leaderboard.loading]);

    // Context
    const pushContext = useContext(PushOffContext);
    const { pendingPushOffList } = pushContext.state;

    // Display Values/logic
    // TODO: Does this increment with each call?
    const hasPendingPushes = pendingPushOffList.length > 0;
    const newPushOffText = pendingPushOffList.length > 1 ? `New Push-Offs!` : `New Push-Off!`;

    // State Management
    const [state, dispatch] = useReducer(reducer, {
        reviewOpen: false,
        settingsOpen: false,
    });
    const { reviewOpen, settingsOpen } = state;
    
    const toggleReview = () => {
        LayoutAnimation.configureNext({
            duration: 100,
            create: { type: 'linear', property: 'scaleXY' },
            update: { type: 'spring', springDamping: 0.4 },
            delete: { type: 'linear', property: 'scaleXY' } }
        );
        if (reviewOpen) {
            dispatch({type: 'close_review'});
        } else {
            dispatch({type: 'open_review'});
        }
    }

    const toggleSettings = () => {
        LayoutAnimation.configureNext({
            duration: 100,
            create: { type: 'linear', property: 'scaleXY' },
            update: { type: 'spring', springDamping: 0.4 },
            delete: { type: 'linear', property: 'scaleXY' } }
        );
        if (settingsOpen) {
            dispatch({type: 'close_settings'});
        } else {
            dispatch({type: 'open_settings'});
        }
    }

    const settingsIconColor = settingsOpen ? SECONDARY_COLOR : ACCENT_COLOR;
    const reviewIconColor = reviewOpen ? SECONDARY_COLOR : ACCENT_COLOR;

    const transitonToCreate = () => {
        dispatch({type: 'close_all'});
        getChallengers();
    }

    const transitonToLeaderboard = () => {
        dispatch({type: 'close_all'});
        getLeaderboard();
    }

    const transitonToViewPending = () => {
        dispatch({type: 'close_all'});
        viewPending();
    }

    return (
        <>
        { loadingChallengers || loadingLeaderboard ?
        <LoadingView/>
        :
        <>
            <Icon
                name='bars'
                type='font-awesome-5'
                size={32}
                color={ settingsIconColor }
                containerStyle={styles.settingsIcon}
                onPress={ toggleSettings }
            />
            <Icon
                name='clipboard-list'
                type='font-awesome-5'
                size={32}
                color={ reviewIconColor }
                containerStyle={styles.reviewIcon}
                onPress={ toggleReview }
            />
            { reviewOpen ?
            <View style={styles.reviewBubble}>
                <Icon
                    name='poll-h'
                    type='font-awesome-5'
                    size={32}
                    color={ ACCENT_COLOR }
                    containerStyle={styles.historyIcon}
                    onPress={ () => navigate('History') }
                />
                <Icon
                    name='trophy'
                    type='font-awesome-5'
                    size={32}
                    color={ ACCENT_COLOR }
                    containerStyle={styles.leaderboardIcon}
                    onPress={ transitonToLeaderboard }
                />
            </View> : null }
            { settingsOpen ?
            <View style={styles.settingsBubble}>
                <Icon
                    name='user-cog'
                    type='font-awesome-5'
                    size={30}
                    color={ ACCENT_COLOR }
                    containerStyle={styles.userIcon}
                    onPress={ () => navigate('Settings') }
                />
                <Icon
                    name='question-circle'
                    type='font-awesome-5'
                    size={32}
                    color={ ACCENT_COLOR }
                    containerStyle={styles.helpIcon}
                    onPress={ () => navigate('Help') }
                />
            </View> : null }
            <View style={styles.buttonArea}>
                { hasPendingPushes ?
                <>
                <ButtonView displayText={`${pendingPushOffList.length} ${newPushOffText}`} onPressCallback={transitonToViewPending}/>
                <TouchableOpacity onPress={transitonToCreate}>
                    <Text style={styles.create}>Create Push-Off</Text>
                </TouchableOpacity>
                </>
                :
                <ButtonView displayText={'Test Your Will!'} onPressCallback={transitonToCreate}/>
                }
            </View>
        </>
        }
        </>
    );
}


export default LaunchView;