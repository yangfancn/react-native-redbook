import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from "react";
import { View, Modal, Text, Image, TouchableOpacity, StyleSheet, StatusBar, Dimensions, LayoutAnimation } from "react-native";
import { save } from "../../../utils/Storage";

import IconArrow from '../../../assets/icon_arrow.png';
import IconDelete from '../../../assets/icon_delete.png';

type Props = {
    categoryList: Category[]
}

export interface CategoryModalRef {
    show: () => void,
    hide: () => void,
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export default forwardRef((props: Props, ref) => {
    
    const { categoryList } = props;

    const [visible, setVisible] = useState<boolean>(false);
    const [myList, setMylist] = useState<Category[]>([]);
    const [recommendList, setRecommendlist] = useState<Category[]>([]);
    const [editStatus, setEditStatus] = useState<boolean>(false);

    useEffect(() => {
        if (!categoryList) {
            return;
        }
        setMylist(categoryList.filter(item => item.isAdd));
        setRecommendlist(categoryList.filter(item => !item.isAdd));
    }, [categoryList]);

    const hide = () => {
        setVisible(false);
    };

    const show = () => {
        setVisible(true);
    };

    useImperativeHandle(ref, () => {
        return {
            show,
            hide
        };
    });

    const myCategoryItemPress = useCallback((item: Category, index: number) => {
        LayoutAnimation.easeInEaseOut();
        setMylist(myList.filter(i => i.name !== item.name));
        setRecommendlist([...recommendList, {...item, isAdd: false}]);
    }, [editStatus, myList, recommendList]);


    const recommendCategoryItemPress = useCallback((item: Category, index: number) => {
        LayoutAnimation.easeInEaseOut();
        setRecommendlist(recommendList.filter(i => i.name !== item.name));
        setMylist([...myList, { ...item, isAdd: true }]);
    }, [editStatus, myList, recommendList]);

    const renderMyList = () => {
        return (
            <>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>我的频道</Text>
                    <Text style={styles.subTitleText}>点击进入频道</Text>
                    <TouchableOpacity
                        style={styles.editButton}
                        onPress={() => {
                            setEditStatus((status => {
                                if (status) {
                                    save('categoryList', JSON.stringify([...myList, ...recommendList]));
                                    return false;
                                }
                                return true;
                            }))
                        }}
                    >
                        <Text style={styles.editButtonText}>{editStatus ? '完成编辑' : '进入编辑'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.collapseButton}
                        onPress={hide}
                    >
                        <Image source={IconArrow} style={styles.collapseButtonImage} />
                    </TouchableOpacity>
                </View>
                <View style={styles.listContent}>
                    {myList.map((item: Category, index: number) => {
                        return (
                            <TouchableOpacity
                                style={[styles.categoryItem, item.default ? { backgroundColor: '#eee' } : null]}
                                key={`${item.name}`}
                                onPress={() => {
                                    myCategoryItemPress(item, index);
                                }}
                                disabled={item.default || !editStatus}
                            >
                                <Text style={styles.categoryText}>{item.name}</Text>
                                {editStatus && !item.default && <Image source={IconDelete} style={styles.iconDelete} />}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </>
        );
    }

    const renderRecommendList = () => {
        return (
            <>
                <View style={[styles.titleContainer, { marginTop: 20 }]}>
                    <Text style={styles.titleText}>推荐频道</Text>
                    <Text style={styles.subTitleText}>点击添加频道</Text>
                </View>
                <View style={styles.listContent}>
                    {recommendList.map((item: Category, index: number) => {
                        return (
                            <TouchableOpacity
                                style={styles.categoryItem}
                                key={`${item.name}`}
                                onPress={() => {
                                    recommendCategoryItemPress(item, index);
                                }}
                                disabled={!editStatus}
                            >
                                <Text style={styles.categoryText}>+ {item.name}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </>
        );
    }

    return (
        <Modal
            transparent={true}
            visible={visible}
            statusBarTranslucent={true}
            animationType="fade"
            onRequestClose={hide}
        >
            <View style={styles.root}>
                <View style={styles.content}>
                    {renderMyList()}
                    {renderRecommendList()}
                </View>
                <View style={styles.mask} />
            </View>
        </Modal>
    )
})

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
    },
    content: {
        width: '100%',
        height: '80%',
        backgroundColor: '#fff',
        marginTop: 48 + (StatusBar.currentHeight || 0)
    },
    mask: {
        flex: 1,
        backgroundColor: '#00000060'
    },
    titleContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 14,
        color: '#333'
    },
    subTitleText: {
        flex: 1,
        fontSize: 12,
        color: '#999',
        marginLeft: 12
    },
    editButton: {
        paddingHorizontal: 12,
        height: 28,
        backgroundColor: '#eee',
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center'
    },
    editButtonText: {
        fontSize: 12,
        color: '#0a1b7b'
    },
    collapseButton: {
        padding: 12,
    },
    collapseButtonImage: {
        width: 16,
        height: 16,
        transform: [
            { rotate: '90deg' }
        ]
    },
    listContent: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryItem: {
        width: (SCREEN_WIDTH - 70) / 4,
        height: 32,
        marginLeft: 14,
        marginTop: 12,
        borderColor: '#eee',
        borderWidth: 1,
        borderStyle: 'solid',
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    categoryText: {
        fontSize: 14,
        color: '#666'
    },
    iconDelete: {
        position: 'absolute',
        right: -7,
        top: -7,
        width: 14,
        height: 14,
        tintColor: '#ff2442'
    }
})