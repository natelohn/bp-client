import React from "react";
import { Text, StyleSheet, View, Button, Image} from "react-native";

const HomeScreen = ({ navigation }) => {
    return (
        <View>
            <Button
                title="Push Me!"
                onPress={() => navigation.navigate('Winner')}
            />
        </View>
    );
};

export default HomeScreen;
