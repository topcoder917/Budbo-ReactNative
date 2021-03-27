/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import {connect} from 'react-redux';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';
import {getOrderStatusText, getOrderStatusColor} from 'config/utils';

import HeaderBar from 'components/common/HeaderBar';
import CheckItem from 'components/order/CheckItem';
import PaymentItem from 'components/common/PaymentItem';
import LinearGradient from 'react-native-linear-gradient';

const owlHeadIcon = require('assets/icons/owl_head.png');
// const badboIcon = require('assets/icons/budbo_white.png');
const downTriangleIcon = require('assets/icons/triangle_down.png');

Geocoder.init(constants.googleMapApiKey);

function Order(props) {
  const navigation = props.navigation;
  const currentOrders = props.route.params.currentOrders || [];
  const deliveryAddress = props.route.params.address;
  // const pick = props.route.params.pick;

  const [showProducts, setShowProducts] = React.useState(true);
  const [animatedOrderDetails] = React.useState(new Animated.Value(1));
  const [orderDetailsHeight, setOrderDetailsHeight] = React.useState(0);

  const [currentLocation, setCurrentLocation] = React.useState({
    latitude: 39.6631609,
    longitude: -104.8279512,
  });

  React.useEffect(() => {
    console.log(deliveryAddress);
    const addressString =
      deliveryAddress.address +
      ' ' +
      deliveryAddress.city +
      ', ' +
      deliveryAddress.state +
      ' ' +
      deliveryAddress.postal +
      ' ' +
      deliveryAddress.country;
    const formattedAddress = addressString.replace(' ', '+');

    Geocoder.from(formattedAddress)
      .then((json) => {
        console.log(json);
        var location = json.results[0].geometry.location;
        console.log(location);
        setCurrentLocation({latitude: location.lat, longitude: location.lng});
      })
      .catch((error) => console.warn(error));
  }, []);

  const handleShowOrderDetails = () => {
    Animated.timing(animatedOrderDetails, {
      toValue: showProducts ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setShowProducts(!showProducts);
  };

  const handleOrderDetailsLayout = ({
    nativeEvent: {
      layout: {height},
    },
  }) => {
    if (height > 0) {
      setOrderDetailsHeight(height);
    }
  };

  const getPaymentUnit = () => {
    return constants.paymentMethods[currentOrders[0].payment_method - 1 || 0]
      .unit;
  };

  const getTotalPrice = () => {
    let totals = 0;
    currentOrders.map((order) => {
      switch (order.payment_method || 1) {
        case 1:
          totals += order.totals.bubo;
          break;
        case 2:
          totals += order.totals.btc;
          break;
        case 3:
          totals += order.totals.usd;
          break;
      }
    });

    return totals;
  };

  const renderCheckItem = ({item, index}) => {
    const data = {
      id: item.product_id,
      index: index,
      name: item.name,
      category: item.category,
      image: {uri: item.image},
      volumn: constants.productVolumns[item.unit_selected],
      price: Number(
        (item.prices && item.prices[item.unit_selected]) ||
          item.unit_selected_price,
      ),
      quantity: item.quantity,
      retailer_address: item.retailer.address,
      retailer_logo: {uri: item.retailer.logo},
      delivery_address: item.deliveryAddress
    };
    return <CheckItem item={data} enabled={false} />;
  };

  const rotateTriangle = animatedOrderDetails.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });
  const heightOrderDetails = animatedOrderDetails.interpolate({
    inputRange: [0, 1],
    outputRange: [0, orderDetailsHeight],
  });

  const orderRetailers = [];
  currentOrders.map((order) => {
    const retailer = props.retailers.find(
      (item) => item.id === order.retailer_id,
    );
    if (retailer) {
      orderRetailers.push(retailer);
    }
  });

  const getOrderIds = () => {
    let ids = '';
    currentOrders.map((order) => {
      ids += `#${order.id} `;
    });
    return ids;
  };

  const allProducts = [];
  currentOrders.map((order) => {
    order.products.map((orderproduct) => {
      const retailer = props.retailers.find(
        (item) => item.id === orderproduct.retailer_id,
      );
      orderproduct.retailer = retailer;
      orderproduct.deliveryAddress = deliveryAddress.address;
      allProducts.push(orderproduct);
    });
    
  });
  const renderRetailerItem = (retailer) => {
    return (
      <View style={styles.retailerInfoContainer}>
        <View style={styles.retailerLogoContainer}>
          <FastImage style={styles.iconProduct} source={{uri: retailer.logo}} />
        </View>
        <View style={styles.retailerContentContainer}>
          <Text style={styles.textDeliveryAddress}>
            To: {deliveryAddress.address}
          </Text>
          <Text style={styles.textRetailerName}>From: {retailer.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar
        leftButton="back"
        onLeftPress={() => {
          navigation.navigate('WalletScreens', {
            screen: 'Wallet',
            params: {
              currentTab: 'Order History',
            },
          });
        }}
        rightButton="none"
      />
      <Text style={styles.textTitle}>Order {getOrderIds()}</Text>
      <View style={styles.topCotentContainer}>
        <View style={styles.rowContainer}>
          <View
            style={[
              styles.circleStatus,
              {backgroundColor: getOrderStatusColor(currentOrders[0].status)},
            ]}
          />
          <Text style={styles.textDescription}>
            {getOrderStatusText(currentOrders[0].status)}
          </Text>
        </View>
        <Text style={styles.textDescription}>
          {moment(currentOrders[0].created_at).format('MMMM Do h:mm a')}
        </Text>
      </View>
      <ScrollView>
        <View style={styles.mapInfoContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapContainer}
            region={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.25,
              longitudeDelta: 0.125,
            }}>
            <Marker
              coordinate={currentLocation}
              anchor={{x: 0.5, y: 0.5}}
              centerOffset={{x: 0, y: 25}}>
              <Image style={styles.imageMapMarker} source={owlHeadIcon} />
            </Marker>

            {currentOrders.map((product, index) => {
              const reatiler = props.retailers.find(
                (item) => item.id === product.retailer_id,
              );
              if (reatiler && reatiler.location) {
                return (
                  <Marker
                    key={index}
                    coordinate={reatiler.location.location}
                    anchor={{x: 0.5, y: 0.5}}
                    centerOffset={{x: 0, y: 20}}>
                    <FastImage
                      style={styles.imageMapMarker}
                      source={{uri: reatiler.location.logo}}
                    />
                  </Marker>
                );
              }
            })}
          </MapView>
          <ScrollView
            style={styles.retailersInfoContainer}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            pagingEnabled={true}>
            {orderRetailers.map((retailer) => {
              return renderRetailerItem(retailer);
            })}
          </ScrollView>
        </View>
        <View style={styles.sectionContainer}>
          <Text style={styles.textSectionTitle}>Payment Method</Text>
          <LinearGradient
            colors={[
              colors.firstGradientColor,
              colors.secondGradientColor,
              colors.thirdGradientColor,
            ]}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            style={styles.paymentGradient}>
            <Image style={styles.paymentItemIcon} source={constants.paymentMethods[currentOrders[0].payment_method - 1 || 0].icon} />
            <Text style={styles.textSelectedPayment}>
              **** {constants.paymentMethods[currentOrders[0].payment_method - 1 || 0].unit}
            </Text>
          </LinearGradient>
          {/* <PaymentItem
            style={styles.paymentMethodContainer}
            item={
              constants.paymentMethods[currentOrders[0].payment_method - 1 || 0]
            }
            isActive
          /> */}
        </View>
        <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.orderDetailsButton}
            activeOpacity={0.8}
            onPress={() => handleShowOrderDetails()}>
            <Text style={styles.textSectionTitle}>Order Details</Text>
            <Animated.Image
              style={[
                styles.iconDownTriangle,
                {transform: [{rotate: rotateTriangle}]},
              ]}
              source={downTriangleIcon}
            />
          </TouchableOpacity>
          <View style={styles.topLine} />
          <Animated.View
            style={[
              styles.orderDetailsAnimatedContainer,
              {height: heightOrderDetails},
            ]}>
            <View
              style={styles.orderDetailsListContainer}
              onLayout={handleOrderDetailsLayout}>
              <FlatList
                contentContainerStyle={styles.orderDetailsContentContainer}
                data={allProducts || []}
                renderItem={renderCheckItem}
                keyExtractor={(item, index) => index.toString()}
              />
              <View style={styles.bottomLine} />
            </View>
          </Animated.View>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.textFieldName}>Basket Charges</Text>
          <Text style={styles.textFieldValue}>
            {getTotalPrice()} {getPaymentUnit()}
          </Text>
        </View>
        <View style={styles.fieldContainer}>
          <Text style={styles.textFieldName}>Delivery Charges</Text>
          <Text style={styles.textFieldValue}>6.2858 {getPaymentUnit()}</Text>
        </View>
        <View style={[styles.fieldContainer, styles.amountConainer]}>
          <Text style={[styles.textFieldName, styles.textAmount]}>
            Amound Paid
          </Text>
          <Text style={[styles.textFieldName, styles.textAmountValue]}>
            {getTotalPrice() + 6.2858} {getPaymentUnit()}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  retailers: state.retailer.retailers,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Order);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: 12,
  },
  textTitle: {
    color: colors.soft,
    fontSize: 36,
    fontFamily: fonts.sfProTextBold,
    marginTop: 19,
    paddingLeft: 37,
  },
  topCotentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingLeft: 40,
    paddingRight: 27,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circleStatus: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.mediumBlue,
  },
  textDescription: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
    marginLeft: 10,
  },
  mapInfoContainer: {
    width: constants.screenWidth,
    height: 208,
  },
  mapContainer: {
    width: constants.screenWidth,
    height: 168,
  },
  imageMapMarker: {
    width: 50,
    height: 50,
  },
  retailersInfoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  retailerInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // position: 'absolute',
    // left: 16,
    // right: 16,
    // bottom: 0,
    width: constants.screenWidth - 32,
    height: 80,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    borderRadius: 6,
    backgroundColor: colors.itemBackgroundColor,
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  retailerLogoContainer: {
    shadowColor: colors.shadowColor,
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.7,
    shadowRadius: 10,
    elevation: 4,
  },
  iconProduct: {
    width: 64,
    height: 64,
    borderRadius: 6,
    resizeMode: 'contain',
  },
  retailerContentContainer: {
    marginLeft: 10,
  },
  textDeliveryAddress: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fonts.sfProTextRegular,
    color: colors.primary,
  },
  textRetailerName: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  sectionContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  textSectionTitle: {
    marginHorizontal: 8,
    fontSize: 17,
    fontFamily: fonts.sfProTextLight,
    color: colors.soft,
  },
  paymentMethodContainer: {
    width: '100%',
    height: 70,
    justifyContent: 'center',
    borderRadius: 6,
    marginTop: 16,
  },
  paymentMethodContentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconBudbo: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  textBudbo: {
    fontSize: 16,
    fontFamily: fonts.andaleMono,
    color: colors.soft,
    marginLeft: 19,
  },
  orderDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 8,
  },
  iconDownTriangle: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 28,
  },
  orderDetailsAnimatedContainer: {
    overflow: 'hidden',
    marginBottom: 20,
  },
  orderDetailsListContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
  },
  topLine: {
    height: 1,
    backgroundColor: colors.greyWhite,
    marginHorizontal: 8,
  },
  bottomLine: {
    height: 1,
    backgroundColor: colors.lightPurple,
    marginHorizontal: 8,
  },
  orderDetailsContentContainer: {
    paddingTop: 12,
    paddingBottom: 20,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginVertical: 3,
  },
  textFieldName: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: fonts.sfProTextRegular,
    color: colors.lightPurple,
  },
  textFieldValue: {
    fontSize: 12,
    lineHeight: 22,
    fontFamily: fonts.sfProTextRegular,
    color: colors.lightPurple,
  },
  amountConainer: {
    marginVertical: 9,
  },
  textAmount: {
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
  },
  textAmountValue: {
    fontFamily: fonts.sfProTextBold,
    color: colors.primary,
  },
  paymentGradient: {
    width: '100%',
    height: 60,
    borderRadius: 6,
    flexDirection: 'row',
    //justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 10
  },
  paymentItemIcon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  textSelectedPayment: {
    marginLeft: 20,
    fontSize: 16,
    fontFamily: fonts.sfProTextLight,
    color: colors.soft,
    letterSpacing: 3,
  },  
});
