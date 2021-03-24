import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import MatchItem from './MatchItem';

import fonts from 'config/fonts';
import colors from 'config/colors';
import constants from 'config/constants';

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];

export default function MatchTabView(props) {
  const navigation = props.navigation;
  const labels = props.labels;
  const content = props.content;
  const products = props.products;

  const renderMatchItem = ({item}) => {
    let data = {
      name: item.name,
      image: {
        uri:
          item.image != ''
            ? item.image
            : 'https://via.placeholder.com/150x150?text=PRODUCT',
      },
      content: item.description,
      percent: item.relation,
    };

    return (
      <MatchItem
        item={data}
        onPress={() => {
          // setSelectedId(item.id)
          navigation.navigate('AvailableLocation', {
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
            key={index}
            tabLabel={label}
            data={content[index]}
            renderItem={renderMatchItem}
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
