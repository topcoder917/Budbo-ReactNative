import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
  Animated,
  PanResponder,
} from 'react-native';
import {
  TouchThroughView,
  TouchThroughWrapper,
} from 'react-native-touch-through-view';
import Geolocation from '@react-native-community/geolocation';
import FastImage from 'react-native-fast-image';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';

import HeaderMenu from 'components/common/HeaderMenu';
import HeaderAddressBar from 'components/common/HeaderAddressBar';
import HeaderCart from 'components/common/HeaderCart';
import SearchBar from 'components/common/SearchBar';
import GradientButton from 'components/common/GradientButton';
import ProductInfoCharacteristics from 'components/home/ProductInfoCharacteristics';
import DiscoverFilter from 'components/puff/DiscoverFilter';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {connect} from 'react-redux';
import {setPuff, setDiscover, addPuff} from 'budboRedux/actions/puffActions';

const imageHeight = constants.screenHeight - 420;

const images = [
  {id: 1, uri: require('assets/imgs/puff/discover_back.png')},
  {id: 2, uri: require('assets/imgs/puff/discover_back1.png')},
  {id: 3, uri: require('assets/imgs/puff/discover_back.png')},
  {id: 4, uri: require('assets/imgs/puff/discover_back1.png')},
];

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];

function Discover(props) {
  const navigation = props.navigation;
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [puffHeight, setPuffHeight] = React.useState(
    (374 / 1125) * constants.screenWidth,
  );
  const [discoverProducts, setDiscoverProducts] = React.useState([]);
  const [currentLatitude, setCurrentLatitude] = React.useState(0);
  const [currentLongitude, setCurrentLongitude] = React.useState(0);

  React.useEffect(() => {
    setNavigationBar();

    Geolocation.getCurrentPosition(
      (info) => {
        setCurrentLatitude(info.coords.latitude);
        setCurrentLongitude(info.coords.longitude);
      },
      (err) => {
        console.log('getCurrentPosition.error', err);
      },
      {
        timeout: 20000,
      },
    );

    const discover_products_url =
      constants.baseApiUrl + 'api/discovery_products';
    fetch(discover_products_url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: props.user.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.setDiscover(data.discover);
        props.setPuff(data.puff);
        setDiscoverProducts(data.discover);
      });
  }, []);

  React.useEffect(() => {
    setDiscoverProducts(
      props.discover.filter((product) => {
        if (props.filter[0]) {
          return product;
        } else {
          if (
            (props.filter[1] && product.category == 0) ||
            (props.filter[2] && product.category == 1) ||
            (props.filter[3] && product.category == 2) ||
            (props.filter[4] && product.category == 3)
          ) {
            return product;
          }
        }
      }),
    );
    setCurrentIndex(0);
  }, [props.refreshCount]);

  // React.useEffect(() => {
  //   console.log('===========discover============');
  //   console.log(props.discover.map((product) => product.id));
  //   console.log(props.puff.map((product) => product.id));
  //   console.log(props.refreshCount);
  //   console.log(discoverProducts.map((product) => product.id));
  // });

  React.useEffect(() => {
    console.log(props.user);
    setCurrentIndex(0);
    setDiscoverProducts(
      props.discover.filter((product) => {
        if (props.filter[0]) {
          return product;
        } else {
          if (
            (props.filter[1] && product.category == 0) ||
            (props.filter[2] && product.category == 1) ||
            (props.filter[3] && product.category == 2) ||
            (props.filter[4] && product.category == 3)
          ) {
            return product;
          }
        }
      }),
    );
  }, [props.filter]);

  const setNavigationBar = () => {
    navigation.setOptions({
      headerLeft: () => <HeaderMenu navigation={navigation} />,
      headerTitle: () => <HeaderAddressBar />,
      headerRight: () => <HeaderCart />,
    });
  };

  const position = new Animated.ValueXY();

  const rotate = position.x.interpolate({
    inputRange: [-constants.screenWidth / 2, 0, constants.screenWidth / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const likeOpacity = position.x.interpolate({
    inputRange: [-constants.screenWidth / 2, 0, constants.screenWidth / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-constants.screenWidth / 2, 0, constants.screenWidth / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp',
  });

  const nextCardOpacity = position.x.interpolate({
    inputRange: [-constants.screenWidth / 2, 0, constants.screenWidth / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp',
  });

  const nextCardScale = position.x.interpolate({
    inputRange: [-constants.screenWidth / 2, 0, constants.screenWidth / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp',
  });

  const rotateAndTranslate = {
    transform: [
      {
        rotate,
      },
      // ...position.getTranslateTransform(),
      {translateX: position.x},
    ],
  };

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderGrant: (evt, gestureState) => {
      setPuffHeight((374 / 1125) * constants.screenWidth);
    },
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({x: gestureState.dx, y: gestureState.dy});
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        Animated.spring(position, {
          toValue: {x: constants.screenWidth + 100, y: gestureState.dy},
          speed: 7000,
          useNativeDriver: false,
        }).start(() => {
          const url = constants.baseApiUrl + 'api/add_puff';
          const data = {
            userId: props.user.id,
            productId: discoverProducts.filter((product) => {
              if (props.filter[0]) {
                return product;
              } else {
                if (
                  (props.filter[1] && product.category == 0) ||
                  (props.filter[2] && product.category == 1) ||
                  (props.filter[3] && product.category == 2) ||
                  (props.filter[4] && product.category == 3)
                ) {
                  return product;
                }
              }
            })[currentIndex].id,
          };
          fetch(url, {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.text())
            .then((data) => {
              // console.log(data);
            });
          props.addPuff(discoverProducts[currentIndex].id);

          setCurrentIndex(currentIndex + 1);
          position.setValue({x: 0, y: 0});
          setPuffHeight(0);
        });
      } else if (gestureState.dx < -120) {
        Animated.spring(position, {
          toValue: {x: -constants.screenWidth - 100, y: gestureState.dy},
          speed: 7000,
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex(currentIndex + 1);
          position.setValue({x: 0, y: 0});
          setPuffHeight(0);
        });
      } else {
        Animated.spring(position, {
          toValue: {x: 0, y: 0},
          friction: 4,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const renderImages = () => {
    return discoverProducts
      .map((item, i) => {
        if (i < currentIndex || i > currentIndex + 4) {
          return null;
        } else if (i == currentIndex) {
          return (
            <Animated.View
              key={i}
              {...panResponder.panHandlers}
              style={[
                rotateAndTranslate,
                {
                  position: 'absolute',
                  width: constants.screenWidth,
                  height: constants.screenWidth,
                  zIndex: 1,
                },
              ]}>
              <FastImage
                style={{
                  width: constants.screenWidth,
                  height: constants.screenWidth,
                }}
                source={{
                  uri:
                    item.image != ''
                      ? item.image
                      : 'https://via.placeholder.com/150x150?text=PRODUCT',
                }}
              />
            </Animated.View>
          );
        } else if (i < currentIndex + 5 && i > currentIndex) {
          return (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                width: constants.screenWidth,
                height: constants.screenWidth,
                opacity: nextCardOpacity,
                // transform: [{scale: nextCardScale}],
                zIndex: -1,
              }}>
              <FastImage
                style={{
                  width: constants.screenWidth,
                  height: constants.screenWidth,
                }}
                source={{
                  uri:
                    item.image != ''
                      ? item.image
                      : 'https://via.placeholder.com/150x150?text=PRODUCT',
                }}
              />
            </Animated.View>
          );
        }
      })
      .reverse();
  };

  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={styles.title}>Discover</Text>
      <DiscoverFilter style={{marginTop: 25}} />
      {/* <SearchBar
        style={{marginTop: 25, paddingLeft: 24, paddingRight: 24}}
      /> */}
      <View
        style={{
          width: constants.screenWidth,
          marginTop: 21,
          paddingLeft: 12,
          paddingRight: 12,
        }}>
        <View style={{borderTopWidth: 1, borderTopColor: '#373F5C'}} />
      </View>
      <View
        style={{
          top: Platform.OS == 'ios' ? 160 : 180,
          zIndex: 0,
          position: 'absolute',
          height: constants.screenWidth,
        }}>
        <ScrollView>
          <View
            style={{
              width: constants.screenWidth,
              height: constants.screenWidth,
            }}>
            {renderImages()}
            {currentIndex < discoverProducts.length && (
              <Animated.View
                style={{
                  opacity: likeOpacity,
                  zIndex: 0,
                  width: constants.screenWidth,
                  position: 'absolute',
                  top: 10,
                }}>
                <Image
                  style={{
                    width: constants.screenWidth,
                    height: puffHeight,
                  }}
                  source={require('assets/imgs/puff/puff_button.png')}
                />
              </Animated.View>
            )}
            {currentIndex < discoverProducts.length && (
              <Animated.View
                style={{
                  opacity: nopeOpacity,
                  zIndex: 0,
                  width: constants.screenWidth,
                  position: 'absolute',
                  top: 10,
                }}>
                <Image
                  style={{
                    width: constants.screenWidth,
                    height: puffHeight,
                  }}
                  source={require('assets/imgs/puff/pass_button.png')}
                />
              </Animated.View>
            )}
            <GradientButton
              style={styles.myPuffsButton}
              title={`My Puffs (${props.puff.length})`}
              onPress={() => {
                navigation.navigate('MyPuff');
              }}
            />
          </View>
        </ScrollView>
      </View>

      <TouchThroughWrapper style={{...styles.scrollWrapper}}>
        <ScrollView style={styles.scroller}>
          <TouchThroughView
            style={{
              height:
                Platform.OS == 'ios'
                  ? constants.screenWidth
                  : constants.screenWidth - 30,
            }}
          />
          {discoverProducts[currentIndex] && (
            <View
              style={{
                backgroundColor: colors.primaryBackgroundColor,
                borderTopLeftRadius: 24,
                borderTopRightRadius: 24,
              }}>
              <View style={styles.swipViewTitle}>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: 16,
                    fontFamily: fonts.sfProTextBold,
                    color: colors.soft,
                    maxWidth: constants.screenWidth / 2,
                  }}>
                  {discoverProducts[currentIndex].name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: fonts.sfProTextRegular,
                    color: colors.soft,
                  }}>
                  1/8 • $
                  {parseFloat(
                    discoverProducts[currentIndex].prices[3] || 30,
                  ).toFixed(2)}
                </Text>
              </View>
              <View style={styles.swipViewContent}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    // justifyContent: 'space-between',
                    paddingLeft: 15,
                    paddingRight: 15,
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      aligmItems: 'center',
                    }}>
                    <Text style={styles.flowerText}>
                      {
                        productCategories[
                          discoverProducts[currentIndex].category
                        ]
                      }{' '}
                    </Text>
                    {discoverProducts[currentIndex].types.length > 0 && (
                      <Text style={styles.flowerText}>|</Text>
                    )}
                    <Text
                      style={[
                        styles.class2,
                        {
                          color: discoverProducts[currentIndex].types
                            .map((type) => productTypes[type])
                            .join(' ')
                            .toLowerCase()
                            .includes('indica')
                            ? colors.indicaColor
                            : discoverProducts[currentIndex].types
                                .map((type) => productTypes[type])
                                .join(' ')
                                .toLowerCase()
                                .includes('sativa')
                            ? colors.sativaColor
                            : colors.hybridColor,
                        },
                      ]}>
                      {' '}
                      {discoverProducts[currentIndex].types
                        .map((type) => productTypes[type])
                        .join(' ')}
                    </Text>
                  </View>
                  {/* {discoverProducts[currentIndex].retailer_info.location && (
                    <Text
                      style={[styles.flowerText, {color: colors.lightBlue}]}>
                      {getDistance(
                        currentLatitude,
                        currentLongitude,
                        discoverProducts[currentIndex].retailer_info.location
                          .latitude,
                        discoverProducts[currentIndex].retailer_info.location
                          .longitude,
                      ).toFixed(1)}
                      mi
                    </Text>
                  )} */}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    aligmItems: 'center',
                    // justifyContent: 'space-between',
                    paddingLeft: 15,
                    paddingRight: 15,
                    marginTop: 3,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      flex: 1,
                    }}>
                    <Image
                      style={{width: 13, height: 12}}
                      source={require('assets/icons/star_outline.png')}
                    />
                    <Text style={[styles.flowerText, {marginLeft: 4}]}>
                      {discoverProducts[currentIndex].rate > 0
                        ? discoverProducts[currentIndex].rate.toFixed(1)
                        : ''}{' '}
                      ({discoverProducts[currentIndex].review_count})
                    </Text>
                  </View>
                  {/* <Text style={styles.flowerText}>
                    {discoverProducts[currentIndex].retailer_info.name}
                  </Text> */}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    aligmItems: 'center',
                    // justifyContent: 'space-between',
                    paddingLeft: 15,
                    paddingRight: 15,
                    marginTop: 13,
                    marginBottom: 23.5,
                  }}>
                  <Text
                    style={{
                      ...styles.flowerText,
                      lineHeight: (16 * constants.screenWidth) / 375,
                      fontSize: (12 * constants.screenWidth) / 375,
                    }}>
                    {discoverProducts[currentIndex].description}
                  </Text>
                </View>
                <ProductInfoCharacteristics
                  attributes={discoverProducts[currentIndex].attributes}
                />
              </View>
            </View>
          )}
        </ScrollView>
      </TouchThroughWrapper>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  discover: state.puff.discoverProducts,
  puff: state.puff.puffProducts,
  refreshCount: state.home.refreshCount,
  filter: state.discover.filter,
});

const mapDispatchToProps = {
  setDiscover,
  setPuff,
  addPuff,
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);

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
  myPuffsButton: {
    width: 130,
    height: 30,
    position: 'absolute',
    top:
      Platform.OS === 'ios'
        ? constants.screenWidth - 60
        : constants.screenWidth - 90,
    right: 13,
    zIndex: 10,
  },
});
