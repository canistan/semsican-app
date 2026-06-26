import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  Easing,
} from 'react-native-reanimated';

export default function ScrollIndicator() {
  const dotPosition = useSharedValue(0);
  const dotOpacity = useSharedValue(1);

  useEffect(() => {
    dotPosition.value = withRepeat(
      withSequence(
        withTiming(15, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 0 }) // instant reset
      ),
      -1, // infinite
      false // not reverse
    );

    dotOpacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 200 }),
        withTiming(1, { duration: 800 }),
        withTiming(0, { duration: 500 })
      ),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: dotPosition.value }],
      opacity: dotOpacity.value,
    };
  });

  return (
    <View className="w-7 h-12 rounded-full border-[1.5px] border-zinc-500/50 flex items-center pt-2">
      <Animated.View
        className="w-1.5 h-1.5 rounded-full bg-teal-400 shadow-sm shadow-teal-400"
        style={animatedStyle}
      />
    </View>
  );
}
