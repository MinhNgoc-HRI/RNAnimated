import {StyleSheet} from 'react-native';
import React from 'react';
import Animation, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import Card from './components/Card';
const WORLD = ['Whats', 'up', 'mobile', 'dev'];

const ScrollViewBasic = () => {
  const translateX = useSharedValue<number>(0);
  const scrollHandler = useAnimatedScrollHandler((event, context) => {
    translateX.value = event.contentOffset.x;
  });
  return (
    <Animation.ScrollView
      scrollEventThrottle={1}
      horizontal
      style={styles.container}
      onScroll={scrollHandler}>
      {WORLD.map((title, index) => {
        return (
          <Card
            key={index.toString()}
            title={title}
            index={index}
            translateX={translateX}
          />
        );
      })}
    </Animation.ScrollView>
  );
};

export default ScrollViewBasic;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
