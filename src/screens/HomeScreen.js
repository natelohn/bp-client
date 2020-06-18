import React from "react";
import {Text, View, Button, StyleSheet} from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.view}>
            <Text style={styles.header}>Welcome to Button Push</Text>
            <Text style={styles.subheader}>Care to test your will?</Text>
            <Button
                title="Easy Mode"
                onPress={() => navigation.navigate('EasyMode')}
            />
            <Button
                title="Hard Mode"
                onPress={() => navigation.navigate('HardMode')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        alignItems: 'center'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 26,
        marginTop: 20
    },
    subheader: {
        fontSize: 18,
        marginTop: 5
    }
});

export default HomeScreen;
