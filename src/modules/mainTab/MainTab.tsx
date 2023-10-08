import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { launchImageLibrary, ImagePickerResponse } from "react-native-image-picker";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import Message from "../message/Message";
import Mine from "../mine/Mine";

// import IconTabHomeNormal from '../../assets/icon_tab_home_normal.png';
// import IconTabHomeSelected from '../../assets/icon_tab_home_selected.png';
// import IconTabShopNormal from '../../assets/icon_tab_shop_normal.png';
// import IconTabShopSelected from '../../assets/icon_tab_shop_selected.png';
// import IconTabMeassageNormal from '../../assets/icon_tab_message_normal.png';
// import IconTabMessageSelected from '../../assets/icon_tab_message_selected.png';
// import IconTabMineNormal from '../../assets/icon_tab_mine_normal.png';
// import IconTabMineSelected from '../../assets/icon_tab_mine_selected.png';
import IconTabPublish from '../../assets/icon_tab_publish.png';

const BottomTab = createBottomTabNavigator();

export default () => {
    const RedBookTabBar = ({ state, descriptors, navigation }: any) => {
        const { routes, index } = state;
        return (
            <View style={styles.tabBarContainer}>
                {routes.map((route: any, i: number) => {
                    const { options } = descriptors[route.key];
                    const isFoucsed = index === i;
                    const label = options.title;
                    return (
                        <TouchableOpacity
                            style={styles.tabItem}
                            key={label}
                            onPress={() => {
                                if (i === 2) {
                                    launchImageLibrary({
                                        mediaType: 'photo',
                                        quality: 1,
                                        includeBase64: true
                                    }, (res: ImagePickerResponse) => {
                                        const { assets } = res;
                                        if (!assets?.length) {
                                            console.log('选择图片失败');
                                            return;
                                        }
                                        const { uri, width, height, fileName, fileSize, type, base64 } = assets[0];
                                        console.log(uri);
                                    })
                                } else {
                                    navigation.navigate(route.name);
                                }
                            }}
                            activeOpacity={.85}
                        >
                            {i === 2 && (
                                <Image source={IconTabPublish} style={styles.iconTabPublish} />
                            )}
                            {i !== 2 && (
                                <Text
                                    style={{
                                        fontSize: isFoucsed ? 14 : 12,
                                        color: isFoucsed ? '#333' : '#999',
                                        fontWeight: isFoucsed ? 'bold' : 'normal'
                                    }}
                                >{label}</Text>
                            )}
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
    return (
        <View style={styles.root}>
            <BottomTab.Navigator
                // screenOptions={({ route }) => {
                //     return {
                //         tabBarIcon: ({ focused, color, size }) => {
                //             let imgSource;
                //             switch (route.name) {
                //                 case 'Home':
                //                     imgSource = focused ? IconTabHomeSelected : IconTabHomeNormal;
                //                     break;
                //                 case 'Shop':
                //                     imgSource = focused ? IconTabShopSelected : IconTabShopNormal;
                //                     break;
                //                 case 'Message':
                //                     imgSource = focused ? IconTabMessageSelected : IconTabMeassageNormal;
                //                     break;
                //                 case 'Mine':
                //                     imgSource = focused ? IconTabMineSelected : IconTabMineNormal;
                //             }
                //             return <Image
                //                 style={{
                //                     width: size,
                //                     height: size,
                //                     tintColor: color
                //                 }}
                //                 source={imgSource}
                //             />
                //         },
                //         tabBarActiveTintColor: '#ff2442',
                //         tabBarInactiveTintColor: '#999'
                //     };
                // }}
                tabBar={props => <RedBookTabBar {...props} />}
            >
                <BottomTab.Screen
                    name='Home'
                    component={Home}
                    options={{
                        title: '首页',
                        headerShown: false
                    }}
                />
                <BottomTab.Screen
                    name='Shop'
                    component={Shop}
                    options={{
                        title: '购物',
                        headerShown: false
                    }}
                />
                <BottomTab.Screen
                    name='Publish'
                    component={Shop}
                    options={{
                        title: '发布',
                        headerShown: false
                    }}
                />
                <BottomTab.Screen
                    name='Message'
                    component={Message}
                    options={{
                        title: '消息',
                        headerShown: false
                    }}
                />
                <BottomTab.Screen
                    name='Mine'
                    component={Mine}
                    options={{
                        title: '我',
                        headerShown: false
                    }}
                />
            </BottomTab.Navigator>
        </View>
    )
}


const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
    },
    tabBarContainer: {
        width: '100%',
        height: 52,
        flexDirection: 'row',
        backgroundColor: '#ffff'
    },
    tabItem: {
        height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconTabPublish: {
        width: 48,
        height: 32,
        resizeMode: 'contain'
    }
})