import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Modal from 'react-native-modalbox';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';

import CartItem from 'components/common/CartItem';
import GradientButton from 'components/common/GradientButton';

import {showCart, removeProduct} from 'budboRedux/actions/cartActions';
import { ScrollView } from 'react-native-gesture-handler';

function CheckOutModal(props) {
  const navigation = props.navigation;
  const tabBarHeight = Math.round(useBottomTabBarHeight());

  const handleOpenCart = () => {
    if (!props.cartProducts || props.cartProducts.length === 0) {
      return;
    }

    props.showCart(false);
    navigation.navigate('OrderScreens');
  };

  const renderCartItem = ({item, index}) => {
    const data = {
      ...item,
      volumn: constants.productVolumns[item.priceIndex],
      price: item.prices[item.priceIndex],
    };

    return <CartItem {...data} onRemove={() => props.removeProduct(index)} />;
  };

  if (!props.cartProducts || props.cartProducts.length === 0) {
    return null;
  }

  return (
    <Modal
      style={[
        styles.modalContainer,
        {marginBottom: tabBarHeight + constants.screenSafeAreaBottom},
      ]}
      entry="bottom"
      position="bottom"
      easing={null}
      animationDuration={300}
      isOpen={props.cartFlag}
      onClosed={() => props.showCart(false)}>
      <View style={styles.modalContentContainer}>
        <View style={styles.header}>
          <Text style={styles.textTitle}>Cart</Text>
          {/* <GradientButton
            style={styles.checkoutButton}
            textStyle={styles.textCheckout}
            title="Check Out"
            onPress={() => handleOpenCart()}
          /> */}
        </View>
        <ScrollView>
          <View onStartShouldSetResponder={()=> true}>
            <FlatList
              contentContainerStyle={styles.listContentContainer}
              data={props.cartProducts}
              scrollEnabled={true}
              renderItem={renderCartItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

CheckOutModal.defaultProps = {
  cartFlag: false,
  showCart: () => {},
  removeProduct: () => {},
};

CheckOutModal.propTypes = {
  cartProducts: PropTypes.array.isRequired,
  cartFlag: PropTypes.bool,
  showCart: PropTypes.func,
  removeProduct: PropTypes.func,
};

const mapStateToProps = (state) => ({
  cartFlag: state.cart.cartFlag,
  cartProducts: state.cart.cartProducts,
});

const mapDispatchToProps = {
  showCart,
  removeProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOutModal);

const styles = StyleSheet.create({
  modalContainer: {
    width: '100%',
    height: 400,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.primaryBackgroundColor,
  },
  modalContentContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 25,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.greyWhite,
  },
  textTitle: {
    fontSize: 16,
    fontFamily: fonts.CartItem,
    color: colors.soft,
  },
  textCheckout: {
    fontSize: 16,
  },
  listContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  checkoutButton: {
    width: 140,
    height: 22,
    borderRadius: 12,
  },
});
