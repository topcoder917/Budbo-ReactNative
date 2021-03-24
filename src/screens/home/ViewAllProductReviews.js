import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Modal from 'react-native-modalbox';
import Geolocation from '@react-native-community/geolocation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';

import HeaderBar from 'components/common/HeaderBar';
import fonts from 'config/fonts';
import colors from 'config/colors';
import SearchBar from 'components/common/SearchBar';
import RetailerItem from 'components/home/RetailerItem';
import ProductPriceSegment from 'components/home/ProductPriceSegment';
import ProductQtyPriceSegment from 'components/home/ProductQtyPriceSegment';
import RoundedButton from 'components/common/RoundedButton';
import ProductInfoCharacteristics from 'components/home/ProductInfoCharacteristics';
import AllProductReviews from 'components/home/AllProductReviews';

import constants from 'config/constants';

import {connect} from 'react-redux';
import {showCart} from 'budboRedux/actions/cartActions';
import {addProduct} from 'budboRedux/actions/cartActions';

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];

function ViewAllProductReviews(props) {
  const navigation = props.navigation;
  const {productId, rate} = props.route.params;
  const [products, setProducts] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const insets = useSafeAreaInsets();

  React.useEffect(() => {
    const url = constants.baseApiUrl + 'api/product/' + productId;
    fetch(url, {
      method: 'post',
    })
      .then((response) => response.json())
      .then((res) => {
        setProducts([res]);
      });
  }, []);
  console.log(products);

  const renderCarouselItem = ({item, index}) => {
    return (
      <View
        style={{
          borderRadius: 5,
          width: '100%',
          height: (256 * constants.screenWidth) / 375,
          shadowColor: colors.shadowColor,
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.69,
          shadowRadius: 10,
          elevation: 10,
        }}>
        <FastImage
          style={{
            width: (295 * constants.screenWidth) / 375,
            height: (256 * constants.screenWidth) / 375,
            borderRadius: 10,
          }}
          source={{
            uri:
              item.image != ''
                ? item.image
                : 'https://via.placeholder.com/150x150?text=PRODUCT',
          }}
        />
      </View>
    );
  };

  const handleCarouselFlow = (index) => {
    console.log(index);
    setActiveIndex(index);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.primaryBackgroundColor}}>
      {products.length > 0 && (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: Platform.OS == 'ios' ? insets.top : insets.top + 12,
          }}>
          <HeaderBar leftButton="back" onLeftPress={() => navigation.pop()} />

          <View
            style={{
              marginTop: 48,
              height: (256 / 375) * constants.screenWidth + 10,
            }}>
            <Carousel
              layout={'default'}
              // ref={(ref) => (this.carousel = ref)}
              firstItem={activeIndex}
              data={products}
              sliderWidth={constants.screenWidth}
              itemWidth={(295 / 375) * constants.screenWidth}
              renderItem={renderCarouselItem}
              onSnapToItem={(index) => handleCarouselFlow(index)}
            />
          </View>
          <View
            style={{
              paddingLeft: 24,
              paddingRight: 24,
              marginTop: 16,
              width: constants.screenWidth,
            }}>
            <View
              style={{
                paddingLeft: 16,
                paddingRight: 16,
                paddingBottom: 5,
                borderBottomColor: colors.greyWhite,
                borderBottomWidth: 1,
              }}>
              <Text style={styles.normalTitle}>
                {products[activeIndex].name}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  aligmItems: 'center',
                  // justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    aligmItems: 'center',
                  }}>
                  <Text style={styles.flowerText}>
                    {productCategories[products[activeIndex].category]} |
                  </Text>
                  <Text
                    style={[
                      styles.class2,
                      {
                        color: products[activeIndex].types
                          .map((type) => productTypes[type])
                          .join(' ')
                          .toLowerCase()
                          .includes('indica')
                          ? colors.indicaColor
                          : products[activeIndex].types
                              .map((type) => productTypes[type])
                              .join(' ')
                              .toLowerCase()
                              .includes('sativa')
                          ? colors.sativaColor
                          : colors.hybridColor,
                      },
                    ]}>
                    {' '}
                    {products[activeIndex].types
                      .map((type) => productTypes[type])
                      .join(' ')}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}} />
              </View>
            </View>
          </View>
          <ScrollView>
            <View
              style={{
                width: constants.screenWidth,
                paddingLeft: 24,
                paddingRight: 24,
                marginTop: 17,
              }}>
              <AllProductReviews
                navigation={navigation}
                rate={rate}
                product={products[activeIndex]}
                write={true}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const mapStateToProps = (state) => ({
  cartFlag: state.cart.cartFlag,
  cartProducts: state.cart.cartProducts,
});

const mapDispatchToProps = {
  showCart,
  addProduct,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewAllProductReviews);

const styles = StyleSheet.create({
  normalTitle: {
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
  },
  flowerText: {
    fontSize: 15,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  class2: {
    fontSize: 15,
  },
  itemText: {
    color: colors.primary,
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 3,
    paddingBottom: 2,
  },
  modalBox: {
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    height: constants.screenHeight,
    width: constants.screenWidth,
    backgroundColor: 'transparent',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    flex: 1,
    position: 'absolute',
    bottom: 130,
    backgroundColor: colors.primaryBackgroundColor,
    width: '100%',
    height: 372,
  },
});
