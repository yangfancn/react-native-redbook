import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ScrollView, Dimensions } from 'react-native';
import ArticleDetailStore from './ArticleDetailStore';
import { observer, useLocalObservable } from "mobx-react";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from '@react-navigation/stack';
import Carousel from 'react-native-reanimated-carousel';

import IconArrow from '../../assets/icon_arrow.png';
import IconShare from '../../assets/icon_share.png';


type RouteParams = {
    ArticleDetail: {
        id: number
    }
};

export default observer(() => {

    const store = useLocalObservable(() => new ArticleDetailStore);
    const { params } = useRoute<RouteProp<RouteParams, 'ArticleDetail'>>();
    const navigation = useNavigation<StackNavigationProp<any>>();

    useEffect(() => {
        store.requestArticleDetail(params.id);
    }, []);

    const renderTitle = () => {
        return (
            <View style={styles.titleLayout}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                >
                    <Image source={IconArrow} style={styles.titleBack} />
                </TouchableOpacity>
                <Image source={{ uri: store.detail.avatarUrl }} style={styles.titleAvatar} />
                <Text style={styles.titleUsername}>{store.detail.userName}</Text>
                <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followButtonText}>+ 关注</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={IconShare} style={styles.titleShare} />
                </TouchableOpacity>
            </View>
        )
    }

    const width = Dimensions.get('window').width;
    const renderImages = () => {
        const { images } = store.detail;
        if (!images?.length) {
            return null;
        }
        return (
            <View>
                <Carousel
                    loop
                    width={width}
                    height={width / 2}
                    autoPlay={true}
                    data={[...new Array(6).keys()]}
                    scrollAnimationDuration={1000}
                    renderItem={({ index }) => (
                        <View>
                            <Text>{index}</Text>
                        </View>
                    )}
                />
            </View>
        );
    }

    return (
        <View style={styles.root}>
            {store.loading && <ActivityIndicator size={'large'} animating={store.loading} style={{ marginTop: 120 }} />}
            {Object.keys(store.detail).length > 0 && (<>
                {renderTitle()}
                <ScrollView
                    style={styles.content}
                    showsVerticalScrollIndicator={false}
                >

                </ScrollView>
            </>)}
        </View>
    );

})

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: '#ffffff'
    },
    titleLayout: {
        width: "100%",
        height: 56,
        flexDirection: "row",
        alignItems: 'center',
        paddingHorizontal: 10
    },
    titleBack: {
        width: 20,
        height: 20,
        objectFit: 'contain',
        tintColor: '#666',
        marginRight: 12,
    },
    titleAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
        objectFit: 'cover',
        marginRight: 10
    },
    titleUsername: {
        fontSize: 15,
        color: '#222',
        marginRight: 'auto',
        fontWeight: '500'
    },
    followButton: {
        borderWidth: .5,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        borderStyle: 'solid',
        borderColor: '#ff4521',
        marginRight: 14
    },
    followButtonText: {
        fontSize: 12,
        color: '#ff4521'
    },
    titleShare: {
        width: 24,
        height: 24,
        objectFit: 'cover',
        tintColor: '#666'
    },
    content: {
        flex: 1,
        backgroundColor: 'green'
    }
})