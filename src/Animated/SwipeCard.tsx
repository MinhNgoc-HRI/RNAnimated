import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Animated, {useSharedValue} from 'react-native-reanimated';
import TarotCard from './components/TarotCard';
const dataArr = [
  {
    src: require('../assets/chariot.png'),
  },
  {
    src: require('../assets/death.png'),
  },
  {
    src: require('../assets/devil.png'),
  },
  {
    src: require('../assets/fool.png'),
  },
];
export default function SwipeCard(): React.ReactElement {
  const shuffleBack = useSharedValue(false);
  const [data, setData] = useState(dataArr);
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TarotCard
          src={item.src}
          shuffleBack={shuffleBack}
          index={index}
          key={index}
        />
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
});
function useCallBack(arg0: (key: number) => void) {
  throw new Error('Function not implemented.');
}
