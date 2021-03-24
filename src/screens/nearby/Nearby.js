/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import {
  TouchThroughView,
  TouchThroughWrapper,
} from 'react-native-touch-through-view';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';
import {getDistance} from 'config/utils';

import DispensaryItem from 'components/home/DispensaryItem';
import HeaderMenu from 'components/common/HeaderMenu';
import HeaderAddressBar from 'components/common/HeaderAddressBar';
import HeaderCart from 'components/common/HeaderCart';

import {connect} from 'react-redux';

const DISPENSARY_DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    image: require('assets/imgs/home/clone_bar_dispensary.png'),
    title: 'LaContes Clone Bar',
    mi: 3.2,
    address: '67 Nevsky Avenue',
    rate: 4.9,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    image: require('assets/imgs/home/high_tide_dispensary.png'),
    title: 'High Tide',
    mi: 2000,
    address: '22775 PCH Highway',
    rate: 4.9,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    image: require('assets/imgs/home/all_greens_dispensary.png'),
    title: 'All Greens',
    mi: 3,
    address: '762 Kalamath st.',
    rate: 4.9,
  },
];

function Nearby(props) {
  const navigation = props.navigation;
  const [retailers, setRetailers] = React.useState([]);
  const [location, setLocation] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [centerLocation, setCenterLocation] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [prev_markerLocation, setPrevMarkerLocation] = React.useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });

  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    const retailers_url = constants.baseApiUrl + 'api/retailers';
    Geolocation.getCurrentPosition((info) => {
      const currentLatitude = info.coords.latitude;
      const currentLongitude = info.coords.longitude;
      setLocation({
        latitude: currentLatitude,
        longitude: currentLongitude,
      });
      setCenterLocation({
        latitude: currentLatitude,
        longitude: currentLongitude,
      });

      fetch(retailers_url, {method: 'post'})
        .then((response) => response.json())
        .then((data) => {
          const retailers = data.map((retailer, index) => {
            let res = {};
            res.mi = getDistance(
              currentLatitude,
              currentLongitude,
              retailer.location.latitude,
              retailer.location.longitude,
            );
            res.image =
              retailer.featured_image != ''
                ? retailer.featured_image
                : 'https://via.placeholder.com/279x144?text=FEATURED';
            res.logo =
              retailer.logo != ''
                ? retailer.logo
                : 'https://via.placeholder.com/100x100?text=LOGO';
            res.name = retailer.name;
            res.address = retailer.address;
            res.rate = retailer.rate;
            res.startTime = retailer.interval.open_time || '9:00 AM';
            res.endTime = retailer.interval.closed_time || '5:00 PM';
            res.user_id = retailer.user_id;
            res.id = retailer.id;
            res.location = retailer.location;
            return res;
          });
          setRetailers(retailers);
        });
    });
  }, [props.refreshCount]);

  React.useEffect(() => {
    setNavigationBar();
  }, []);

  const setNavigationBar = () => {
    navigation.setOptions({
      headerLeft: () => <HeaderMenu navigation={navigation} />,
      headerTitle: () => <HeaderAddressBar />,
      headerRight: () => <HeaderCart />,
    });
  };

  const renderDispensaryItem = ({item}) => {
    return (
      <DispensaryItem
        item={item}
        onPress={() => {
          navigation.navigate('Retailer', {userId: item.id});
        }}
      />
    );
  };

  const handleValue = (value) => {
    setSearchValue(value);
  };

  const onViewRef = React.useRef((viewableItems) => {
    const item = viewableItems.changed[0].item;
    if (item.location) {
      setCenterLocation(item.location);
    }
  });
  const viewConfigRef = React.useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={styles.title}>Nearby</Text>
      {/* <SearchBar
        style={{marginTop: 25, paddingLeft: 24, paddingRight: 24}}
        onChange={(value) => {
          handleValue(value);
        }}
      /> */}
      <ScrollView style={{flex: 1, paddingTop: 13}}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{
            width: constants.screenWidth,
            height: constants.screenHeight - 217,
            flex: 1,
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

          {retailers
            .filter((retailer) => {
              return retailer.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .map((marker, key) => {
              if (marker.location) {
                if (key === 0) {
                  return (
                    <Marker
                      key={marker.id}
                      coordinate={marker.location}
                      anchor={{x: 0.5, y: 0.5}}
                      centerOffset={{x: 0, y: 20}}>
                      <View>
                        <FastImage
                          style={{width: 40, height: 40}}
                          source={{uri: marker.logo}}
                        />
                      </View>
                    </Marker>
                  );
                } else if (
                  retailers.filter((retailer) => {
                    return retailer.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  })[key - 1].location.latitude !== marker.location.latitude ||
                  retailers.filter((retailer) => {
                    return retailer.name
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  })[key - 1].location.longitude !== marker.location.longitude
                ) {
                  return (
                    <Marker
                      key={marker.id}
                      coordinate={marker.location}
                      anchor={{x: 0.5, y: 0.5}}
                      centerOffset={{x: 0, y: 20}}>
                      <View>
                        <FastImage
                          style={{width: 40, height: 40}}
                          source={{uri: marker.logo}}
                        />
                      </View>
                    </Marker>
                  );
                }
              }
            })}
        </MapView>
        <View
          style={{
            position: 'absolute',
            bottom: 30,
          }}>
          <FlatList
            contentContainerStyle={{paddingLeft: 16, paddingRight: 8}}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={retailers.filter((retailer) => {
              return retailer.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })}
            renderItem={renderDispensaryItem}
            keyExtractor={(item) => item.id.toString()}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  refreshCount: state.home.refreshCount,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Nearby);

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: 12,
  },
  title: {
    width: '100%',
    color: colors.soft,
    fontSize: 36,
    fontFamily: fonts.sfProTextBold,
    marginTop: 19,
    paddingLeft: 48,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 22,
    marginBottom: 25,
    paddingLeft: 24,
    paddingRight: 24,
    paddingTop: 10,
    paddingBottom: 10,
  },
  featuredTitle: {
    color: colors.soft,
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    marginLeft: 15,
    marginBottom: 11,
  },
  dispensariesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
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
  scrollWrapper: {flex: 1},
  scroller: {zIndex: 10},
  touchThroughView: {
    height: constants.screenHeight - 450,
  },
  itemRow: {height: 50, width: constants.screenWidth},
  swipViewTitle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 18,
    paddingBottom: 6,
    paddingLeft: 24,
    paddingRight: 24,
    borderBottomColor: colors.greyWhite,
    borderBottomWidth: 1,
  },
  swipViewContent: {paddingTop: 6, paddingLeft: 24, paddingRight: 24},
  flowerText: {
    fontSize: 14,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
});
