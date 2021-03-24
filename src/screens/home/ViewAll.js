import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import HeaderBar from 'components/common/HeaderBar';
import SearchBar from 'components/common/SearchBar';
// import MyScrollView from 'components/common/MyScrollView';
import ViewRetailerItem from 'components/home/ViewRetailerItem';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';

export default function ViewAll(props) {
  const navigation = props.navigation;
  const data = props.route.params.items;
  const [searchValue, setSearchValue] = React.useState('');

  const renderViewItem = ({item}) => {
    return (
      <ViewRetailerItem
        item={item}
        onPress={() => {
          navigation.navigate('Retailer', {userId: item.id});
        }}
      />
    );
  };

  const handleSearch = (value) => {
    setSearchValue(value);
  };
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        ...styles.homeContainer,
        paddingTop: Platform.OS == 'ios' ? insets.top : 12,
      }}>
      <HeaderBar
        leftButton="back"
        onLeftPress={() => navigation.pop()}
        rightButton="none"
      />
      <SearchBar
        style={{marginTop: 22, paddingLeft: 24, paddingRight: 24}}
        onChange={handleSearch}
      />
      <Text style={styles.title}>Dispensaries</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}>
        <FlatList
          contentContainerStyle={{paddingLeft: 24, paddingRight: 8}}
          showsHorizontalScrollIndicator={false}
          data={data.filter((item) => {
            return item.name.toLowerCase().includes(searchValue.toLowerCase());
          })}
          renderItem={renderViewItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryBackgroundColor,
  },
  // title: {
  //   width: '100%',
  //   color: colors.soft,
  //   fontSize: 36,
  //   fontFamily: fonts.sfProTextBold,
  //   marginTop: 19,
  //   paddingLeft: 48,
  // },
  scrollContainer: {
    flex: 1,
    // marginTop: 22,
    // marginBottom: 25,
    paddingTop: 12,
    paddingBottom: 12,
  },
  title: {
    width: '100%',
    color: colors.soft,
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    marginLeft: 15,
    marginBottom: 4,
    paddingLeft: 24,
    marginTop: 24,
  },
  dispensariesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 29,
    marginBottom: 19,
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
  viewAllContainer: {
    height: 40,
    justifyContent: 'center',
  },
  newsImage: {
    width: constants.screenWidth - 24 * 4,
    height: ((constants.screenWidth - 24 * 4) * 144) / 279,
    position: 'absolute',
    borderRadius: 6,
  },
  newsTitle: {
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
  },
  newsAddress: {
    marginTop: 3,
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.blue,
  },
  newsBox: {
    width: '100%',
    height: 176,
    paddingTop: 80,
    paddingBottom: 18,
    paddingLeft: 24,
    paddingRight: 24,
    marginTop: 80,
    borderRadius: 6,
  },
  nearbyContainer: {
    width: '100%',
    height: 186,
    flexDirection: 'row',
    alignItems: 'center',
  },
  nearbyImage: {
    width: 160,
    height: 154,
    position: 'absolute',
    borderRadius: 6,
  },
  nearbyContentContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: colors.secondaryBackgroundColor,
    paddingTop: 32,
    paddingBottom: 24,
    paddingLeft: 96,
    paddingRight: 16,
    borderRadius: 6,
  },
  nearbyTitle: {
    fontSize: 15,
    fontFamily: fonts.sfProTextBold,
    color: colors.white,
  },
  nearbyContent: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
    marginTop: 7,
    marginBottom: 14,
  },
  class1: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
  },
  class2: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
  },
});
