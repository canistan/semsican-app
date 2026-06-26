import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

export default function Marquee({ children, speed = 50, direction = 'left', style }) {
  const [contentWidth, setContentWidth] = useState(0);
  const translateX = useSharedValue(0);

  useEffect(() => {
    if (contentWidth > 0) {
      cancelAnimation(translateX);
      
      const duration = (contentWidth / speed) * 1000;
      
      if (direction === 'left') {
        translateX.value = 0;
        translateX.value = withRepeat(
          withTiming(-contentWidth, { duration, easing: Easing.linear }),
          -1, // infinite loop
          false // do not reverse, jump back to 0
        );
      } else {
        translateX.value = -contentWidth;
        translateX.value = withRepeat(
          withTiming(0, { duration, easing: Easing.linear }),
          -1,
          false
        );
      }
    }
  }, [contentWidth, speed, direction]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    flexDirection: 'row',
  }));

  return (
    <View style={[{ overflow: 'hidden' }, style]}>
      <Animated.View style={animatedStyle}>
        <View 
          onLayout={(e) => {
            if (e.nativeEvent.layout.width > 0) {
              setContentWidth(e.nativeEvent.layout.width);
            }
          }}
          style={{ flexDirection: 'row' }}
        >
          {children}
        </View>
        
        {/* Seamless kopyalar */}
        {contentWidth > 0 && (
          <>
            <View style={{ flexDirection: 'row' }}>
              {children}
            </View>
            <View style={{ flexDirection: 'row' }}>
              {children}
            </View>
          </>
        )}
      </Animated.View>
    </View>
  );
}
