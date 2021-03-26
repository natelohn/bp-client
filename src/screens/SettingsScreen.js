import React, { useState, useContext, useRef }  from 'react';
import { Animated, Dimensions, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useMutation } from '@apollo/client';
import { createUser } from '../graphql/mutations';
import { Auth } from 'aws-amplify';
import { Context as UserContext } from '../context/UserContext';
import ButtonView from '../components/ButtonView';
import { navigate } from "../navigationRef";
import styles from '../styles/settings';
import userIcons from '../styles/userIcons';
import { ACCENT_COLOR, PRIMARY_COLOR } from '../styles/global';
import API, { graphqlOperation } from '@aws-amplify/api';





// TODO: Add delete user functionality
const SettingsScreen = ({ navigation }) => {
    const signingUp = navigation.getParam('signingUp', false);
    const { setUser, state, updateUsername } = useContext(UserContext)
    const { challengerId, username, userIcon } = state;
    const [ newUsername, setNewUsername ] = useState(username);
    const startingIcon = userIcon ? userIcon : userIcons[Math.floor(Math.random() * userIcons.length)];
    const [ newUserIcon, setNewUserIcon ] = useState(startingIcon);
    const invalidUsername = username === newUsername || newUsername.length === 0;
    const [ reviewing, setReviewing ] = useState(false);


    const screenWidth = Dimensions.get('window').width;
    const iconReviewY = 125;
    const iconSelectY = 0;
    const slidingWindowReviewX = 0;
    const slidingWindowSelectX = -1 * screenWidth;
    const iconY = useRef(new Animated.Value(iconReviewY)).current;
    const reviewX = useRef(new Animated.Value(slidingWindowReviewX)).current;
    const selectIcon = reviewing ? 'check-circle' : 'edit';
    const selectIconColor = reviewing ? PRIMARY_COLOR : ACCENT_COLOR;
    const selectIconSize = reviewing ? 36 : 22;
    const selectIconBorderRadius = reviewing ? 50 : 0;
    
    
    const tryUsernameUpdate = () => {
        updateUsername(challengerId, newUsername, callUpdateUsername)
    }

    const creatNewUser = async () => {
        const newUser = { username: newUsername, icon: newUserIcon};          
        await API.graphql(graphqlOperation(createUser, { input: newUser }));
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

    const moveIconSelect = (toValue) => {
        Animated.timing(iconY, {
            toValue,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const setRandomIcon = () => {
        setNewUserIcon(userIcons[Math.floor(Math.random() * userIcons.length)])
    }
    
    const moveSlidingWindow = (toValue) => {
        Animated.timing(reviewX, {
            toValue,
            duration: 250,
            useNativeDriver: true
        }).start();
    }

    const reviewingTransition = () => {
        setReviewing(!reviewing);
        const iconYValue = reviewing ? iconReviewY : iconSelectY;
        moveIconSelect(iconYValue);
        const reviewXValue = reviewing ? slidingWindowReviewX : slidingWindowSelectX;
        moveSlidingWindow(reviewXValue);
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
            <Animated.View style={[styles.iconView, { transform: [{ translateY: iconY }]}]}>
                <Icon 
                    name={ newUserIcon }
                    type='font-awesome-5'
                    size={64}
                    color={ ACCENT_COLOR }
                    containerStyle={styles.mainIcon}
                />
                <Icon 
                    name={ selectIcon }
                    type='font-awesome-5'
                    size={ selectIconSize }
                    color={ selectIconColor }
                    containerStyle={{ ...styles.editIcon, borderRadius: selectIconBorderRadius} }
                    onPress={ reviewingTransition }
                />
            </Animated.View>
            <Animated.View style={[styles.slidingWindow, { transform: [{ translateX: reviewX }]}]}>
                <View style={styles.reviewView}>
                    <Text style={styles.editPrompt}>Username:</Text>
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
                            onPressCallback={creatNewUser}
                            disabled={invalidUsername}
                            small={true}
                        />
                    </View>
                    <TouchableOpacity onPress={signOut}>
                        <Text style={styles.logout}>Logout</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.reviewView}>
                    <FlatList
                        data={userIcons}
                        numColumns={4}
                        style={styles.iconFlatList}
                        keyExtractor={item => item}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity 
                                    style={styles.iconOption}
                                    onPress={() => setNewUserIcon(item)}
                                >
                                    <Icon
                                        name={item}
                                        type='font-awesome-5'
                                        size={58}
                                        color={ ACCENT_COLOR }
                                    />
                                </TouchableOpacity>
                            );
                        }}
                    />
                    <ButtonView small={true} displayText={'Random'} onPressCallback={setRandomIcon}/>
                </View>
            </Animated.View>

        </View>
    );
};

export default SettingsScreen;