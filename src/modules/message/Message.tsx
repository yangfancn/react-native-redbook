import React from "react";
import { View, Text, StyleSheet } from 'react-native';

export default () => {
    return (
        <View style={styles.root}>
            <Text style={styles.title}>Message Page</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 16,
        color: '#333333',
        fontWeight: '600'
    }
})