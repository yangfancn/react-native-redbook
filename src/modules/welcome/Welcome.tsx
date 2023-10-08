import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";
import IconLogo from '../../assets/icon_main_logo.png';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { load } from '../../utils/Storage';

export default () => {
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        setTimeout(async () => {
            load('userInfo').then(cacheUserInfo => {
                const userInfo = cacheUserInfo ? JSON.parse(cacheUserInfo) : null;
                navigation.replace(userInfo ? 'mainTab' : 'login');
            })
        }, 2000)
    }, [])

    return (
        <View style={styles.root}>
            <Image source={IconLogo} style={styles.logo} />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logo: {
        width: 200,
        height: 105,
        marginTop: 200,
        resizeMode: 'contain'
    }
});