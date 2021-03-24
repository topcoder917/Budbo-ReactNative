import React from 'react';
import {View, Text, Image, SafeAreaView, StyleSheet} from 'react-native';

import GradientButton from 'components/common/GradientButton';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';
import {hp} from 'config/utils';

const logoIcon = require('assets/icons/logo.png');

export default function OnboardingFinal({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.imageLogo} source={logoIcon} />
      </View>
      <View style={styles.mainContainer}>
        <View style={styles.textsContainer}>
          <Text style={styles.textTitle}>Find Dispensaries Nearby</Text>
          <Text style={styles.textDescription}>
            {
              'With budbo you can rowse Local \nCannabis In-store or same-day delivery \navailable near you.'
            }
          </Text>
        </View>
        <GradientButton
          style={styles.getStartedButton}
          title="Get Started"
          onPress={() => navigation.navigate('SignUp')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: constants.screenWidth,
    height: constants.screenHeight,
    backgroundColor: colors.primaryBackgroundColor,
  },
  logoContainer: {
    flex: 1.2,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  imageLogo: {
    width: 178,
    height: 200,
    resizeMode: 'contain',
    marginLeft: 30,
    marginBottom: hp(7.8),
  },
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  textsContainer: {
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 24,
    lineHeight: 29,
    letterSpacing: 0.31,
    color: colors.white,
    fontFamily: fonts.sfProDisplayBold,
  },
  textDescription: {
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.41,
    color: colors.gray,
    fontFamily: fonts.sfProTextRegular,
    textAlign: 'center',
    marginTop: 17,
  },
  getStartedButton: {
    marginBottom: 58,
  },
});
