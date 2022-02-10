import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {N, SQUARE_SIZE} from '../../constants/constants';
import {transform} from '@babel/core';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
type Squareprops = {
  index: number;
  progress: Animated.SharedValue<number>;
};
const arr = [
  '😀',
  '😃',
  '😄',
  '😁',
  '😆',
  '😅',
  '😂',
  '🤣',
  '🥲',
  '😊',
  '🧐',
  '🤓',
];
const Square = ({index, progress}: Squareprops) => {
  const offsetAngle = (2 * Math.PI) / N;
  const finalAngle = offsetAngle * (N - 1 - index);

  const rotate = useDerivedValue(() => {
    if (progress.value <= 2 * Math.PI) {
      return Math.min(finalAngle, progress.value);
    }
    if (progress.value - 2 * Math.PI < finalAngle) {
      return finalAngle;
    }
    return progress.value;
  });
  const opacity = useDerivedValue(() => {
    if (finalAngle === rotate.value) {
      return 1;
    }
    if (progress.value > 2 * Math.PI) {
      return 0;
    }
    return 0;
  });
  const translateY = useDerivedValue(() => {
    if (finalAngle === rotate.value) {
      return withSpring(-N * SQUARE_SIZE);
    }
    if (progress.value > 2 * Math.PI) {
      return withSpring((index - N) * SQUARE_SIZE);
    }
    return -index * SQUARE_SIZE;
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: !opacity.value ? 'white' : 'transparent',
      transform: [
        {rotate: `${rotate.value}rad`},
        {translateY: translateY.value},
      ],
    };
  });
  const rStyleText = useAnimatedStyle(() => {
    return {
      opacity: opacity.value ? 1 : 0,
      transform: [
        {rotate: `${rotate.value}rad`},
        {translateY: translateY.value - 30},
      ],
    };
  });
  return (
    <React.Fragment>
      <Animated.View
        key={index.toString()}
        style={[
          {
            height: SQUARE_SIZE,
            aspectRatio: 1,
            // opacity: (index + 1) / N,
            backgroundColor: 'white',
            position: 'absolute',
          },
          rStyle,
        ]}
      />
      <Animated.Text
        key={index.toString()}
        style={[
          {
            fontSize: 40,
            color: 'white',
            // height: SQUARE_SIZE + 4,
            // aspectRatio: 1,
            // opacity: (index + 1) / N,
            // backgroundColor: 'white',
            position: 'absolute',
          },
          rStyleText,
        ]}>
        {arr[SQUARE_SIZE - index - 1]}
      </Animated.Text>
    </React.Fragment>
  );
};

export default Square;

const styles = StyleSheet.create({});
