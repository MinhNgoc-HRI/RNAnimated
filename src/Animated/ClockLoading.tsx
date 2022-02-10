import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Square from './components/Square';
import {
  Easing,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
const N = 12;
const SQUARE_SIZE = 12;
const ClockLoading = () => {
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withRepeat(
      withTiming(4 * Math.PI, {
        duration: 8000,
        easing: Easing.linear,
      }),
      -1,
    );
  }, [progress]);
  return (
    <View style={styles.container}>
      {new Array(N).fill(0).map((_, index) => {
        return (
          <Square
            key={Math.random().toString()}
            index={index}
            progress={progress}
          />
        );
      })}
    </View>
  );
};

export default ClockLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
