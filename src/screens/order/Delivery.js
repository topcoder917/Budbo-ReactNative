import React from 'react';
import {StyleSheet, View, Text, FlatList, ScrollView} from 'react-native';

import colors from 'config/colors';
import fonts from 'config/fonts';
import {openLink} from 'config/utils';

// import ExchangeChart from 'components/wallet/ExchangeChart';
// import ExchangeItem from 'components/wallet/ExchangeItem';

const data = [
  {
    title: 'Uniswap.org',
    description: 'Liquidity Pool and Token Swap',
    url: 'https://uniswap.org',
    image: require('assets/imgs/wallet/exchange1.png'),
  },
  {
    title: 'WhiteBIT.com',
    description: 'BTC, ETH, USDT Pairs',
    url: 'https://whitebit.com',
    image: require('assets/imgs/wallet/exchange2.png'),
  },
  {
    title: 'ForkDelta',
    description: 'ETH Pairs',
    url: 'https://forkdelta.app',
    image: require('assets/imgs/wallet/exchange3.png'),
  },
];

export default function Delivery(props) {
  const onSelect = (item) => {
    openLink(item.url);
  };

  const onGo = async (url) => {
    openLink(url);
  };

  const renderItem = ({item}) => {
    return (
      <ExchangeItem
        {...item}
        onPress={() => onSelect(item)}
        onGo={() => onGo(item.url)}
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* <ExchangeChart />
      <View style={styles.spaceLine} />
      <View style={styles.contentContainer}>
        <Text style={styles.textTitle}>Budbo Token(BUBO) Listings</Text>
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={data || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => renderItem(item)}
        />
      </View> */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  spaceLine: {
    height: 1,
    backgroundColor: colors.lightPurple,
    opacity: 0.7,
    marginVertical: 13,
    marginHorizontal: 16,
  },
  contentContainer: {},
  listContentContainer: {
    marginBottom: 6,
  },
  textTitle: {
    fontSize: 17,
    color: colors.soft,
    fontFamily: fonts.sfProTextBold,
    marginHorizontal: 24,
    marginBottom: 6,
  },
});
