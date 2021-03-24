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

import {connect} from 'react-redux';
import {showCart} from 'budboRedux/actions/cartActions';
import {addProduct} from 'budboRedux/actions/cartActions';

const POPULAR_DATA = [
  {
    id: 'popular1',
    name: 'Cannatonic',
    image: require('assets/imgs/home/cannatonic_popular.png'),
    class1: 'Flower',
    class2: 'Hybrid',
    volumn: '1/8oz',
    price: '30.00',
  },
  {
    id: 'popular2',
    name: 'Grape Ape',
    image: require('assets/imgs/home/grapeape_popular.png'),
    class1: 'Flower',
    class2: 'Indica',
    volumn: '1/8oz',
    price: '30.00',
  },
  {
    id: 'popular3',
    name: 'Space Queen',
    image: require('assets/imgs/home/spacequeen_popular.png'),
    class1: 'Flower',
    class2: 'Sativa Hybrid',
    volumn: '1/8oz',
    price: '30.00',
  },
  {
    id: 'popular4',
    name: 'Blackberry Kush',
    image: require('assets/imgs/home/blackberrykush_popular.png'),
    class1: 'Flower',
    class2: 'indica Hybrid',
    volumn: '1/8oz',
    price: '30.00',
  },
  {
    id: 'popular5',
    name: 'Green Crack',
    image: require('assets/imgs/home/greencrack_popular.png'),
    class1: 'Flower',
    class2: 'Sativa',
    volumn: '1/8oz',
    price: '30.00',
  },
];

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];

function BrandProductInfo(props) {
  const navigation = props.navigation;
  const {productId, products, brand} = props.route.params;
  const [activeIndex, setActiveIndex] = React.useState(
    products.map((product) => product.id).indexOf(productId),
  );
  const [distance, setDistance] = React.useState(0);
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

  //   React.useEffect(() => {
  //     Geolocation.getCurrentPosition((info) => {
  //       const currentLatitude = info.coords.latitude;
  //       const currentLongitude = info.coords.longitude;
  //       setDistance(
  //         getDistance(
  //           currentLatitude,
  //           currentLongitude,
  //           retailer.location.latitude,
  //           retailer.location.longitude,
  //         ),
  //       );
  //     });
  //   }, []);

  const handleCarouselFlow = (index) => {
    console.log(index);
    setActiveIndex(index);
  };

  return (
    <View style={{flex: 1, backgroundColor: colors.primaryBackgroundColor}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: Platform.OS == 'ios' ? insets.top : insets.top + 12,
        }}>
        <HeaderBar
          leftButton="back"
          onLeftPress={() => navigation.pop()}
          rightButton="none"
        />
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
          <Text style={styles.normalTitle}>{brand.name}</Text>
          {/* {!!distance && (
            <Text
              style={{
                fontSize: 14,
                fontFamily: fonts.sfProTextRegular,
                color: colors.lightBlue,
              }}>
              {distance.toFixed(1)} mi
            </Text>
          )} */}
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
            <ProductPriceSegment prices={products[activeIndex].prices} />
          ) : (
            <ProductQtyPriceSegment price={products[activeIndex].prices[0]} />
          )}

          {/* <View
            style={{marginTop: 24, width: constants.screenWidth, alignItems: 'center'}}>
            <RoundedButton
              width={constants.screenWidth - 64}
              height={50}
              fontSize={16}
              borderRadius={25}
              title="Add to Cart"
              onPress={() => {
                let current = Object.assign({}, products[activeIndex]);
                current.quantity = 1;
                const ids = props.cartProducts.map((product) => product.id);
                if (!ids.includes(current.id)) {
                  props.addProduct(current);
                }
                props.showCart(true);
              }}
            />
          </View> */}
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
              write={false}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(BrandProductInfo);

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
