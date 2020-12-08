import React, { useContext } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Icon } from 'react-native-elements'
import { navigate } from "../navigationRef";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as PushContext } from "../context/PushContext";
import styles, { TOP_OFFSET } from '../styles/results';
import { ACCENT_COLOR } from '../styles/global'
import { calculateRecord } from '../utils';

const ResultsScreen = ({ navigation }) => {
    
    // Context
    const authContext = useContext(AuthContext);
    const { challengerId } = authContext.state;
    const { state } = useContext(PushContext);
    // const id = navigation.getParam('id');
    const id = 'abfc0666-c8f1-43de-b2d0-5761637ede24';
    const pushOff = state.allPushOffs[id];
    const { wins, losses } = calculateRecord(pushOff, challengerId);

    //Animations
    const screenSize = Dimensions.get('window');
    const mainViewWidth = screenSize.width * 0.9;
    const mainViewHeight = screenSize.height * 0.9;

    const navHome = () => {
        navigate("Home");
    }

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
            <View style={{height: mainViewHeight, width: mainViewWidth, top: TOP_OFFSET}}>
                <View style={styles.record}>
                    <Text>Won: {wins}</Text>
                    <Text>Lost: {losses}</Text>
                </View>
                <View style={styles.durations}>
                    <Text>Durations Area</Text>
                </View>
                <View style={styles.buttonArea}>
                    <Text>Button Area</Text>
                </View>
            </View>

        </View>
    );
};

export default ResultsScreen;