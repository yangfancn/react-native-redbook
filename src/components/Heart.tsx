import React, { useEffect, useState, useRef } from "react";
import { Image, StyleSheet, TouchableOpacity, Animated } from "react-native";

import IconFavoriteNormal from '../assets/icon_heart_empty.png';
import IconFavoriteSelected from '../assets/icon_heart.png';

type Props = {
    value: boolean,
    size?: number,
    onValueChange?: (value: boolean) => void
}


export default (props: Props) => {
    const { value, onValueChange } = props;
    let { size } = props;

    if (!size) {
        size = 20;
    }

    const [favorite, setFavorite] = useState<boolean>(false);

    const scale = useRef<Animated.Value>(new Animated.Value(0)).current;
    const opacity = useRef<Animated.Value>(new Animated.Value(0)).current;

    useEffect(() => {
        setFavorite(value);
    }, [value]);

    const onPress = () => {
        const newValue = !favorite;
        setFavorite(newValue);
        onValueChange?.(newValue);

        if (newValue) {
            opacity.setValue(1);

            const scaleAnimate = Animated.timing(scale, {
                duration: 300,
                toValue: 1.75,
                useNativeDriver: false
            });

            const opacityAnimate = Animated.timing(opacity, {
                toValue: 0,
                duration: 300,
                delay: 100,
                useNativeDriver: false
            });

            Animated.parallel([scaleAnimate, opacityAnimate]).start();
        } else {
            scale.setValue(0);
            opacity.setValue(0);
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={.85}
            onPress={onPress}
            style={styles.container}
        >
            <Image
                source={favorite ? IconFavoriteSelected : IconFavoriteNormal}
                style={[styles.image, {
                    width: size,
                    height: size
                }]}
            />
            <Animated.View style={{ 
                width: size,
                height: size,
                position: 'absolute',
                borderWidth: size / 10,
                borderRadius: size / 2,
                borderColor: '#ff2442',
                transform: [
                    {scale: scale}
                ],
                opacity: opacity
             }} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    image: {
        resizeMode: 'contain',
        marginRight: 4,
    },
    container: {
        position: 'relative'
    },
})