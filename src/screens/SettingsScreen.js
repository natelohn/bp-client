import React, { useState, useContext }  from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useMutation } from '@apollo/client';
import { Auth } from 'aws-amplify';
import { UPDATE_USERNAME } from '../apollo/gql';
import { Context as UserContext } from '../context/UserContext';
import ButtonView from '../components/ButtonView';
import { navigate } from "../navigationRef";
import styles from '../styles/settings';
import { ACCENT_COLOR } from '../styles/global';

// TODO: Add delete user functionality
const SettingsScreen = ({ navigation }) => {
    const signingUp = navigation.getParam('signingUp', false);
    const { setUser, state, updateUsername } = useContext(UserContext)
    const { challengerId, username } = state;
    const [ newUsername, setNewUsername ] = useState(username)
    const [ callUpdateUsername ] = useMutation(UPDATE_USERNAME);
    const invalidUsername = username === newUsername || newUsername.length === 0;


    const tryUsernameUpdate = () => {
        updateUsername(challengerId, newUsername, callUpdateUsername)
    }
    
    const signOut = async () => {
        try {
            await Auth.signOut();
            setUser(null);
            navigate('authFlow');
        } catch (error) {
            console.log('error signing out: ', error);
        }
    }
    
    return (
        <View style={styles.view}>
            { !signingUp && 
            <Icon 
                name='chevron-left'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.back}
                onPress={ () => { navigate("Home") } }
            />
            }
            <Text style={styles.editPrompt}>Edit Username:</Text>
            <TextInput 
                style={styles.textInput}
                placeholder={'Enter new username...'}
                value={newUsername}
                maxLength={32}
                autoCompleteType={'username'}
                onChangeText={(username) => { setNewUsername(username) }}
                autoFocus={false}
                blurOnSubmit={false}
            />
            <View style={styles.buttonView}>
                <ButtonView
                    displayText={'Update'}
                    onPressCallback={tryUsernameUpdate}
                    disabled={invalidUsername}
                    small={true}
                />
            </View>
            <TouchableOpacity onPress={signOut}>
                <Text style={styles.logout}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SettingsScreen;