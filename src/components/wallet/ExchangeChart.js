import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import FastImage from 'react-native-fast-image';
// import {WebView} from 'react-native-webview';

import colors from 'config/colors';
import constants from 'config/constants';

export default function ExchangeChart(props) {
  return (
    <View style={styles.container}>
      <FastImage
        style={styles.imageChart}
        source={{uri: constants.defaultChart}}
        resizeMode={FastImage.resizeMode.contain}
      />
      {/* <WebView
        source={{
          baseUrl:
            Platform.OS === 'android'
              ? 'file:///android_asset/charting_library/index.html'
              : 'assets/charting_library/index.html',
        }}
        originWhitelist={['*']}
        allowUniversalAccessFromFileURLs={true}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Math.round(constants.screenWidth - 32),
    height: Math.round((constants.screenWidth - 32) * 0.75),
    marginHorizontal: 16,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryBackgroundColor,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  imageChart: {
    width: '100%',
    height: '100%',
  },
});
