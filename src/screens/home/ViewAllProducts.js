import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Platform,
  Animated,
} from 'react-native';
import Dialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
  SlideAnimation,
  ScaleAnimation,
} from 'react-native-popup-dialog';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import HeaderBar from 'components/common/HeaderBar';
import fonts from 'config/fonts';
import colors from 'config/colors';
import SearchBar from 'components/common/SearchBar';
import RetailerItem from 'components/home/RetailerItem';
import ViewAllTabView from 'components/home/ViewAllTabView';
import PuffItem from 'components/puff/PuffItem';

import constants from 'config/constants';

import {connect} from 'react-redux';
import {refreshHome} from 'budboRedux/actions/homeActions';

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];

function Retailer(props) {
  const navigation = props.navigation;
  const route = props.route;

  const [products, setProducts] = React.useState([]);
  const [tabViewLabels, setTabViewLabels] = React.useState([]);
  const [tabViewContent, setTabViewContent] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState('');
  //   const [showLoading, setShowLoading] = React.useState(true);
  const [location, setLocation] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [centerLocation, setCenterLocation] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  React.useEffect(() => {
    Geolocation.getCurrentPosition((info) => {
      const currentLatitude = info.coords.latitude;
      const currentLongitude = info.coords.longitude;
      setCenterLocation({
        latitude: currentLatitude,
        longitude: currentLongitude,
      });
      setLocation({
        latitude: currentLatitude,
        longitude: currentLongitude,
      });
    });
    const data = route.params.products;
    setProducts(data);
    let labels = [];
    let content = [];
    const flowerData = data.filter((item) => {
      return item.category == 0;
    });
    if (flowerData.length > 0) {
      labels.push('Flower');
      content.push(flowerData);
    }
    const edibleData = data.filter((item) => {
      return item.category == 1;
    });
    if (edibleData.length > 0) {
      labels.push('Edibles');
      content.push(edibleData);
    }
    const concentrateData = data.filter((item) => {
      return item.category == 2;
    });
    if (concentrateData.length > 0) {
      labels.push('Concentrates');
      content.push(concentrateData);
    }
    const dealData = data.filter((item) => {
      return item.category == 3;
    });
    if (dealData.length > 0) {
      labels.push('Deals');
      content.push(dealData);
    }
    setTabViewLabels(labels);
    setTabViewContent(content);
  }, []);

  const insets = useSafeAreaInsets();

  const handleValue = (value) => {
    setSearchValue(value);
  };

  const renderPuffItem = ({item}) => {
    let data = {
      name: item.name,
      image: {
        uri:
          item.image != ''
            ? item.image
            : 'https://via.placeholder.com/150x150?text=PRODUCT',
      },
      class1: productCategories[item.category],
      class2: item.types.map((type) => productTypes[type]).join(' '),
      volumn: '1/8oz',
      content: item.description,
      price: item.prices[3],
    };
    return (
      <PuffItem
        item={data}
        onPress={() => {
          // setSelectedId(item.id)
          navigation.navigate('AvailableLocation', {
            productId: item.id,
            products: products,
            allProducts: products,
          });
        }}
      />
    );
  };
  const fadeAnim = new Animated.Value(1);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setShowLoading(false);
    });
  };

  //   React.useEffect(() => {
  //     if (retailerFlag && productFlag) {
  //       fadeIn();
  //     }
  //   });
  return (
    <View style={{flex: 1, backgroundColor: colors.primaryBackgroundColor}}>
      {/* {showLoading && (
        <Animated.View
          style={{
            opacity: fadeAnim,
            position: 'absolute',
            zIndex: 5,
            backgroundColor: 'rgba(37, 45, 74, 0.5)',
            width: constants.screenWidth,
            height: constants.screenHeight,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <LottieView
            style={{width: 150}}
            source={require('assets/lottie/loading.json')}
            autoPlay
            loop={true}
          />
        </Animated.View>
      )} */}
      <View style={{...styles.headerContainer, height: 193 + insets.top}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingTop: Platform.OS == 'ios' ? insets.top : insets.top + 12,
            position: 'relative',
            // backgroundColor: 'rgba(37, 45, 74, 0.499)',
          }}>
          <HeaderBar
            mode="dark"
            leftButton="back"
            onLeftPress={() => {
              props.refreshHome(props.refreshCount + 1);
              navigation.navigate('Home', {source: 'retailer'});
              // navigation.goBack();
            }}
          />
          <MapView
            provider={PROVIDER_GOOGLE}
            style={{
              width: constants.screenWidth,
              height: 193 + insets.top,
              position: 'absolute',
              zIndex: -1,
            }}
            region={{
              latitude: centerLocation.latitude,
              longitude: centerLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            <Marker
              coordinate={location}
              anchor={{x: 0.5, y: 0.5}}
              centerOffset={{x: 0, y: 25}}>
              <View>
                <Image
                  style={{width: 50, height: 50}}
                  source={require('assets/icons/owl_head.png')}
                />
              </View>
            </Marker>
          </MapView>
        </View>
      </View>
      <View
        style={{
          width: '100%',
          height: 48,
          paddingLeft: 24,
          paddingRight: 24,
          flexDirection: 'row',
          alignItems: 'center',
          position: 'absolute',
          top: 170 + insets.top,
        }}>
        <View style={{flex: 1, height: 48, paddingRight: 4}}>
          <SearchBar
            style={{flex: 1}}
            onChange={(value) => {
              handleValue(value);
            }}
          />
        </View>
      </View>
      {searchValue.length == 0 && tabViewContent.length > 0 && (
        <ViewAllTabView
          navigation={navigation}
          labels={tabViewLabels}
          content={tabViewContent}
          products={products}
          searchValue={searchValue}
          category={route.params.category}
        />
      )}
      {searchValue.length > 0 && (
        <View style={{flex: 1}}>
          <View
            style={{
              width: '100%',
              paddingLeft: 24,
              paddingRight: 24,
              marginTop: 40,
            }}>
            <Text style={styles.featuredTitle}>Results</Text>
          </View>
          <FlatList
            tabLabel="Results"
            data={products.filter((item) => {
              return item.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })}
            renderItem={renderPuffItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
    </View>
  );
}

const mapStateToProps = (state) => ({
  refreshCount: state.home.refreshCount,
});

const mapDispatchToProps = {
  refreshHome,
};

export default connect(mapStateToProps, mapDispatchToProps)(Retailer);

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 193,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  logo: {
    width: (40 / 375) * constants.screenWidth,
    height: (40 / 375) * constants.screenWidth,
  },
  title: {
    marginLeft: 16,
    fontSize: 34,
    fontFamily: fonts.sfProDisplayBold,
    color: colors.soft,
  },
  statusBox: {
    width: '100%',
    height: 23,
    borderTopColor: colors.borderColor,
    borderTopWidth: 1,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIcon: {
    width: 12,
    height: 12,
  },
  statusText: {
    marginLeft: 6,
    fontSize: 10,
    fontFamily: fonts.sfProTextRegular,
    color: colors.soft,
  },
  phoneButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.secondaryBackgroundColor,
  },
  tabView: {
    marginTop: 30,
    backgroundColor: colors.primaryBackgroundColor,
  },
  infoDialog: {
    backgroundColor: colors.primaryBackgroundColor,
  },
  infoDialogContent: {
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 24,
    paddingRight: 24,
  },
  featuredTitle: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    marginLeft: 15,
    marginBottom: 11,
  },
});
