/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {connect} from 'react-redux';
import {FlatList} from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoder';
import AsyncStorage from '@react-native-community/async-storage';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';
import {getDistance, openLink} from 'config/utils';

import HeaderMenu from 'components/common/HeaderMenu';
import HeaderAddressBar from 'components/common/HeaderAddressBar';
import HeaderCart from 'components/common/HeaderCart';
import SearchBar from 'components/common/SearchBar';
import MyScrollView from 'components/common/MyScrollView';
import LoadingIndicator from 'components/common/LoadingIndicator';
import OwlLottie from 'components/common/OwlLottie';
import FeaturedItem from 'components/home/FeaturedItem';
import DispensaryItem from 'components/home/DispensaryItem';
import BrandItem from 'components/home/BrandItem';
import NewsItem from 'components/home/NewsItem';
import NearbyItem from 'components/home/NearbyItem';

import {showCart} from 'budboRedux/actions/cartActions';
import {setUser} from 'budboRedux/actions/authActions';
import {setCurrentAddress} from 'budboRedux/actions/homeActions';
import {setRetailers} from 'budboRedux/actions/retailerActions';

const owlImage = require('assets/lottie/owl.json');

// Geocoder.init(constants.googleMapApiKey);
Geocoder.fallbackToGoogle(constants.googleMapApiKey);

