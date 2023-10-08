import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useLocalObservable } from "mobx-react";
import { observer } from "mobx-react";
import MasonryList from '@react-native-seoul/masonry-list';
import HomeStore from "./HomeStore";
import ListImage from "../../components/ListImage";
import Heart from "../../components/Heart";
import TitleBar from "./components/TitleBar";
import CategoryList from "./components/CategoryList";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";


const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default observer(() => {
    const store = useLocalObservable(() => new HomeStore());
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        store.getCategoryList();
        refresh();
    }, [])

    const refresh = () => {
        store.requestHomeList(1);
        store.setNoMore(false);
    }

    const onArticePress = useCallback((article: ArticleInList) => () => {
        navigation.push('ArticleDetail', { id: article.id });
    }, [])

    const renderHomeListItem = ({ item, i }: { item: ArticleInList | any, i: number }) => {
        return (
            <TouchableOpacity
                style={styles.item}
                activeOpacity={.85}
                onPress={onArticePress(item)}
            >
                <ListImage uri={item.image} />
                <Text style={styles.title}>{item.title}</Text>
                <View style={styles.details}>
                    <Image source={{ uri: item.avatarUrl }} style={styles.avatar} />
                    <Text
                        style={styles.userName}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.userName}
                    </Text>
                    <TouchableOpacity
                        activeOpacity={.86}
                    >
                        <Heart value={item.isFavorite} />
                    </TouchableOpacity>
                    <Text style={styles.favoriteCount}>{item.favoriteCount}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const Footer = () => {
        return store.noMore && (
            <Text style={styles.listFooterText}>没有更多了</Text>
        )
    }

    const categoryList = store.categoryList.filter(item => item.isAdd);

    const Header = () => {
        return (
            <CategoryList
                categoryList={categoryList}
                allCategoryList={store.categoryList}
                disabledModal={store.refreshing}
                onCategoryChange={(category: Category) => {

                }}
            />
        );
    }

    return (
        <View style={styles.root}>
            <TitleBar
                tab={1}
                onTabChanged={(tabIndex: number) => {

                }}
            />
            <MasonryList
                style={styles.flatList}
                data={store.homeList}
                renderItem={renderHomeListItem}
                keyExtractor={(item: ArticleInList) => `Article-${item.id}`}
                numColumns={2}
                contentContainerStyle={styles.flatListContainer}
                refreshing={store.refreshing && store.page === 1}
                onRefresh={() => refresh()}
                onEndReachedThreshold={0.35}
                onEndReached={() => store.requestHomeList(store.page + 1)}
                ListFooterComponent={<Footer />}
                ListHeaderComponent={<Header />}
            />
        </View>
    )
})


const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0'
    },
    flatList: {
        width: '100%',
        height: '100%'
    },
    flatListContainer: {
        
    },
    item: {
        width: SCREEN_WIDTH - 18 >> 1,
        backgroundColor: '#fff',
        marginLeft: 6,
        marginBottom: 6,
        borderRadius: 8,
        overflow: 'hidden',
    },
    thumb: {
        width: '100%',
        height: 200,
        resizeMode: 'cover'
    },
    title: {
        fontSize: 14,
        // fontWeight: 'bold',
        color: '#222',
        marginHorizontal: 12,
        marginTop: 6,
        marginBottom: 10
    },
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 12,
        paddingBottom: 10
    },
    avatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        resizeMode: 'cover',
        marginRight: 4,
    },
    userName: {
        color: '#999',
        fontSize: 12,
        flex: 1,
        paddingRight: 10
    },
    favoriteIcon: {
        width: 20,
        height: 18,
        resizeMode: 'contain',
        marginRight: 4,
    },
    favoriteCount: {
        color: '#999',
        fontSize: 12,
    },
    listFooterText: {
        fontSize: 12,
        color: '#999',
        textAlign: 'center',
        marginVertical: 12
    }
})