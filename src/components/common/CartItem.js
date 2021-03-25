import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity, Animated} from 'react-native';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';
import InputSpinner from "react-native-input-spinner";
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LinearGradient from 'react-native-linear-gradient';

const closeIcons = require('assets/icons/cancel.png');
const removeIcon = require('assets/icons/remove.png');

export default function CartItem(props) {

  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <View style={styles.deleteBox}>
        <Animated.Text style={{transform: [{scale: scale}]}}>
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.8}
            onPress={() => props.onPress()}>
            <LinearGradient
              style={styles.buttonGradiendContainer}
              colors={[
                colors.firstGradientColor,
                colors.secondGradientColor,
                colors.thirdGradientColor,
              ]}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}>
              <Image style={styles.trashImageStyle} source={removeIcon} />
            </LinearGradient>
          </TouchableOpacity>
        </Animated.Text>
      </View>
    );
  };

  const {name, category, image, volumn, price, quantity, onRemove} = props;
  return (
    <Swipeable renderRightActions={leftSwipe}>
      <View style={styles.container}>
        <FastImage style={styles.imageCover} source={{uri: image}} />
        <View style={styles.contentContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.textTitle} numberOfLines={1}>
              {name}
            </Text>
          </View>
          <View style={styles.rowContainer}>
            <View>
              <Text style={styles.textDescription}>
                ${parseFloat(price).toFixed(2)}
              </Text>
              <Text style={styles.textDescription}>{volumn}</Text>
            </View>
          </View>
        </View>
        <View>
        <InputSpinner
          value={1}
          style={styles.spinner}
          textColor={colors.white}
          fontSize={16}
          color={colors.secondaryBackgroundColor}
          background={colors.secondaryBackgroundColor}
          width={100}
          height={40}
        />
        </View>
      </View>
    </Swipeable>
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
  qtyContainer: {
    width: 100,
    height: 40,
  },
  spinner: {
    borderRadius: 10
  },
  deleteBox: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 100,
  },
  buttonGradiendContainer: {
    width: 50,
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButton: {
    width: 50,
    height: 50
  },  
  textDeletedBtn: {
    fontSize: 14,
  }, 
  trashImageStyle: {
    width: 30,
    height: 30
  }, 
});
