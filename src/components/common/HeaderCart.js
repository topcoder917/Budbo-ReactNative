import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Badge} from 'react-native-elements';

import colors from 'config/colors';

import {connect} from 'react-redux';
import {showCart} from 'budboRedux/actions/cartActions';

const cartIcon = require('assets/icons/cart.png');

function HeaderCart(props) {
  const disabled = !props.cartProducts || props.cartProducts.length === 0;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      disabled={disabled}
      onPress={() => props.showCart(!props.cartFlag)}>
      <Image
        style={[
          styles.iconCart,
          {tintColor: disabled ? colors.greyWhite : colors.soft},
        ]}
        source={cartIcon}
      />
      {props.cartProducts.length > 0 && (
        <Badge
          value={props.cartProducts.length}
          containerStyle={styles.badgeContainer}
          badgeStyle={{backgroundColor: colors.primary}}
        />
      )}
    </TouchableOpacity>
  );
}

HeaderCart.defaultProps = {
  cartFlag: false,
  cartProducts: [],
};

HeaderCart.propTypes = {
  cartProducts: PropTypes.array,
  cartFlag: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  cartFlag: state.cart.cartFlag,
  cartProducts: state.cart.cartProducts,
});

const mapDispatchToProps = {
  showCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderCart);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCart: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  badgeContainer: {
    position: 'absolute',
    top: 0,
    right: 14,
  },
});
