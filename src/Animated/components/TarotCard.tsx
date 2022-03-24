import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {GestureDetector, Gesture} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {transform} from '@babel/core';
export type TarotCard = {
  src: ReturnType<typeof require>;
  shuffleBack: Animated.SharedValue<boolean>;
  index: number;
};
const {width: wWidth, height} = Dimensions.get('window');

const SNAP_POINTS = [-wWidth, 0, wWidth];
const aspectRatio = 722 / 368;
const CARD_WIDTH = wWidth - 128;
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const IMAGE_WIDTH = CARD_WIDTH * 0.9;
const DURATION = 250;
export default function TarotCard({
  src,
  shuffleBack,
  index,
}: TarotCard): React.ReactElement<TarotCard> {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const offset = useSharedValue({x: 0, y: 0});
  const styled = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withSpring(x.value)},
        {translateY: withSpring(y.value)},
      ],
    };
  });
  const gesture = Gesture.Pan()
    .onStart(event => {
      offset.value = {
        x: x.value,
        y: y.value,
      };
    })
    .onUpdate(event => {
      console.log({update: event.translationX});
      x.value = offset.value.x + event.translationX;
      y.value = offset.value.y + event.translationY;
    })
    .onEnd(event => {
      if (Math.abs(x.value) < wWidth / 2) {
        x.value = withSpring(event.translationX * 2);
        y.value = y.value;
        // offset.value = {x: x.value, y: y.value};
      } else {
        offset.value = {x: x.value, y: y.value};
      }
    });

  return (
    <View style={styles.container} pointerEvents="box-none">
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styled, styles.img]}>
          <Image
            source={src}
            resizeMode={'contain'}
            style={{
              width: IMAGE_WIDTH,
              height: IMAGE_WIDTH * aspectRatio,
            }}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    backgroundColor: 'black',
  },
});
