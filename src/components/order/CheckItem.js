import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';
import {removeProduct} from 'budboRedux/actions/cartActions';

import Count from './Count';

const removeIocn = require('assets/icons/remove.png');

function CheckItem(props) {
  const item = props.item;
  const [count, setCount] = React.useState(item.quantity);

  const handlePlus = () => {
    if (props.onChangeCount) {
      props.onChangeCount(count + 1);
    }
    setCount(count + 1);
  };

  const handleMinus = () => {
    if (count > 0) {
      props.onChangeCount(count - 1);
      setCount(count - 1);
    }
  };

  const renderRightActions = (progress, dragX) => {
    return (
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.actionButton}
          activeOpacity={0.8}
          onPress={() => props.removeProduct(item.index)}>
          <LinearGradient
            colors={[
              colors.firstGradientColor,
              colors.secondGradientColor,
              colors.thirdGradientColor,
            ]}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.actionBackground}>
            <Image style={styles.iconRemove} source={removeIocn} />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  };
  console.log(item);

  return (
    <Swipeable enabled={props.enabled} renderRightActions={renderRightActions}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.textTitle} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.rowContainer}>
            <Text style={styles.textMass}>{item.volumn}</Text>
            {item.category % 2 !== 0 && (
              <Count
                value={count}
                enabled={props.enabled}
                onPressPlus={handlePlus}
                onPressMinus={handleMinus}
              />
            )}
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.textPrice}>
              ${parseFloat(item.price).toFixed(2)}
            </Text>
            <Text style={[styles.textPrice, styles.textBudget]}>{`$${(
              item.price * count
            ).toFixed(2)}`}</Text>
          </View>
          <View style={styles.rowContainer}>
            <View style={styles.retailerLeftContainer}>
              <FastImage style={styles.retailerLogo} source={item.retailer_logo} />
              <Text style={styles.textPrice}>{item.retailer_address}</Text>
            </View>
            <Text style={[styles.textPrice, styles.textBudget]}>Time: 30 Min</Text>                  

          </View>  
        </View>
        <View style={styles.coverContainer}>
          <FastImage style={styles.imageCover} source={item.image} />
        </View>
      </View>
    </Swipeable>
  );
}

CheckItem.defaultProps = {
  style: {},
  enabled: true,
};

CheckItem.propTypes = {
  style: ViewPropTypes.style,
  enabled: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  cartProducts: state.cart.cartProducts,
});

const mapDispatchToProps = {
  removeProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckItem);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 130,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  coverContainer: {
    width: 98,
    height: 98,
    borderRadius: 6,
    position: 'absolute',
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  imageCover: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
  },
  contentContainer: {
    flex: 1,
    height: '100%',
    marginLeft: 49,
    justifyContent: 'center',
    paddingLeft: 65,
    paddingRight: 16,
    borderRadius: 6,
    backgroundColor: colors.itemBackgroundColor,
  },
  textTitle: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  textMass: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  textPrice: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  textBudget: {
    color: colors.primary,
  },
  actionContainer: {
    width: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    width: '100%',
    height: 98,
  },
  actionBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  iconRemove: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  retailerLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  retailerLogo: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    marginRight: 10
  },
});
