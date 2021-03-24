/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Animated, ViewPropTypes, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';

const loadingImage = require('assets/lottie/loading.json');

export default function LoadingIndicator(props) {
  const {isLoading, style} = props;
  const [showLoading, setShowLoading] = useState(false);

  const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    if (!isLoading) {
      animatedFadeIn();
    } else {
      fadeAnim.setValue(1);
      setShowLoading(true);
    }
  }, [isLoading]);

  const animatedFadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowLoading(false);
    });
  };

  if (!showLoading) {
    return null;
  }
  return (
    <Animated.View style={[styles.container, style, {opacity: fadeAnim}]}>
      <LottieView
        style={styles.lottieContainer}
        source={loadingImage}
        autoPlay
        loop={true}
      />
    </Animated.View>
  );
}

LoadingIndicator.defaultProps = {
  style: {},
  isLoading: false,
};

LoadingIndicator.propTypes = {
  style: ViewPropTypes.style,
  isLoading: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(37, 45, 74, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  lottieContainer: {
    width: 150,
  },
});
