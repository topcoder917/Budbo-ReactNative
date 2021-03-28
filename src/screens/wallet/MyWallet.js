import React from 'react';
import {StyleSheet, View, FlatList} from 'react-native';

import colors from 'config/colors';
import fonts from 'config/fonts';

import WalletCard from 'components/wallet/WalletCard';
import MyWalletItem from 'components/wallet/MyWalletItem';

const data = [
  {
    title: 'The Budbo Token',
    description: '(BUBO)',
    price: '3200.419',
    image: require('assets/imgs/wallet/my_wallet1.png'),
  },
  {
    title: 'Ethereum',
    description: '(ETH)',
    price: '2.891',
    image: require('assets/imgs/wallet/my_wallet2.png'),
  },
  {
    title: 'Matic Network',
    description: '(MATIC)',
    price: '11034.341',
    image: require('assets/imgs/wallet/my_wallet3.png'),
  },
];

export default function MyWallet(props) {
  const onSelect = (item) => {};

  const renderItem = ({item}) => {
    return <MyWalletItem {...item} onPress={() => onSelect(item)} />;
  };

  return (
    <View style={styles.container}>
      <WalletCard />
      {/* <View style={styles.spaceLine} /> */}
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={data || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => renderItem(item)}
      />
    </View>
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
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 6,
  },
  listContentContainer: {
    marginTop: 20,
    marginBottom: 6,
  },
  textTitle: {
    fontSize: 17,
    color: colors.soft,
    fontFamily: fonts.sfProTextBold,
    marginBottom: 6,
  },
});
