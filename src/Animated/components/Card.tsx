import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  log,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {transform} from '@babel/core';
const {width, height} = Dimensions.get('window');
type CardProps = {
  title: string;
  index: number;
  translateX: Animated.SharedValue<number>;
};
const SIZE = width * 0.7;
const Card = ({title, index, translateX}: CardProps) => {
  const range = [(index - 1) * width, index * width, (index + 1) * width];
  const rStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      translateX.value,
      range,
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    const borderRadius = interpolate(
      translateX.value,
      range,
      [0, SIZE / 2, 0],
      Extrapolate.CLAMP,
    );
    return {
      transform: [{scale: scale}],
      borderRadius: borderRadius,
    };
  });
  const rStyleText = useAnimatedStyle(() => {
    const translateY = interpolate(translateX.value, range, [
      width / 2,
      0,
      -width / 2,
    ]);
    const opacity = interpolate(translateX.value, range, [-2, 1, -2]);
    return {
      transform: [{translateY: translateY}],
      opacity: opacity,
    };
  });
  const rStyleTextContent = useAnimatedStyle(() => {
    const fontSize = interpolate(translateX.value, range, [12, 50, 12]);
    return {
      fontSize: fontSize,
    };
  });
  return (
    <View
      style={[styles.card, {backgroundColor: `rgba(0,0,256,0.${index + 2})`}]}>
      <Animated.View style={[styles.square, rStyles]} />
      <Animated.View style={[{position: 'absolute'}, rStyleText]}>
        <Animated.Text style={[styles.text, rStyleTextContent]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.4)',
  },
  text: {
    // fontSize: 70,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: '700',
  },
});
