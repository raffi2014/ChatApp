import React from 'react';
import { View, Image, StyleSheet, Text, Dimensions, Pressable } from 'react-native';

import { useNavigation } from '@react-navigation/native';

const fodderLogo = require('../assets/orange-logo.png');

const LoginScreen: React.FC = () => {
    const navigation = useNavigation<any>();
    const navigateTo = () => {
        navigation.navigate("BottomTabs");
    }
    console.log(Dimensions.get('window').height);
    return (
        <View style={styles.container}>
        <Image source={fodderLogo} style={styles.appLogo} ></Image>
        <Text style={styles.starterLabel}>Let's make your day great</Text>
        <Pressable style={styles.startButton} onPress={navigateTo}>
        <Text style={styles.startText}>Get Started</Text>
        </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    appLogo: {
        resizeMode: 'contain',
        alignSelf: 'center',
        width: Dimensions.get('screen').width,
        height:300,
    },
    starterLabel: {
        fontSize:21,
        marginTop: 100,
    },
    container: {
        flexDirection: 'column',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        alignItems:'center',
        justifyContent:'center',

    },
    startButton: {
        width: 180,
        height: 44,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent:'center',
        borderRadius: 25,
        marginTop:144
    },
    startText: {
        color: '#000'
    }
});

export default LoginScreen;