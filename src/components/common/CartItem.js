import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';

const closeIcons = require('assets/icons/cancel.png');

export default function CartItem(props) {
  const {name, category, image, volumn, price, quantity, onRemove} = props;
  return (
    <View style={styles.container}>
      <FastImage style={styles.imageCover} source={{uri: image}} />
      <View style={styles.contentContainer}>
        <View style={styles.rowContainer}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {name}
          </Text>
          <TouchableOpacity
            style={styles.closeButton}
            activeOpacity={0.8}
            onPress={() => onRemove()}>
            <Image style={styles.iconClose} source={closeIcons} />
          </TouchableOpacity>
        </View>
        <View style={styles.rowContainer}>
          <View>
            <Text style={styles.textDescription}>
              ${parseFloat(price).toFixed(2)}
            </Text>
            <Text style={styles.textDescription}>{volumn}</Text>
          </View>
          {/* <View>
            <Text style={styles.textDescription}>
              {category % 2 !== 0 ? `Qty: ${quantity}` : ''}
            </Text>
            <Text style={styles.textPrice}>
              ${(price * quantity).toFixed(2)}
            </Text>
          </View> */}
        </View>
      </View>
    </View>
  );
}

CartItem.defaultProps = {
  onRemove: () => {},
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  volumn: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  onRemove: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 11,
    backgroundColor: '#1D263F',
    borderRadius: 20,
    marginBottom: 15,
    
  },
  imageCover: {
    width: 64,
    height: 64,
    borderRadius: 6,
  },
  contentContainer: {
    flex: 1,
    paddingLeft: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textTitle: {
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
    width: '80%',
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconClose: {
    width: 24,
    height: 24,
  },
  textDescription: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  textPrice: {
    fontSize: 12,
    fontFamily: fonts.sfProTextBold,
    color: colors.primary,
  },
});
