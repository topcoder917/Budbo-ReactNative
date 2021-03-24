import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import RetailerItem from './RetailerItem';
import PuffItem from '../puff/PuffItem';

import fonts from 'config/fonts';
import colors from 'config/colors';
import constants from 'config/constants';

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];

export default function BrandTabView(props) {
  const navigation = props.navigation;
  const labels = props.labels;
  const content = props.content;
  const searchValue = props.searchValue;
  const products = props.products;
  const brandData = props.brandData;

  const renderBrandItem = ({item}) => {
    let data = {
      id: item.id,
      name: item.name,
      image: {
        uri:
          item.image != ''
            ? item.image
            : 'https://via.placeholder.com/150x150?text=PRODUCT',
      },
      content: item.description,
      class1: productCategories[item.category],
      class2: item.types.map((type) => productTypes[type]).join(' '),
      volumn: '1/8oz',
      price: item.prices[3],
    };

    return (
      <PuffItem
        item={data}
        onPress={() => {
          navigation.navigate('BrandAvailableLocation', {
            productId: item.id,
            products: products,
          });
        }}
      />
    );
  };
  return (
    <ScrollableTabView
      style={styles.tabView}
      initialPage={0}
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
            tabLabel={label}
            data={content[index].filter((item) => {
              return item.name
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })}
            renderItem={renderBrandItem}
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
