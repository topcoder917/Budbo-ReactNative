import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

import colors from 'config/colors';
import fonts from 'config/fonts';

const cardImage = require('assets/imgs/order/card.png');

export default function WalletCard(props) {
  return (
    <View style={styles.container}>
      <Image style={styles.backgroundContainer} source={cardImage} />
      <View style={styles.contentContainer}>
        <View>
          <Text style={styles.textTitle}>Bubdo (Bubo) Wallet</Text>
          <Text style={styles.textValue}>Ab98340lxjad873HCdx</Text>
        </View>
        <View>
          <Text style={styles.textTitle}>Balance</Text>
          <Text style={[styles.textValue, styles.textRight]}>3200.419</Text>
          <Text style={[styles.textDescription, styles.textRight]}>
            Budbo Tokens(BUBO)
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 211,
    marginHorizontal: 16,
    justifyContent: 'flex-end',
  },
  backgroundContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 11,
    paddingBottom: 10,
  },
  textTitle: {
    fontSize: 10,
    lineHeight: 22,
    fontFamily: fonts.andaleMono,
    color: colors.soft,
    opacity: 0.6,
    textTransform: 'uppercase',
  },
  textValue: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: fonts.andaleMono,
    color: colors.soft,
    textTransform: 'uppercase',
  },
  textDescription: {
    fontSize: 7,
    lineHeight: 22,
    fontFamily: fonts.andaleMono,
    color: colors.soft,
    opacity: 0.6,
    textTransform: 'uppercase',
  },
  textRight: {
    textAlign: 'right',
  },
});