function Home(props) {
  const [featuredRetailers, setFeaturedRetailers] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [featuredFlag, setFeaturedFlag] = React.useState(false);
  const [retailerFlag, setRetailerFlag] = React.useState(false);
  const [brandFlag, setBrandFlag] = React.useState(false);
  const [news, setNews] = React.useState([]);
  const [nearby, setNearby] = React.useState({});
  const [searchValue, setSearchValue] = React.useState('');

  const navigation = props.navigation;

  const placeholderImage = 'https://via.placeholder.com/279x144?text=FEATURED';

  React.useEffect(() => {
    fetchAllData();
  }, [props.refreshCount]);

  React.useEffect(() => {
    setNavigationBar();

    AsyncStorage.getItem(constants.currentUser)
      .then((value) => {
        const currentUser = JSON.parse(value);
        if (currentUser && props.setUser) {
          props.setUser(currentUser);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setNavigationBar = () => {
    navigation.setOptions({
      headerLeft: () => <HeaderMenu navigation={navigation} />,
      headerTitle: () => <HeaderAddressBar />,
      headerRight: () => <HeaderCart />,
    });
  };

  const fetchAllData = () => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ).then((result) => {
      console.log('permissions result: ', result);
      if (result === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          (info) => {
            console.log('Geolocation: ', info);
            fetchDataWithLoaction(info);
          },
          (error) => {
            console.log('getCurrentPosition.error', error);
          },
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
        );
      }
    });

    fetch(constants.baseApiUrl + 'api/brands', {
      method: 'post',
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('brands response: ', data);
        const result = data.map((brand) => {
          let res = {};
          res.image = brand.featured_image || placeholderImage;
          res.name = brand.name;
          res.content = brand.tagline;
          res.id = brand.id;
          return res;
        });
        setBrands(result);
        setBrandFlag(true);
      });

    fetch(constants.baseApiUrl + 'api/recent_news', {
      method: 'post',
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('news response: ', data);
        setNews(data);
      });
  };

  const fetchDataWithLoaction = (info) => {
    const currentLatitude = info.coords.latitude;
    const currentLongitude = info.coords.longitude;

    // Get current address
    AsyncStorage.getItem(constants.currentAddress)
      .then(async (value) => {
        let currentAddress = {};
        if (value) {
          currentAddress = JSON.parse(value);
        } else {
          const result = await Geocoder.geocodePosition({
            lat: currentLatitude,
            lng: currentLongitude,
          });

          if (!result || result.length === 0) {
            return;
          }

          currentAddress = {
            formattedAddress: result[0].formattedAddress,
            country: result[0].country || result[0].countryCode,
            state: result[0].adminArea,
            city: result[0].locality || result[0].subAdminArea,
            address:
              result[0].feature ||
              `${result[0].streetNumber} ${result[0].streetName}`,
            postal: result[0].postalCode,
          };

          AsyncStorage.setItem(
            constants.currentAddress,
            JSON.stringify(currentAddress),
          );
        }
        props.setCurrentAddress(currentAddress.formattedAddress);
      })
      .catch((error) => {
        console.log('Geolocation Error: ', error);
      });

    // Get Featured Retailers
    AsyncStorage.getItem(constants.featuredRetailers)
      .then((jsonValue) => {
        if (jsonValue) {
          setFeaturedRetailers(JSON.parse(jsonValue));
          setFeaturedFlag(true);
        } else {
          fetch(constants.baseApiUrl + 'api/featured_retailers', {
            method: 'post',
          })
            .then((response) => response.json())
            .then((data) => {
              const retailers = data.map((retailer) => {
                let res = {};
                res.mi = getDistance(
                  currentLatitude,
                  currentLongitude,
                  retailer.location.latitude,
                  retailer.location.longitude,
                );
                res.image = retailer.image || placeholderImage;
                res.name = retailer.name;
                res.address = retailer.address;
                res.rate = retailer.rate;
                res.startTime = retailer.interval.open_time || '9:00 AM';
                res.endTime = retailer.interval.closed_time || '5:00 PM';
                res.user_id = retailer.user_id;
                res.id = retailer.id;
                return res;
              });

              AsyncStorage.setItem(
                constants.featuredRetailers,
                JSON.stringify(retailers),
              );

              setFeaturedRetailers(retailers);
              setFeaturedFlag(true);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });

    // Get all retailers
    AsyncStorage.getItem(constants.allRetailers)
      .then((jsonValue) => {
        if (jsonValue) {
          const retailers = JSON.parse(jsonValue);
          props.setRetailers(retailers);
          fetchNearby(retailers);
        } else {
          fetch(constants.baseApiUrl + 'api/retailers', {method: 'post'})
            .then((response) => response.json())
            .then((data) => {
              // console.log('retailers response: ', data);
              const retailers = data.map((retailer) => {
                let res = {};
                res.mi = getDistance(
                  currentLatitude,
                  currentLongitude,
                  retailer.location.latitude,
                  retailer.location.longitude,
                );
                (res.location = retailer.location),
                  (res.image = retailer.featured_image || placeholderImage);
                res.logo = retailer.logo;
                res.cover_photo = retailer.cover_photo;
                res.name = retailer.name;
                res.address = retailer.address;
                res.rate = retailer.rate;
                res.startTime = retailer.interval.open_time || '9:00 AM';
                res.endTime = retailer.interval.closed_time || '5:00 PM';
                res.user_id = retailer.user_id;
                res.id = retailer.id;
                res.review_count = retailer.review_count;
                return res;
              });

              props.setRetailers(retailers);

              AsyncStorage.setItem(
                constants.allRetailers,
                JSON.stringify(retailers),
              );

              fetchNearby(retailers);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchNearby = (retailers) => {
    AsyncStorage.getItem(constants.nearby)
      .then((jsonValue) => {
        if (jsonValue) {
          setNearby(JSON.parse(jsonValue));
          setRetailerFlag(true);
        } else {
          if (!retailers || retailers.length === 0) {
            setRetailerFlag(true);
            return;
          }
          const simpleRetailers = retailers.map((user) => {
            return {
              user_id: user.id,
              distance: user.mi,
              name: user.name,
            };
          });
          const body = {
            retailers: simpleRetailers,
          };

          fetch(constants.baseApiUrl + 'api/nearby', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          })
            .then((response) => response.json())
            .then((nearby) => {
              // console.log(nearby);
              AsyncStorage.setItem(constants.nearby, JSON.stringify(nearby));
              setNearby(nearby);
              setRetailerFlag(true);
            })
            .catch((error) => {
              setRetailerFlag(true);
              console.log(error);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleViewAllProducts = (products, category) => {
    navigation.navigate('ViewAllProducts', {
      products,
      category,
    });
  };

  const handleAvailableLocation = (productId, products) => {
    navigation.navigate('AvailableLocation', {
      productId,
      products,
      allProducts: nearby.all,
    });
  };

  const handleViewAllBrands = () => {
    navigation.navigate('ViewAllBrands', {items: brands});
  };

  const handleViewAll = () => {
    navigation.navigate('ViewAll', {items: props.retailers});
  };

  const handleOpenLink = async (url) => {
    openLink(url);
  };

  const renderFeaturedItem = ({item}) => {
    return (
      <FeaturedItem
        item={item}
        onPress={() => navigation.navigate('Retailer', {userId: item.id})}
      />
    );
  };

  const renderDispensaryItem = ({item}) => {
    return (
      <DispensaryItem
        item={item}
        onPress={() => navigation.navigate('Retailer', {userId: item.id})}
      />
    );
  };

  const renderBrandItem = ({item}) => {
    return (
      <BrandItem
        item={item}
        onPress={() => navigation.navigate('Brand', {userId: item.id})}
      />
    );
  };

  const renderNewsItem = ({item}) => {
    return <NewsItem item={item} onPress={() => handleOpenLink(item.link)} />;
  };

  const renderNearbyItem = ({item}, all) => {
    return (
      <NearbyItem
        item={item}
        onPress={() => handleAvailableLocation(item.id, all)}
      />
    );
  };

  const renderFeature = () => {
    const filterdFeaturedRetailers =
      featuredRetailers &&
      featuredRetailers.filter((retailer) =>
        retailer.name.toLowerCase().includes(searchValue.toLowerCase()),
      );

    return (
      <>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.textSectionTitle}>Featured</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.flistListContentContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={filterdFeaturedRetailers}
          renderItem={renderFeaturedItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </>
    );
  };

  const renderRetailer = () => {
    const filterdRetailers =
      props.retailers &&
      props.retailers.filter((retailer) =>
        retailer.name.toLowerCase().includes(searchValue.toLowerCase()),
      );

    return (
      <>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.textSectionTitle}>Dispensaries</Text>
          <TouchableOpacity
            style={styles.viewAllButtonContainer}
            activeOpacity={0.8}
            onPress={() => handleViewAll()}>
            <Text style={styles.textViewAll}>
              View All ({props.retailers && props.retailers.length})
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.flistListContentContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={filterdRetailers}
          renderItem={renderDispensaryItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </>
    );
  };

  const renderBrands = () => {
    const filterdBrands = brands.filter((brand) =>
      brand.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return (
      <>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.textSectionTitle}>Brands</Text>
          <TouchableOpacity
            style={styles.viewAllButtonContainer}
            activeOpacity={0.8}
            onPress={() => handleViewAllBrands()}>
            <Text style={styles.textViewAll}>View All ({brands.length})</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.flistListContentContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={filterdBrands}
          renderItem={renderBrandItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </>
    );
  };

  const renderNewsAndUpdates = () => {
    const filteredNews = news.filter((item) =>
      item.title.toLowerCase().includes(searchValue.toLowerCase()),
    );

    return (
      <>
        <View style={styles.sectionHeaderContainer}>
          <Text style={styles.textSectionTitle}>News and Updates</Text>
        </View>
        <FlatList
          contentContainerStyle={styles.flistListContentContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={filteredNews}
          renderItem={renderNewsItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </>
    );
  };

  const renderNearby = (currentNearby, title) => {
    if (!currentNearby) {
      return null;
    }

    const filteredCurrentNearby = currentNearby.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase()),
    );

    if (filteredCurrentNearby.length === 0) {
      return null;
    }

    return (
      <>
        <View
          style={[
            styles.sectionHeaderContainer,
            styles.nearbySectionHeaderContainer,
          ]}>
          <Text style={styles.textSectionTitle}>Nearby {title}</Text>
          <TouchableOpacity
            style={styles.viewAllButtonContainer}
            activeOpacity={0.8}
            onPress={() => handleViewAllProducts(nearby.all, 0)}>
            <Text style={styles.textViewAll}>
              View All ({filteredCurrentNearby.length})
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          contentContainerStyle={styles.flistListContentContainer}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={filteredCurrentNearby}
          renderItem={(item) => renderNearbyItem(item, filteredCurrentNearby)}
          keyExtractor={(item) => item.id.toString()}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <LoadingIndicator
        isLoading={!featuredFlag || !retailerFlag || !brandFlag}
      />
      {/* <HeaderBar
        leftButton="hamburger"
        onLeftPress={() => navigation.openDrawer()}
      /> */}
      <Text style={styles.textTitle}>Budbo</Text>
      <View style={styles.searchAnimationContainer}>
        <OwlLottie />
        <SearchBar style={styles.searchContainer} onChange={setSearchValue} />
      </View>
      <MyScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        {renderFeature()}
        {renderRetailer()}
        {renderBrands()}
        {renderNewsAndUpdates()}
        {renderNearby(nearby && nearby.flower, 'Flower')}
        {renderNearby(nearby && nearby.edible, 'Edible')}
        {renderNearby(nearby && nearby.concentrate, 'Concentrates')}
        {renderNearby(nearby && nearby.deal, 'Deals')}
      </MyScrollView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  cartFlag: state.cart.cartFlag,
  refreshCount: state.home.refreshCount,
  user: state.auth.user,
  retailers: state.retailer.retailers,
});

const mapDispatchToProps = {
  showCart,
  setUser,
  setCurrentAddress,
  setRetailers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    backgroundColor: colors.primaryBackgroundColor,
  },
  textTitle: {
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
  },
  scrollContentContainer: {
    paddingBottom: 28,
  },
  searchAnimationContainer: {},
  searchContainer: {
    marginTop: 25,
    paddingHorizontal: 24,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: 19,
    // marginBottom: 15,
    paddingHorizontal: 24,
  },
  nearbySectionHeaderContainer: {
    marginTop: 9,
    marginBottom: 5,
  },
  textSectionTitle: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
    marginLeft: 15,
  },
  textViewAll: {
    color: colors.greyWhite,
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.4,
    fontFamily: fonts.sfProTextLight,
  },
  viewAllButtonContainer: {
    // height: 40,
    justifyContent: 'center',
  },
  flistListContentContainer: {
    paddingLeft: 24,
    paddingRight: 8,
  },
});
