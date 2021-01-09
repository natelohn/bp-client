import { useMutation } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { FlatList, LayoutAnimation, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import ButtonView from '../components/ButtonView';
import Challenger from '../components/ChallengerView'
import { navigate } from "../navigationRef";
import styles from '../styles/create';
import { ACCENT_COLOR } from '../styles/global'
import { CREATE_PUSHOFF } from '../apollo/gql';
import {Context as PushContext} from '../context/PushContext'

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const MAX_CHALLENGERS = 9;

const CreateScreen = ({ navigation }) => {
    const [ callCreatePushOff ] = useMutation(CREATE_PUSHOFF);
    const rematchChallengerIds = navigation.getParam('rematchChallengerIds', []);
    const { state, createPushOff } = useContext(PushContext);
    const { challengerId, allChallengers, unavailableChallengerIds, robos, roboChallengers, formerChallengers }  = state.challengerData;
    
    const navHome = () => {
        navigate("Home", { id: false });
    }

    const initialSelectedChallengers = allChallengers.filter((challenger) => rematchChallengerIds.includes(challenger.id));
    
    const [ selectedChallengers, setSelectedChallengers ] = useState(initialSelectedChallengers)
   
    // Remove selected challengers
    const unselectedRobos = roboChallengers.filter((robo) => !selectedChallengers.includes(robo)); 
    const unselectedFormerHumans = formerChallengers.filter((former) => !selectedChallengers.includes(former) && !roboChallengers.includes(former));
    const unselectedNewHumans = allChallengers.filter((ch) => !selectedChallengers.includes(ch) && !unselectedFormerHumans.includes(ch) && !roboChallengers.includes(ch) && ch.id != challengerId);
    const [ displayList, setDisplayList ] = useState([...selectedChallengers, ...unselectedRobos, ...unselectedFormerHumans, ...unselectedNewHumans]);
    
    const selectChallenger = (challenger, selected) => {
        if (selectedChallengers.length != MAX_CHALLENGERS || selectedChallengers.includes(challenger)) {
            let newSelected = [...selectedChallengers];
            if (selected) {
                // Add challenger to selected list
                newSelected.push(challenger);
            } else {
                // Remove Challenger from selected list
               newSelected = newSelected.filter((selected) => selected.id != challenger.id);
            }
            // Remove all challengers in the selected lists from the robo, former and new challenger lists
            const newRobo = roboChallengers.filter((unselected) => !newSelected.includes(unselected));
            const newFormerHumans = formerChallengers.filter((unselected) => !newSelected.includes(unselected) && !newRobo.includes(unselected)); 
            const newNewHumans = allChallengers.filter((ch) => !newSelected.includes(ch) && !newRobo.includes(ch) && !newFormerHumans.includes(ch) && ch.id != challengerId);
    
            // Set the new display list
            setSelectedChallengers(newSelected);
            LayoutAnimation.configureNext({
                duration: 500,
                create: { type: 'linear', property: 'scaleXY' },
                update: { type: 'spring', springDamping: 0.4 },
                delete: { type: 'linear', property: 'scaleXY' } }
            );
            setDisplayList([...newSelected, ...newRobo, ...newFormerHumans, ...newNewHumans])
        }
    }

    const getSeparatorInfo = (index) => {
        const showSelectedIndex = selectedChallengers.length > 0 ? 0 : -1;
        const showRoboIndex = selectedChallengers.length;
        const showFormerIndex =  showRoboIndex + unselectedRobos.length;
        const showNewIndex = showFormerIndex + unselectedFormerHumans.length;
        const showSelected = selectedChallengers.length > 0 && index === showSelectedIndex;
        const showRobo = unselectedRobos.length > 0 && index === showRoboIndex;
        const showFormer = unselectedFormerHumans.length > 0 && showFormerIndex === index;
        const showNew = unselectedNewHumans.length > 0 && showNewIndex === index;
        const maxReached = selectedChallengers.length >= MAX_CHALLENGERS;
        let separatorInfo = { showSeparator: false, separatorMessage: '' };
        if (showSelected) {
            separatorInfo = { showSeparator: true, separatorMessage: '- Selected Challengers -' };
        } else if (maxReached) {
            if (index === selectedChallengers.length) {
                separatorInfo = { showSeparator: true, separatorMessage: '- Max Selected -' };
            }
        } else if (showRobo) {
            separatorInfo = { showSeparator: true, separatorMessage: '- Robo Challengers -' };
        } else if (showFormer) {
            separatorInfo = { showSeparator: true, separatorMessage: '- Former Challengers -' };
        } else if (showNew) {
            separatorInfo = { showSeparator: true, separatorMessage: '- New Challengers -' };
        }
        return separatorInfo
    };

    const getRoboData = (challenger) => {
        for (let robo of robos) {
            if (robo.challenger.id === challenger.id) {
                return { ...robo, isRobo: true }
            }
        }
        return { isRobo: false }
    }

    const isAvailable = (challenger) => {
        if (selectedChallengers.includes(challenger)) {
            return true;
        }
        return !unavailableChallengerIds.includes(challenger.id) && selectedChallengers.length < MAX_CHALLENGERS;
    }
    
    const beginPushOff = () => {
        let userChallengerIds = [];
        const roboChallengerIds = [];
        for( let challenger of selectedChallengers ) {
            if (roboChallengers.includes(challenger)) {
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
                            available={isAvailable(item)}
                            maxSelected={selectedChallengers.length >= MAX_CHALLENGERS}
                            roboData={getRoboData(item)}
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