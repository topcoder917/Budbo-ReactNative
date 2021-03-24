import React, {useState, useRef} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {
  NativeViewGestureHandler,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const scrollDirection = {
  none: 'none',
  up: 'up',
  down: 'down',
};

export default function MyScrollView(props) {
  const panRef = useRef();
  const listRef = useRef();
  const [currentDirection, setCurrentDirection] = useState(
    scrollDirection.none,
  );

  const handleGesture = (event) => {
    const direction = event.nativeEvent.velocityY;
    if (direction > 0) {
      setCurrentDirection(scrollDirection.down);
    }
    if (direction < 0) {
      setCurrentDirection(scrollDirection.up);
    }
  };

  return (
    <View style={styles.container}>
      <PanGestureHandler
        ref={panRef}
        simultaneousHandlers={listRef}
        onGestureEvent={handleGesture}>
        <NativeViewGestureHandler ref={listRef} simultaneousHandlers={panRef}>
          <ScrollView {...props}>{props.children}</ScrollView>
        </NativeViewGestureHandler>
      </PanGestureHandler>
      {currentDirection === scrollDirection.up && (
        <LinearGradient
          colors={['rgba(37, 45, 74, 0.9)', 'rgba(37, 45, 74, 0)']}
          style={styles.topGradient}
        />
      )}
      {currentDirection === scrollDirection.down && (
        <LinearGradient
          colors={['rgba(37, 45, 74, 0)', 'rgba(37, 45, 74, 0.9)']}
          style={styles.bottomGradient}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topGradient: {
    height: 30,
    width: '100%',
    position: 'absolute',
    zIndex: 5,
    top: 21,
  },
  bottomGradient: {
    height: 30,
    width: '100%',
    position: 'absolute',
    zIndex: 5,
    bottom: 0,
  },
});
