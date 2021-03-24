import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import FastImage from 'react-native-fast-image';

import HeaderBar from 'components/common/HeaderBar';
import SearchBar from 'components/common/SearchBar';
import PuffItem from 'components/puff/PuffItem';
import BrandTabView from 'components/home/BrandTabView';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {connect} from 'react-redux';
import {refreshHome} from 'budboRedux/actions/homeActions';

import fonts from 'config/fonts';
import colors from 'config/colors';
import constants from 'config/constants';

const POPULAR_DATA = [
  {
    id: 'popular1',
    name: 'Mile High Mint',
    image: require('assets/imgs/home/mile_high_mint_incredible.png'),
    content:
      'Reach peak elevation with this incredibles original. Cool mint, milk chocolatey good times.',
  },
  {
    id: 'popular2',
    name: 'Strawberry Crunch',
    image: require('assets/imgs/home/strawberry_crunch_incredible.png'),
    content:
      'White chocolatey strawberries, crispy rice crunchies, sweet satisfaction.',
  },
  {
    id: 'popular3',
    name: 'Peanut Budda Buddah',
    image: require('assets/imgs/home/peanut_budda_buddah_incredible.png'),
    content:
      'Enlighten your tastebuds with this bite of heaven. Savory pretzels, chocolatey peanut butter, blissful well-being.',
  },
];

function Brand(props) {
  const navigation = props.navigation;
  const route = props.route;

  const [infoFlag, setInfoFlag] = React.useState(false);
  const [brandData, setBrandData] = React.useState({});
  const [products, setProducts] = React.useState([]);
  const [tabViewLabels, setTabViewLabels] = React.useState([]);
  const [tabViewContent, setTabViewContent] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');

  const renderPuffItem = ({item}) => {
    return (
      <PuffItem
        item={item}
        onPress={() => {
          // setSelectedId(item.id)
          //   navigation.navigate('AvailableLocation');
        }}
      />
    );
  };

  const insets = useSafeAreaInsets();

  const handleValue = (value) => {
    setSearchValue(value);
  };

  React.useEffect(() => {
    const userId = route.params.userId;
    const brand_url = constants.baseApiUrl + 'api/brand/' + userId;
    const product_url = constants.baseApiUrl + 'api/products/' + userId;
    fetch(brand_url, {method: 'post'})
      .then((response) => response.json())
      .then((brand) => {
        console.log(brand);
        setBrandData(brand);
        fetch(product_url, {method: 'post'})
          .then((response) => response.json())
          .then((res) => {
            console.log(res);
            let data = res.map((item) => {
              item.brand_info = {name: brand.name};
              return item;
            });
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
      });
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colors.primaryBackgroundColor}}>
      <View style={{...styles.headerContainer, height: 193 + insets.top}}>
        <ImageBackground
          style={{
            flex: 1,
            // alignItems: 'center',
            // paddingTop: Platform.OS == 'ios' ? insets.top : insets.top + 12,
          }}
          source={{uri: brandData.cover_photo}}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              paddingTop: Platform.OS == 'ios' ? insets.top : insets.top + 12,
              backgroundColor: 'rgba(37, 45, 74, 0.499)',
            }}>
            <HeaderBar leftButton="back" onLeftPress={() => navigation.pop()} />
            <TouchableOpacity
              onPress={() => setInfoFlag(true)}
              style={{
                marginTop: 28,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <FastImage style={styles.logo} source={{uri: brandData.logo}} />
              <Text style={styles.title}>{brandData.name}</Text>
            </TouchableOpacity>
            <View
              style={{
                width: '100%',
                height: 23,
                paddingLeft: 32,
                paddingRight: 32,
                alignItems: 'center',
              }}>
              <View style={{...styles.statusBox, justifyContent: 'center'}}>
                <Image
                  style={styles.statusIcon}
                  source={require('assets/icons/leaf.png')}
                />
                <Text style={styles.statusText}>{brandData.tagline}</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
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
        <View style={{flex: 1, height: 48}}>
          <SearchBar style={{flex: 1}} onChange={handleValue} />
        </View>
      </View>
      {tabViewContent.length > 0 && (
        <BrandTabView
          navigation={navigation}
          labels={tabViewLabels}
          content={tabViewContent}
          products={products}
          brandData={brandData}
          searchValue={searchValue}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(Brand);

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 193,
    borderBottomColor: colors.borderColor,
    borderBottomWidth: 1,
  },
  logo: {
    width: 40,
    height: 40,
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
    marginLeft: 4,
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
  tabView: {
    marginTop: 30,
  },
});
