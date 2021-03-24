import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import RetailerItem from './RetailerItem';

import fonts from 'config/fonts';
import colors from 'config/colors';
import constants from 'config/constants';

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];

export default function MyScrollableTabView(props) {
  const navigation = props.navigation;
  const labels = props.labels;
  const content = props.content;
  const searchValue = props.searchValue;
  const products = props.products;
  const retailerData = props.retailerData;
  const category = props.category;

  const [current, setCurrent] = React.useState(category + 1);

  React.useEffect(() => {
    setCurrent(category + 1);
  }, [category]);

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
  return (
    <ScrollableTabView
      style={styles.tabView}
      initialPage={current}
      tabBarUnderlineStyle={{
        height: 0,
        borderBottomWidth: 1,
        borderBottomColor: colors.primary,
      }}
      tabBarTextStyle={{fontSize: 15, fontFamily: fonts.sfProTextLight}}
      tabBarActiveTextColor={colors.primary}
      tabBarInactiveTextColor={colors.greyWhite}
      renderTabBar={() => (
        <ScrollableTabBar style={{borderBottomWidth: 0, marginBottom: 16}} />
      )}>
      {labels.map((label, index) => {
        return (
          <FlatList
            key={label}
            tabLabel={label}
            data={content[index].filter((item) => {
              return item.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })}
            renderItem={renderRetailerItem}
            keyExtractor={(item) => item.id.toString()}
          />
        );
      })}
    </ScrollableTabView>
  );
}

const styles = StyleSheet.create({
  tabView: {
    marginTop: 30,
    backgroundColor: colors.primaryBackgroundColor,
  },
});
