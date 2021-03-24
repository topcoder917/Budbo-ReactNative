import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
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
import Modal from 'react-native-modal';
import FastImage from 'react-native-fast-image';

import HeaderBar from 'components/common/HeaderBar';
import fonts from 'config/fonts';
import colors from 'config/colors';
import SearchBar from 'components/common/SearchBar';
import MyScrollableTabView from 'components/home/MyScrollableTabView';
import RetailerInfo from 'components/home/RetailerInfo';
import RetailerItem from 'components/home/RetailerItem';

import constants from 'config/constants';

import {connect} from 'react-redux';
import {refreshHome} from 'budboRedux/actions/homeActions';

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];

function Retailer(props) {
  const navigation = props.navigation;
  const route = props.route;

  const [infoFlag, setInfoFlag] = React.useState(false);
  const [callFlag, setCallFlag] = React.useState(false);
  const [retailerData, setRetailerData] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const [tabViewLabels, setTabViewLabels] = React.useState([]);
  const [tabViewContent, setTabViewContent] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState('');
  const [showLoading, setShowLoading] = React.useState(true);
  const [retailerFlag, setRetailerFlag] = React.useState(false);
  const [productFlag, setProductFlag] = React.useState(false);

  const renderRetailerItem = ({item}) => {
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
      volumn: item.category % 2 == 0 ? '1/8oz' : 'each',
      price: item.category % 2 == 0 ? item.prices[3] : item.prices[0],
    };

    return (
      <RetailerItem
        item={data}
        onPress={() => {
          // setSelectedId(item.id)
          navigation.navigate('ProductInfo', {
            productId: item.id,
            products: products,
            retailer: retailerData,
          });
        }}
      />
    );
  };

  React.useEffect(() => {
    const userId = route.params.userId;
    const retailer_url = constants.baseApiUrl + 'api/retailer/' + userId;
    const product_url = constants.baseApiUrl + 'api/products/' + userId;
    fetch(retailer_url, {method: 'post'})
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setRetailerData(data);
        setRetailerFlag(true);
      });
    fetch(product_url, {method: 'post'})
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
        let labels = [];
        let content = [];
        const popularData = data.filter((item) => {
          return item.popular == 1;
        });
        if (popularData.length > 0) {
          labels.push('Popular');
          content.push(popularData);
        }
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
        setProductFlag(true);
      });
  }, []);

  const insets = useSafeAreaInsets();

  const handleValue = (value) => {
    setSearchValue(value);
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

  React.useEffect(() => {
    if (retailerFlag && productFlag) {
      fadeIn();
    }
  });
  return (
    <View style={{flex: 1, backgroundColor: colors.primaryBackgroundColor}}>
      {showLoading && (
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
      )}
      <View style={{...styles.headerContainer, height: 193 + insets.top}}>
        <ImageBackground
          style={{
            flex: 1,
            // alignItems: 'center',
            // paddingTop: Platform.OS == 'ios' ? insets.top : insets.top + 12,
          }}
          // source={require('assets/imgs/home/retailer_header_bg.png')}
          source={{
            uri: retailerData.cover_photo,
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              paddingTop: Platform.OS == 'ios' ? insets.top : insets.top + 12,
              backgroundColor: 'rgba(37, 45, 74, 0.499)',
            }}>
            <HeaderBar
              leftButton="back"
              onLeftPress={() => {
                props.refreshHome(props.refreshCount + 1);
                // navigation.navigate('Home', {source: 'retailer'});
                navigation.goBack();
              }}
            />
            <TouchableOpacity
              onPress={() => setInfoFlag(true)}
              style={{
                marginTop: 28,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FastImage
                style={styles.logo}
                // source={require('assets/imgs/home/retailer_logo.png')}
                source={{
                  uri: retailerData.logo,
                }}
              />
              <Text style={styles.title}>{retailerData.name}</Text>
            </TouchableOpacity>
            {!infoFlag && (
              <View
                style={{
                  width: '100%',
                  height: 23,
                  paddingLeft: 32,
                  paddingRight: 32,
                  alignItems: 'center',
                }}>
                <View style={styles.statusBox}>
                  <View style={styles.statusItem}>
                    <Image
                      style={styles.statusIcon}
                      source={require('assets/icons/star_outline.png')}
                    />
                    <Text style={styles.statusText}>
                      {parseFloat(retailerData.rate).toFixed(1)} (
                      {retailerData.review_count})
                    </Text>
                  </View>
                  <View style={styles.statusItem}>
                    <Image
                      style={{...styles.statusIcon, width: 9.5, height: 12}}
                      source={require('assets/icons/order.png')}
                    />
                    <Text style={styles.statusText}>Order from $10</Text>
                  </View>
                  <View style={styles.statusItem}>
                    <Image
                      style={{...styles.statusIcon, width: 17.6, height: 12}}
                      source={require('assets/icons/truck.png')}
                    />
                    <Text style={styles.statusText}>Free Shipping</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ImageBackground>
      </View>
      {!infoFlag && (
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
          <TouchableOpacity
            style={styles.phoneButton}
            onPress={() => setCallFlag(true)}>
            <Image
              style={{width: 24, height: 24}}
              source={require('assets/icons/phone.png')}
            />
          </TouchableOpacity>
        </View>
      )}
      {searchValue.length == 0 && tabViewContent.length > 0 && (
        <MyScrollableTabView
          navigation={navigation}
          labels={tabViewLabels}
          content={tabViewContent}
          products={products}
          retailerData={retailerData}
          searchValue={searchValue}
          category={route.params.category > -1 ? route.params.category : -1}
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
            renderItem={renderRetailerItem}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      )}
      <Dialog
        onTouchOutside={() => {
          setCallFlag(false);
        }}
        width={0.9}
        rounded={true}
        style={{...styles.callDialog}}
        visible={callFlag}
        dialogAnimation={new SlideAnimation({slideFrom: 'bottom'})}
        actionsBordered>
        <DialogContent style={{...styles.infoDialogContent, borderRadius: 8}}>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.sfProTextRegular,
              color: colors.soft,
            }}>
            This retailer is for demonstration purposes only.
          </Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: fonts.sfProTextRegular,
              color: colors.soft,
            }}>
            Thank you - Budbo Community
          </Text>
        </DialogContent>
      </Dialog>
      <Modal
        style={styles.productInfoModal}
        isVisible={infoFlag}
        onBackdropPress={() => {
          setInfoFlag(false);
        }}>
        <RetailerInfo
          data={retailerData}
          navigation={navigation}
          onDismiss={() => {
            setInfoFlag(false);
          }}
        />
      </Modal>
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
  productInfoModal: {
    margin: 0,
    justifyContent: 'flex-start',
  },
  featuredTitle: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    marginLeft: 15,
    marginBottom: 11,
  },
});
