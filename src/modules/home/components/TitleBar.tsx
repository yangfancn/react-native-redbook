import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

import IconDaily from '../../../assets/icon_daily.png';
import IconSearch from '../../../assets/icon_search.png';

type Props = {
    tab: number,
    onTabChanged: (tabIndex: number) => void
}

export default ({tab, onTabChanged}: Props) => {
    const [tabActiveIndex, setTabActiveIndex] = useState<number>(1);

    useEffect(() => {
        setTabActiveIndex(tab);
    }, [tab])

    const styles = StyleSheet.create({
        root: {
            backgroundColor: "#fff",
            height: 48,
            paddingHorizontal: 12,
            width: '100%',
            flexDirection: 'row'
        },
        icon: {
            width: 26,
            resizeMode: 'contain'
        },
        iconTouchAble: {
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        tabButton: {
            flex: 1,
            height: '100%',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        },
        tabText: {
            fontSize: 14,
            color: '#999'
        },
        tabTextSelected: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#222'
        },
        tabButtonLine: {
            width: 28,
            height: 2,
            backgroundColor: '#ff2442',
            borderRadius: 1,
            position: 'absolute',
            bottom: 6
        }
    });

    const tabPress = (tabIndex: number) => {
        setTabActiveIndex(tabIndex);
        onTabChanged(tabIndex);
    }

    return (
        <View style={styles.root}>
            <TouchableOpacity
                style={[styles.iconTouchAble, { paddingRight: 12 }]}
            >
                <Image source={IconDaily} style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tabButton, { marginLeft: 36 }]}
                onPress={() => tabPress(0)}
                activeOpacity={.85}
            >
                <Text style={tabActiveIndex === 0 ? styles.tabTextSelected : styles.tabText}>关注</Text>
                {tabActiveIndex === 0 && <View style={styles.tabButtonLine} />}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.tabButton}
                onPress={() => tabPress(1)}
                activeOpacity={.85}
            >
                <Text style={tabActiveIndex === 1 ? styles.tabTextSelected : styles.tabText}>发现</Text>
                {tabActiveIndex === 1 && <View style={styles.tabButtonLine} />}
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.tabButton, { marginRight: 36 }]}
                onPress={() => tabPress(2)}
                activeOpacity={.85}
            >
                <Text style={tabActiveIndex === 2 ? styles.tabTextSelected : styles.tabText}>深圳</Text>
                {tabActiveIndex === 2 && <View style={styles.tabButtonLine} />}
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.iconTouchAble, { paddingLeft: 12 }]}
            >
                <Image source={IconSearch} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
}