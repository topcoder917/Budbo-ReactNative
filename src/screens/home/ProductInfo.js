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
import ProductInfoReviews from 'components/home/ProductInfoReviews';

import constants from 'config/constants';
import {getDistance} from 'config/utils';

import {connect} from 'react-redux';
import {showCart} from 'budboRedux/actions/cartActions';
import {addProduct, setProducts} from 'budboRedux/actions/cartActions';

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];

function ProductInfo(props) {
  const navigation = props.navigation;
  const {productId, products, retailer} = props.route.params;
  const [activeIndex, setActiveIndex] = React.useState(
    products.map((product) => product.id).indexOf(productId),
  );
  const [distance, setDistance] = React.useState(0);
  const [priceIndex, setPriceIndex] = React.useState(
    products.filter((product) => {
      return product.id == productId;
    })[0].category %
      2 ==
      0
      ? 3
      : 0,
  );
  const [quantity, setQuantity] = React.useState(1);

  const insets = useSafeAreaInsets();
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

  React.useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      const currentLatitude = info.coords.latitude;
      const currentLongitude = info.coords.longitude;
      setDistance(
        getDistance(
          currentLatitude,
          currentLongitude,
          retailer.location.latitude,
          retailer.location.longitude,
        ),
      );
    });
  }, []);

  const handleCarouselFlow = (index) => {
    console.log(index);
    setActiveIndex(index);
    setPriceIndex(products[index].category % 2 == 0 ? 3 : 0);
    setQuantity(1);
  };

  const isValidCharacteristics = (attributes) => {
    let values = Object.values(attributes);
    if (
      values.filter((value) => {
        return value > 0;
      }).length > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  const addCart = () => {
    let current = Object.assign({}, products[activeIndex]);
    current.quantity = quantity;
    current.priceIndex = priceIndex;
    current.retailer = retailer;
    const ids = props.cartProducts.map((product) => product.id);
    if (ids.includes(current.id) && current.category % 2 != 0) {
      let cartProds = props.cartProducts.map((product) => {
        if (product.id == current.id) {
          product.quantity += current.quantity;
        }
        return product;
      });
      props.setProducts(cartProds);
    } else {
      props.addProduct(current);
    }
    props.showCart(true);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.primaryBackgroundColor}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: Platform.OS == 'ios' ? insets.top : insets.top + 12,
        }}>
        <HeaderBar leftButton="back" onLeftPress={() => navigation.pop()} />
        <View
          style={{
            marginTop: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingLeft: 40,
            paddingRight: 40,
            marginBottom: 11,
            width: constants.screenWidth,
          }}>
          <Text style={styles.normalTitle}>{retailer.name}</Text>
          {!!distance && (
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.sfProTextRegular,
                color: colors.greyWhite,
              }}>
              {distance.toFixed(1)} mi
            </Text>
          )}
        </View>
        <View
          style={{
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
            onSnapToItem={(index) => {
              handleCarouselFlow(index);
            }}
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
            <Text style={styles.normalTitle}>{products[activeIndex].name}</Text>

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
                  {productCategories[products[activeIndex].category]}
                </Text>
                {products[activeIndex].types.length > 0 && (
                  <Text style={styles.flowerText}> | </Text>
                )}
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
                  {products[activeIndex].types
                    .map((type) => productTypes[type])
                    .join(' ')}
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  style={{width: 15, height: 15}}
                  source={require('assets/icons/star_outline.png')}
                />
                <Text style={[styles.flowerText, {marginLeft: 4}]}>
                  {products[activeIndex].rate > 0
                    ? products[activeIndex].rate
                    : ''}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <ScrollView>
          <View
            style={{
              paddingLeft: 24,
              paddingRight: 24,
              // marginTop: 16,
            }}>
            <View style={{paddingLeft: 16, paddingRight: 16, paddingTop: 11}}>
              <Text
                style={{
                  ...styles.flowerText,
                  lineHeight: (18 * constants.screenWidth) / 375,
                  fontSize: (15 * constants.screenWidth) / 375,
                }}>
                {products[activeIndex].description}
              </Text>
            </View>
          </View>
          {products[activeIndex].category % 2 == 0 ? (
            <ProductPriceSegment
              prices={products[activeIndex].prices}
              handlePriceIndex={setPriceIndex}
            />
          ) : (
            <ProductQtyPriceSegment
              price={products[activeIndex].prices[0]}
              handleQuantity={setQuantity}
            />
          )}

          <View
            style={{
              marginTop: 24,
              width: constants.screenWidth,
              alignItems: 'center',
            }}>
            <RoundedButton
              style={styles.addCartButton}
              textStyle={styles.textAddCart}
              title="Add to Cart"
              onPress={addCart}
            />
          </View>
          {isValidCharacteristics(products[activeIndex].attributes) && (
            <View
              style={{
                width: constants.screenWidth,
                paddingLeft: 24,
                paddingRight: 24,
                marginTop: 29,
              }}>
              <ProductInfoCharacteristics
                attributes={products[activeIndex].attributes}
              />
            </View>
          )}
          <View
            style={{
              width: constants.screenWidth,
              paddingLeft: 24,
              paddingRight: 24,
              marginTop: 29,
            }}>
            <ProductInfoReviews
              navigation={navigation}
              product={products[activeIndex]}
              write={true}
            />
          </View>
        </ScrollView>
      </View>
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
  setProducts,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductInfo);

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
  addCartButton: {
    width: constants.screenWidth - 64,
    height: 50,
    borderRadius: 25,
  },
  textAddCart: {
    fontSize: 16,
  },
});
