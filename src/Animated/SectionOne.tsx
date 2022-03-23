import React, {useEffect} from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from 'react-native-reanimated';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {width: wD, height: hD} = Dimensions.get('window');
type SectionOneProp = {};
const SectionOne = () => {
  const translate = useSharedValue({x: 0, y: 0});
  const styled = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: withRepeat(withSpring(translate.value.x), -1, true)},
        {translateY: withRepeat(withSpring(translate.value.y), -1, true)},
      ],
    };
  }, [translate]);
  return (
    <View style={[styles.container]}>
      <Animated.View style={[styles.item, styled]}></Animated.View>
      <TouchableOpacity
        onPress={() =>
          (translate.value = {
            x: (Math.random() * (1 - -1) + -1) * (wD / 2),
            y: (Math.random() * (1 - -1) + -1) * (wD / 2),
          })
        }>
        <Text>Button</Text>
      </TouchableOpacity>
    </View>
  );
};
export default SectionOne;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    borderRadius: 100,
  },
});
