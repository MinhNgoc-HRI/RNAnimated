import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;
type ContextType = {
  translateX: number;
  translateY: number;
};
const GestureBasic = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      // console.log(context.translateX, context.translateY);
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      // console.log(context.translateX, context.translateY);
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event, context) => {
      const distance = Math.sqrt(translateX.value ** 2 + translateY.value ** 2);
      // console.log(context.translateX, context.translateY);
      console.log(distance < CIRCLE_RADIUS + SIZE / 2);

      if (distance < CIRCLE_RADIUS + SIZE / 2) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });
  const rStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
      ],
    };
  }, []);
  return (
    <View style={[styles.container]}>
      <View style={[styles.circle]}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.square, rStyles]} />
        </PanGestureHandler>
      </View>
    </View>
  );
};

export default GestureBasic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    backgroundColor: 'white',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 256, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
