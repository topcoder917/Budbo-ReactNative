import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';

export default function OnboardingContent(props) {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottie}
        resizeMode="cover"
        source={props.lottie}
        autoPlay
        loop
      />
      <View
        style={[
          styles.contentContainer,
          {paddingBottom: 25 + constants.screenSafeAreaBottom},
        ]}>
        <Text style={styles.textTitle}>{props.subTitle}</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.textDescription}>{props.description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: constants.screenWidth,
    height: constants.screenHeight,
    backgroundColor: colors.primaryBackgroundColor,
  },
  lottie: {
    width: constants.screenWidth,
  },
  contentContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: Math.round(constants.screenHeight * 0.3),
    alignItems: 'center',
    paddingHorizontal: 21,
    paddingTop: 20,
    backgroundColor: colors.primaryBackgroundColor,
  },
  textTitle: {
    fontSize: 19,
    color: colors.white,
    fontFamily: fonts.sfProTextBold,
    textAlign: 'center',
  },
  descriptionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textDescription: {
    fontSize: 18,
    lineHeight: 24,
    color: colors.lightPurple,
    fontFamily: fonts.sfProTextRegular,
    textAlign: 'center',
  },
});
