import React from 'react';
import { Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { navigate } from "../navigationRef";
import styles from '../styles/help';
import { ACCENT_COLOR, PRIMARY_COLOR } from '../styles/global';

const HelpScreen = () => {

    const testWillText = 'Do you and a friend want to settle a dispute? Want to test your will rather than relying on luck or skill? See who wants it more with Button Push!';
    const howToPlayText = 'To play, just keep pushing that button as it moves around the screen! If you don\'t push the button for 10 seconds, you are done and your time is logged.';
    const howToWinText = 'You won\'t now how long you\'ll need to push for until you are done so perserverence is key. Push longer than all your friends and you win!';
    const roboExplanationText = 'A few robots have really taken to Button Push and use it regularly. Some of them are more determined than others, but all of them want to test their will againt you!';
    const contactText = 'We at Button Push want to be as helpful as we can so please don\'t hesitate to contact us @ hello@natelohn.com with any and all questions or concerns. Happy Pushing!';
    return (
        <View style={styles.view}>
            <Icon 
                name='chevron-left'
                type='font-awesome-5'
                size={32}
                color={ ACCENT_COLOR }
                containerStyle={styles.back}
                onPress={ () => { navigate("Home") } }
            />
            <Text style={styles.title}>How to Button Push</Text>
            <View style={styles.helpView}>
                <View style={styles.helpInfoView}>
                    <View style={styles.iconView}>
                        <Icon
                            name='angry'
                            containerStyle={styles.icon}
                            type='font-awesome-5'
                            color={ ACCENT_COLOR }
                            size={32}
                        />
                        <Icon
                            name='angry'
                            containerStyle={styles.icon}
                            type='font-awesome-5'
                            color={ ACCENT_COLOR }
                            size={32}
                        />
                    </View>
                    <Text style={styles.text}>{testWillText}</Text>
                </View>
                <View style={styles.helpInfoView}>
                    <View style={styles.iconView}>
                        <Icon
                            name='circle'
                            containerStyle={styles.icon}
                            type='font-awesome'
                            color={ PRIMARY_COLOR }
                            size={32}
                        />
                        <Icon
                            name='hand-point-left'
                            containerStyle={styles.icon}
                            type='font-awesome-5'
                            color={ ACCENT_COLOR }
                            size={32}
                        />
                    </View>
                    <Text style={styles.text}>{howToPlayText}</Text>
                </View>
                <View style={styles.helpInfoView}>
                    <View style={styles.iconView}>
                        <Icon
                            name='laugh-beam'
                            containerStyle={styles.icon}
                            type='font-awesome-5'
                            color={ ACCENT_COLOR }
                            size={32}
                        />
                        <Icon
                            name='clock'
                            containerStyle={styles.icon}
                            type='font-awesome-5'
                            color={ ACCENT_COLOR }
                            size={32}
                        />
                        <Icon
                            name='sad-cry'
                            containerStyle={styles.icon}
                            type='font-awesome-5'
                            color={ ACCENT_COLOR }
                            size={32}
                        />
                    </View>
                    <Text style={styles.text}>{howToWinText}</Text>
                </View>
                <View style={styles.helpInfoView}>
                    <View style={styles.iconView}>
                        <Icon
                            name='robot'
                            containerStyle={styles.icon}
                            type='font-awesome-5'
                            color={ ACCENT_COLOR }
                            size={32}
                        />
                    </View>
                    <Text style={styles.text}>{roboExplanationText}</Text>
                </View>
                <View style={styles.helpInfoView}>
                    <View style={styles.iconView}>
                        <Icon
                            name='question-circle'
                            containerStyle={styles.icon}
                            type='font-awesome-5'
                            color={ ACCENT_COLOR }
                            size={32}
                        />
                    </View>
                    <Text style={styles.text}>{contactText}</Text>
                </View>
            </View>
        </View>
    );
};

export default HelpScreen;