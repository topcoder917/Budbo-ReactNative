import React from 'react';
import {View, StyleSheet, ViewPropTypes} from 'react-native';
import LottieView from 'lottie-react-native';

const owlImage = require('assets/lottie/owl.json');

export default function OwlLottie(props) {
  return (
    <View style={[styles.container, props.style]}>
      <LottieView
        style={[styles.lottieOwl, props.owlStyle]}
        source={owlImage}
        autoPlay
        loop={true}
      />
    </View>
  );
}

OwlLottie.defaultProps = {
  style: {},
  owlStyle: {},
};

OwlLottie.propTypes = {
  style: ViewPropTypes.style,
  owlStyle: ViewPropTypes.style,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 15,
    bottom: 0,
    transform: [{scaleX: -1}],
  },
  lottieOwl: {
    width: 130,
    height: 130,
  },
});
