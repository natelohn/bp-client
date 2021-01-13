import React, { useContext, useState } from 'react';
import { FlatList, LayoutAnimation, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useMutation } from '@apollo/client';

import ButtonView from '../components/ButtonView';
import Challenger from '../components/ChallengerView'
import { CREATE_PUSHOFF } from '../apollo/gql';
import { Context as AuthContext } from '../context/AuthContext';
import { Context as PushOffContext } from '../context/PushOffContext';
import { navigate } from "../navigationRef";
import styles from '../styles/create';
import { ACCENT_COLOR } from '../styles/global'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MAX_CHALLENGERS = 9;

const CreateScreen = ({ navigation }) => {
    const authContext = useContext(AuthContext)
    const challengerId = authContext.state.challengerId;

    // Navigation params
    const { allChallengers, formerChallengerIds, robos, unavailableChallengerIds } = navigation.getParam('challengerData', {});
    const rematchChallengerIds = navigation.getParam('rematchChallengerIds', []);
    
    // Helpers
    const getRobo = (id) => {
        for(let robo of robos) {
            if(robo.challenger.id === id) {
                return robo;
            };
        };
        return null
    }

    const isRoboId = (id) => {
        const robo = getRobo(id);
        return robo != null;
    }

    const isFormerChallengerId = (id) => {
        return challengerId != id && !isRoboId(id) && formerChallengerIds.includes(id);
    }

    const isNewChallengerId = (id) => {
        return challengerId != id && !isRoboId(id) && !formerChallengerIds.includes(id);
    }

    const getUnselectedLists = (selectedList) => {
        const unselectedRobos = allChallengers.filter((challenger) => !selectedList.includes(challenger) && isRoboId(challenger.id));
        const unselectedFormerHumans = allChallengers.filter((challenger) => !selectedList.includes(challenger) && isFormerChallengerId(challenger.id));
        const unselectedNewHumans = allChallengers.filter((challenger) => !selectedList.includes(challenger) && isNewChallengerId(challenger.id));
        return { unselectedRobos, unselectedFormerHumans, unselectedNewHumans };
    }

    const buildUnselectedList = (selectedList) => {
        const { unselectedRobos, unselectedFormerHumans, unselectedNewHumans } = getUnselectedLists(selectedList);
        return [ ...unselectedRobos, ...unselectedFormerHumans, ...unselectedNewHumans ];
    }
    
    const navHome = () => {
        navigate("Home", { id: false });
    }

    // Build display values
    const initialSelectedChallengers = allChallengers.filter((challenger) => rematchChallengerIds.includes(challenger.id) && !unavailableChallengerIds.includes(challenger.id));
    const [ selectedChallengers, setSelectedChallengers ] = useState(initialSelectedChallengers);
    const unselectedList = buildUnselectedList(initialSelectedChallengers);
    const [ displayList, setDisplayList ] = useState([...selectedChallengers, ...unselectedList]);


    // Create push off mutation
    const [ callCreatePushOff ] = useMutation(CREATE_PUSHOFF);
    const { createPushOff } = useContext(PushOffContext);
    

    const selectChallenger = (challenger, selected) => {
        if (selectedChallengers.length < MAX_CHALLENGERS || selectedChallengers.includes(challenger)) {
            let newSelected = [...selectedChallengers];
            if (selected) {
                // Add challenger to selected list
                newSelected.push(challenger);
            } else {
                // Remove Challenger from selected list
               newSelected = newSelected.filter((selectedChallenger) => selectedChallenger.id != challenger.id);
            }

            // Set the new display list
            setSelectedChallengers(newSelected);
            const unselectedList = buildUnselectedList(newSelected);
            LayoutAnimation.configureNext({
                duration: 500,
                create: { type: 'linear', property: 'scaleXY' },
                update: { type: 'spring', springDamping: 0.4 },
                delete: { type: 'linear', property: 'scaleXY' } }
            );
            setDisplayList([...newSelected, ...unselectedList])
        }
    }

    const getSeparatorInfo = (index) => {
        const { unselectedRobos, unselectedFormerHumans, unselectedNewHumans } = getUnselectedLists(selectedChallengers);
        const roboIndex = selectedChallengers.length;
        const formerIndex =  roboIndex + unselectedRobos.length;
        const newIndex = formerIndex + unselectedFormerHumans.length;
        const showSelected = selectedChallengers.length > 0 && index === 0;
        const showRobo = unselectedRobos.length > 0 && index === roboIndex;
        const showFormer = unselectedFormerHumans.length > 0 && index === formerIndex;
        const showNew = unselectedNewHumans.length > 0 && index === newIndex;
        const maxReached = selectedChallengers.length >= MAX_CHALLENGERS;
        if (showSelected) {
            return { showSeparator: true, separatorMessage: '- Selected Challengers -' };
        } else if (maxReached) {
            if (index === selectedChallengers.length) {
                return { showSeparator: true, separatorMessage: '- Max Selected -' };
            }
        } else if (showRobo) {
            return { showSeparator: true, separatorMessage: '- Robo Challengers -' };
        } else if (showFormer) {
            return{ showSeparator: true, separatorMessage: '- Former Challengers -' };
        } else if (showNew) {
            return{ showSeparator: true, separatorMessage: '- New Challengers -' };
        }
        return { showSeparator: false, separatorMessage: '' };
    };
    
    const beginPushOff = () => {
        let userChallengerIds = [];
        const roboChallengerIds = [];
        for( let challenger of selectedChallengers ) {
            if (isRoboId(challenger.id)) {
                roboChallengerIds.push(challenger.id);
            } else {
                userChallengerIds.push(challenger.id);
            }
        }
        createPushOff(challengerId, userChallengerIds, roboChallengerIds, callCreatePushOff)
    }

    return (
        <View style={styles.screen}>
            <Icon 
                name='chevron-left'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.exit}
                onPress={ navHome }
            />
            <Text style={styles.headerText}>Select Challengers</Text>
            <FlatList 
                style={styles.selectView}
                data={displayList}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                    const { showSeparator, separatorMessage } = getSeparatorInfo(index);
                    return (
                        <>
                        { showSeparator ?
                        <View style={styles.separatorView}>
                            <Text style={styles.separatorMessage}>{separatorMessage}</Text>
                        </View>
                        : null }
                        <Challenger
                            challenger={item}
                            isSelected={index < selectedChallengers.length}
                            available={!unavailableChallengerIds.includes(item.id)}
                            maxSelected={selectedChallengers.length >= MAX_CHALLENGERS}
                            robo={getRobo(item.id)}
                            onSelectCallback={(item, selected) => { selectChallenger(item, selected) }}
                        />
                        </>
                    );
                }}
            />
            { selectedChallengers.length > 0 ? 
            <View style={styles.buttonView}> 
                <ButtonView displayText={'Begin'} onPressCallback={beginPushOff} small={true}/>
            </View>
            : null
            }
        </View>
    );
};

export default CreateScreen;