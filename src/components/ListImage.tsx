import React, { useEffect, useState } from "react";
import { Image, Dimensions } from "react-native";

type Props = {
    uri: string
}

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = SCREEN_WIDTH - 18 >> 1;

export default ({ uri }: Props) => {
    const [height, setHeight] = useState<number>(200);

    useEffect(() => {
        Image.getSize(uri, (width: number, height: number) => {
            setHeight(IMAGE_WIDTH * height / width);
        }, () => setHeight(200))
    }, [uri]);

    return (
        <Image
            source={{ uri: uri }}
            style={{
                width: IMAGE_WIDTH,
                height: height,
                resizeMode: 'cover'
            }}
        />
    );
}