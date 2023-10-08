import React, { useState, useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import CategoryModal, { CategoryModalRef } from "./CategoryModal";

import IconArrow from '../../../assets/icon_arrow.png';

type Props = {
    categoryList: Category[],
    allCategoryList: Category[],
    disabledModal: boolean,
    onCategoryChange: (category: Category) => void;
}

export default ({ categoryList, allCategoryList, disabledModal, onCategoryChange }: Props) => {

    const [category, setCategory] = useState<Category | null>();

    const modalRef = useRef<CategoryModalRef>(null);

    useEffect(() => {
        setCategory(categoryList.find(item => item.name === '推荐')); 
    }, [])
    
    const categoryPress = (category: Category) => {
        onCategoryChange(category);
        setCategory(category);
    }

    const styles = StyleSheet.create({
        categoryLayout: {
            width: '100%',
            height: 36,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 6,
            backgroundColor: '#fff'
        },
        scrollView: {
            flex: 1,
            // height: '100%'
        },
        openButton: {
            width: 40,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        },
        iconArrow: {
            width: 18,
            height: 18,
            transform: [
                { rotate: '-90deg' }
            ]
        },
        categoryItem: {
            width: 'auto',
            // height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 5
        },
        categoryItemText: {
            fontSize: 14,
            color: '#999'
        }
    });

    return (
        <View style={styles.categoryLayout}>
            <ScrollView
                style={styles.scrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {categoryList.map((item: Category, index: number) => {
                    return (
                        <TouchableOpacity
                            style={styles.categoryItem}
                            key={`category-${index}`}
                            onPress={() => {
                                categoryPress(item);
                            }}
                            activeOpacity={.85}
                        >
                            <Text
                                style={[styles.categoryItem, item.name === category?.name ? {fontWeight: 'bold', color: '#333'} : null]}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
            <TouchableOpacity
                style={styles.openButton}
                onPress={() => { modalRef.current?.show() }}
                disabled={disabledModal}
            >
                <Image source={IconArrow} style={styles.iconArrow} />
            </TouchableOpacity>
            <CategoryModal
                ref={modalRef}
                categoryList={allCategoryList}
            />
        </View>
    );
}