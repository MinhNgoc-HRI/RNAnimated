import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withRepeat,
} from 'react-native-reanimated';
const SIZE = 100.0;
const TransformBasic = () => {
  const progress = useSharedValue(1);
  const scale = useSharedValue(2);
  const reanimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
      transform: [
        {scale: scale.value},
        {rotate: `${progress.value * 2 * Math.PI}rad`},
      ],
      borderRadius: (progress.value * SIZE) / 2,
    };
  }, []);
  useEffect(() => {
    progress.value = withRepeat(withTiming(0.5), -1, true);
    scale.value = withRepeat(withSpring(1), -1, true);
  }, [progress, scale]);
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.icon, reanimatedStyle]}></Animated.View>
    </View>
  );
};

export default TransformBasic;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'blue',
  },
});
