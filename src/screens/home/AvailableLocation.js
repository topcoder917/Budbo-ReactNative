import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Modal, {
  ModalTitle,
  ModalContent,
  BottomModal,
  SlideAnimation,
} from 'react-native-modals';
import Geolocation from '@react-native-community/geolocation';
import FastImage from 'react-native-fast-image';

import HeaderBar from 'components/common/HeaderBar';
import fonts from 'config/fonts';
import colors from 'config/colors';
import constants from 'config/constants';
import {getDistance} from 'config/utils';

import SearchBar from 'components/common/SearchBar';
import RetailerItem from 'components/home/RetailerItem';
import ProductPriceSegment from 'components/home/ProductPriceSegment';
import RoundedButton from 'components/common/RoundedButton';
import ProductInfoCharacteristics from 'components/home/ProductInfoCharacteristics';
import ProductInfoReviews from 'components/home/ProductInfoReviews';
import DispensaryItem from 'components/home/DispensaryItem';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];

const screenWidth = Math.round(Dimensions.get('window').width);

const nearbyTitles = [
  'Nearby Flowers',
  'Nearby Edibles',
  'Nearby Concentrates',
  'Nearby Deals',
];

export default function AvailableLocation({route, navigation}) {
  const {products, productId, allProducts} = route.params;
  const [activeIndex, setActiveIndex] = React.useState(
    products.map((product) => product.id).indexOf(productId),
  );
  const [retailers, setRetailers] = React.useState([]);

  React.useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      const currentLatitude = info.coords.latitude;
      const currentLongitude = info.coords.longitude;
      const available_locations_url =
        constants.baseApiUrl + 'api/available_retailers';
      const data = {
        productId: products[activeIndex].id,
      };
      fetch(available_locations_url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          const retailers = data.map((retailer, index) => {
            let res = {};
            if (retailer.location) {
              res.mi = getDistance(
                currentLatitude,
                currentLongitude,
                retailer.location.latitude,
                retailer.location.longitude,
              );
            }
            res.image =
              retailer.featured_image != ''
                ? retailer.featured_image
                : 'https://via.placeholder.com/279x144?text=FEATURED';
            res.name = retailer.name;
            res.address = retailer.address;
            res.rate = retailer.rate;
            res.startTime = retailer.interval.open_time || '9:00 AM';
            res.endTime = retailer.interval.closed_time || '5:00 PM';
            res.user_id = retailer.user_id;
            res.id = retailer.id;
            return res;
          });
          console.log(retailers);
          setRetailers(retailers);
        });
    });
  }, [activeIndex]);

  const renderCarouselItem = ({item, index}) => {
    return (
      <View
        style={{
          borderRadius: 5,
          width: '100%',
          height: (256 * screenWidth) / 375,
          shadowColor: colors.shadowColor,
          shadowOffset: {width: 0, height: 3},
          shadowOpacity: 0.69,
          shadowRadius: 10,
          elevation: 10,
        }}>
        <FastImage
          style={{
            width: (295 * screenWidth) / 375,
            height: (256 * screenWidth) / 375,
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

  const renderDispensaryItem = ({item}) => {
    return (
      <DispensaryItem
        item={item}
        onPress={() => {
          navigation.navigate('Retailer', {
            userId: item.id,
            category: products[activeIndex].category,
          });
        }}
      />
    );
  };

  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.primaryBackgroundColor,
        paddingTop: insets.top,
      }}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingTop: Platform.OS == 'ios' ? 0 : 12,
        }}>
        <HeaderBar
          leftButton="back"
          onLeftPress={() => {
            navigation.navigate('ViewAllProducts', {
              products: allProducts,
              category: products[activeIndex].category,
            });
          }}
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
            width: screenWidth,
          }}>
          {products[activeIndex].retailer_info && (
            <Text style={styles.normalTitle}>
              {nearbyTitles[products[activeIndex].category]}
            </Text>
          )}
          {products[activeIndex].brand_info && (
            <Text style={styles.normalTitle}>
              {products[activeIndex].brand_info.name}
            </Text>
          )}
          <Text
            style={{
              fontSize: 15,
              fontFamily: fonts.sfProTextRegular,
              color: '#DC89AD',
            }}></Text>
        </View>
        <View style={{height: (256 * screenWidth) / 375 + 10}}>
          <Carousel
            layout={'default'}
            // ref={(ref) => (this.carousel = ref)}
            firstItem={activeIndex}
            data={products}
            sliderWidth={screenWidth}
            itemWidth={(295 * screenWidth) / 375}
            renderItem={renderCarouselItem}
            onSnapToItem={(index) => setActiveIndex(index)}
          />
        </View>
        <View
          style={{
            paddingLeft: 24,
            paddingRight: 24,
            marginTop: 16,
            width: screenWidth,
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
                  style={{width: 14, height: 14}}
                  source={require('assets/icons/star_outline.png')}
                />
                <Text style={[styles.flowerText, {marginLeft: 4}]}>
                  {' '}
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
            }}>
            <View style={{paddingLeft: 16, paddingRight: 16, paddingTop: 11}}>
              <Text
                style={{
                  ...styles.flowerText,
                  lineHeight: (18 * screenWidth) / 375,
                  fontSize: (14 * screenWidth) / 375,
                }}>
                {products[activeIndex].description}
              </Text>
            </View>
          </View>
          <View style={{paddingLeft: 24, paddingRight: 24}}>
            <View style={styles.dispensariesContainer}>
              <Text style={styles.dispensariesTitle}>Available Locations</Text>
              <Text style={styles.viewAll}></Text>
            </View>
          </View>
          <View>
            <FlatList
              contentContainerStyle={{paddingLeft: 24, paddingRight: 8}}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={retailers}
              renderItem={renderDispensaryItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
          <View
            style={{
              width: screenWidth,
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
              width: screenWidth,
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
  dispensariesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 28,
    marginBottom: 11,
  },
  dispensariesTitle: {
    color: colors.soft,
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    marginLeft: 15,
  },
  viewAll: {
    color: colors.greyWhite,
    fontSize: 16,
    fontFamily: fonts.sfProTextLight,
  },
});
