import React, {useState, useEffect} from 'react';
import {StyleSheet, Animated} from 'react-native';
import PropTypes from 'prop-types';
import LottieView from 'lottie-react-native';
import SplashScreen from 'react-native-splash-screen';

import colors from 'config/colors';
import constants from 'config/constants';

const splashLottie = require('assets/lottie/splash.json');

const lottieWidth = 1242;
const lottieHeight = 2688;

export default function Splash(props) {
  const [isShowSplash, setIsShowSplash] = useState(true);
  // const fadeAnim = new Animated.Value(1);

  useEffect(() => {
    SplashScreen.hide();
    // setTimeout(() => animateFadeIn(), Platform.OS === 'ios' ? 6300 : 4100);
  }, []);

  // const animateFadeIn = () => {
  //   Animated.timing(fadeAnim, {
  //     toValue: 0,
  //     duration: 1000,
  //     useNativeDriver: false,
  //   }).start(() => {
  //     hideSplash();
  //   });
  // };

  const hideSplash = () => {
    props.onCompleted();
    setIsShowSplash(false);
  };

  if (props.isHideSplash || !isShowSplash) {
    return null;
  }

  return (
    <Animated.View style={[styles.container /* {opacity: fadeAnim} */]}>
      <LottieView
        style={styles.lottie}
        source={splashLottie}
        autoPlay
        autoSize={true}
        loop={false}
        onAnimationFinish={() => hideSplash()}
      />
    </Animated.View>
  );
}

Splash.defaultProps = {
  onCompleted: () => {},
  isHideSplash: false,
};

Splash.propTypes = {
  isHideSplash: PropTypes.bool,
  onCompleted: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 10,
    opacity: 1,
    backgroundColor: colors.primaryBackgroundColor,
  },
  lottie: {
    width: constants.screenWidth,
    height: constants.screenWidth * (lottieHeight / lottieWidth),
  },
});
