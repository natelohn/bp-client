import React, { useContext } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { navigate } from "../navigationRef";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushContext } from "../context/PushContext";
import styles from '../styles/results';
import { ACCENT_COLOR, RESULT_TIME_WIDTH } from '../styles/global'
import { calculateRecord, isRoboId } from '../utils';
import Duration from '../components/Duration';
import ButtonView from '../components/ButtonView';

const ResultsScreen = ({ navigation }) => {
    
    // Context
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;
    const { state } = useContext(PushContext);
    const id = navigation.getParam('id');
    const pushOff = state.allPushOffs[id];
    const { wins, losses } = calculateRecord(pushOff, challengerId);

    //Animations
    const screenSize = Dimensions.get('window');
    const mainViewWidth = screenSize.width * 0.9;
    const mainViewHeight = screenSize.height * 0.9;

    const navHome = () => {
        navigate("Home");
    }

    const orderedPushes = [...pushOff.pushes];
    orderedPushes.sort((a,b) => b.duration - a.duration)
    const longestDuration = orderedPushes[0].duration;
    let rank = 1;
    let pushData = [];
    let foundUser = false;
    for (let push of orderedPushes) {
        const isUser = push.challenger.id === challengerId;
        const width = (push.duration / longestDuration) * (mainViewWidth - RESULT_TIME_WIDTH);
        const data = {
            id: push.id,
            isPending: false,
            duration: push.duration,
            name: push.challenger.username,
            result: isUser ? '' : foundUser ? '- W' : '- L',
            isRobo: isRoboId(push.challenger.id),
            isUser,
            rank,
            width,
            longestDuration
        }
        foundUser = isUser ? true : foundUser;
        rank = rank + 1;
        pushData.push(data);
    }

    // TODO: Add Pending Info

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
                        data={pushData}
                        keyExtractor={item => item.id}
                        scrollEnabled={false}
                        renderItem={({item}) => {
                            return (
                                <Duration durationInfo={item}/>
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