import React, {useState, useRef} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';

import OnboardingContent from './OnboardingContent';
 import OnboardingFinal from './OnboardingFinal';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';

import purpleImage from 'assets/icons/budbo_purple.png';
import whiteImage from 'assets/icons/budbo_white.png';

const onboardingData = [
  {
    lottie: require('assets/lottie/onboarding1.json'),
    subTitle: 'Discovery, Delivery, Wallet',
    description: 'Simple, fast, intuitive. Together, we pioneer the future.',
  },
  {
    lottie: require('assets/lottie/onboarding2.json'),
    subTitle: 'Unlock the Potential of Cannabis',
    description:
      'AI driven product matching to assist in discovering the correct strain to fit your ailment or mood.',
  },
  {
    lottie: require('assets/lottie/onboarding3.json'),
    subTitle: 'Safe and Simple Ordering',
    description:
      'Hassle-free delivery, or in-store pick up options available for medical patients and recreational users.',
  },
  {
    lottie: require('assets/lottie/onboarding4.json'),
    subTitle: 'The Most Advanced Application',
    description:
      'Blockchain powered cryptocurrency wallet allows you to earn and spend.',
  },
];

function Onboarding(props) {
  const navigation = props.navigation;
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      swiperRef.current.scrollBy(currentIndex + 1);
      
      return;
    }
    navigation.navigate('SignUp');
  };

  const renderButtons = () => {
    return (
      <TouchableOpacity
        style={[styles.buttonContainer, {top: constants.screenSafeAreaTop}]}
        activeOpacity={0.8}
        onPress={() => handleNext()}>
        <Text style={styles.textNext}>
          {currentIndex < onboardingData.length - 1 ? 'Next' : 'Get Started'}
        </Text>
      </TouchableOpacity>
    );
  };

  let paginationStyle = {
    bottom: 10 + constants.screenSafeAreaBottom,
  };

  return (
    <View style={styles.container}>
      <Swiper
        ref={swiperRef}
        loop={false}
        index={0}
        showsPagination={true}
        paginationStyle={paginationStyle}
        dot={<Image style={styles.dot} source={whiteImage} />}
        activeDot={<Image style={styles.activeDot} source={purpleImage} />}
        onIndexChanged={(index) => setCurrentIndex(index)}>
        <OnboardingContent {...onboardingData[0]} />
        <OnboardingContent {...onboardingData[1]} />
        <OnboardingContent {...onboardingData[2]} />
        <OnboardingContent {...onboardingData[3]} />
        {/* <OnboardingFinal navigation={navigation} /> */}
      </Swiper>
      {/* {renderButtons()} */}
    </View>
  );
}

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
  },
  dot: {
    width: 10,
    height: 10,
    marginLeft: 3,
    marginRight: 3,
    opacity: 0.2,
  },
  activeDot: {
    width: 10,
    height: 10,
    marginLeft: 3,
    marginRight: 3,
  },
  buttonContainer: {
    position: 'absolute',
    right: 0,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  textNext: {
    fontSize: 20,
    color: colors.white,
    fontFamily: fonts.sfProTextLight,
  },
});
