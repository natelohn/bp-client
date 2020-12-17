import React, { useContext, useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { navigate } from "../navigationRef";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushContext } from "../context/PushContext";
import styles from '../styles/results';
import { ACCENT_COLOR, RESULT_TIME_WIDTH } from '../styles/global'
import Duration from '../components/Duration';
import ButtonView from '../components/ButtonView';

const ResultsScreen = ({ navigation }) => {
    // Context
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;
    const { state } = useContext(PushContext);
    const id = navigation.getParam('id');
    const pushOff = state.allPushOffs[id];

    //Layout Values
    const screenSize = Dimensions.get('window');
    const mainViewWidth = screenSize.width * 0.9;
    const mainViewHeight = screenSize.height * 0.9;
    const widthMultiplier = mainViewWidth - RESULT_TIME_WIDTH;

    // List Animation values
    let sortedPushList = [...pushOff.pushes].sort(function(a, b){ return b.duration - a.duration });
    const longestDuration = sortedPushList[0].duration;

    const [ foundUser, setFoundUser ] = useState(false);
    const [ wins, setWins ] = useState(0);
    const [ losses, setLosses ] = useState(0);
    const [ currentIter, setCurrentIter ] = useState(1);
    const [ displayPushList, setDisplayPushList ] = useState(pushOff.pushes);


    useEffect(()=>{
        if (currentIter <= pushOff.pushes.length) {
            let interval = setInterval(() => {
                const pushIndex = sortedPushList.length - currentIter;
                const nextLowestPush = sortedPushList[pushIndex];
                let updatedDisplayList = displayPushList.filter(push => push.id != nextLowestPush.id);
                updatedDisplayList.splice(pushIndex, 0, nextLowestPush);
                setDisplayPushList(updatedDisplayList);
                setCurrentIter(currentIter + 1);

                // Handle Wins/Losses
                const isUser = nextLowestPush.challenger.id === challengerId;
                if (isUser){
                    setFoundUser(true);
                } else {
                    if (foundUser) {
                        setLosses(losses + 1);
                    } else {
                        setWins(wins + 1 );
                    }
                }
            }, 1000);
            return () => {
                clearInterval(interval);
            };
        }
    });

    const navHome = () => {
        navigate("Home");
    }

    // TODO: Add Pending Info

    // TODO: Either ensure the list doesn't go over the screen height or make it scrollable if it does
    return (
        <View style={styles.view}>
            <Icon
                name='chevron-left'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.backIcon}
                onPress={ navHome }
            />
            <View style={{height: mainViewHeight, width: mainViewWidth}}>
                <View style={styles.recordView}>
                    <View style={styles.record}>
                        <Text style={styles.recordText}>Won</Text>
                        <Text style={styles.recordText}>{wins}</Text>
                    </View>
                    <View style={styles.record}>
                        <Text style={styles.recordText}>Lost</Text>
                        <Text style={styles.recordText}>{losses}</Text>
                    </View>
                </View>
                <View style={styles.durations}>
                    <FlatList
                        data={displayPushList}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                        renderItem={({item, index}) => {
                            return (
                                <Duration
                                    push={item}
                                    rank={index + 1}
                                    windthMultiplier={widthMultiplier}
                                    longestDuration={longestDuration}
                                    challengerCount={pushOff.pushes.length}
                                />
                            );
                        }}
                    />
                </View>
                <View style={styles.buttonArea}>
                    <ButtonView displayText="Rematch" small={true}/>
                </View>
            </View>
        </View>
    );
};

export default ResultsScreen;