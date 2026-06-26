import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  Easing 
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function AuroraBackground() {
  const blob1X = useSharedValue(-100);
  const blob1Y = useSharedValue(-100);
  const blob2X = useSharedValue(width);
  const blob2Y = useSharedValue(height / 2);

  useEffect(() => {
    // Blob 1 Animation
    blob1X.value = withRepeat(
      withSequence(
        withTiming(width / 2, { duration: 8000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-100, { duration: 8000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    blob1Y.value = withRepeat(
      withSequence(
        withTiming(height / 3, { duration: 10000, easing: Easing.inOut(Easing.ease) }),
        withTiming(-100, { duration: 10000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Blob 2 Animation
    blob2X.value = withRepeat(
      withSequence(
        withTiming(-100, { duration: 9000, easing: Easing.inOut(Easing.ease) }),
        withTiming(width, { duration: 9000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
    blob2Y.value = withRepeat(
      withSequence(
        withTiming(-100, { duration: 11000, easing: Easing.inOut(Easing.ease) }),
        withTiming(height / 2, { duration: 11000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );
  }, []);

  const blob1Style = useAnimatedStyle(() => ({
    transform: [{ translateX: blob1X.value }, { translateY: blob1Y.value }],
  }));

  const blob2Style = useAnimatedStyle(() => ({
    transform: [{ translateX: blob2X.value }, { translateY: blob2Y.value }],
  }));

  return (
    <View style={StyleSheet.absoluteFillObject} className="bg-zinc-950 overflow-hidden">
      {/* Background Dark Gradient to match the theme */}
      <LinearGradient
        colors={['#09090b', '#000000']}
        style={StyleSheet.absoluteFillObject}
      />
      
      {/* Aurora Blobs */}
      <Animated.View style={[styles.blob, styles.blob1, blob1Style]} />
      <Animated.View style={[styles.blob, styles.blob2, blob2Style]} />
    </View>
  );
}

const styles = StyleSheet.create({
  blob: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    opacity: 0.15,
  },
  blob1: {
    backgroundColor: '#14b8a6', // Teal 500
    top: 0,
    left: 0,
    // Note: React Native View doesn't support filter: blur, 
    // so we rely on low opacity and large border radius to simulate the glow
  },
  blob2: {
    backgroundColor: '#8b5cf6', // Violet 500
    bottom: 0,
    right: 0,
  }
});
