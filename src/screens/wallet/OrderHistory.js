import React from 'react';
import {StyleSheet, View, Text, FlatList, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import colors from 'config/colors';
import constants from 'config/constants';
import fonts from 'config/fonts';

import OrderHistoryItem from 'components/wallet/OrderHistoryItem';
import LoadingIndicator from 'components/common/LoadingIndicator';

function OrderHistory(props) {
  const onSelectItem = (item) => {
    if (!item.id) {
      return;
    }

    AsyncStorage.getItem(constants.currentAddress)
      .then((value) => {
        if (value) {
          const currentAddress = JSON.parse(value);
          const address = {
            address: currentAddress.address,
            city: currentAddress.city,
            state: currentAddress.state,
            postal: currentAddress.postal,
            country: currentAddress.country,
            checked: true,
          };

          props.navigation.navigate('Order', {
            currentOrders: [item],
            address: address,
            pick: true,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onDetail = (url) => {};

  const renderItem = ({item}) => {
    const reatiler = props.retailers.find(
      (retailer) => retailer.id === item.retailer_id,
    );
    return (
      <OrderHistoryItem
        {...item}
        {...reatiler}
        onPress={() => onSelectItem(item)}
        onDetail={() => onDetail(item.url)}
      />
    );
  };

  const renderCurrentOrders = () => {
    const currentOrders =
      props.orders.filter(
        (item) =>
          item.status === constants.orderPending ||
          item.status === constants.orderApproved ||
          item.status === constants.orderBeingDelivered,
      ) || [];
    if (currentOrders.length === 0) {
      return null;
    }

    const sortedOrders = currentOrders.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    return (
      <>
        <Text style={styles.textTitle}>Current Orders</Text>
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={sortedOrders || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => renderItem(item)}
        />
      </>
    );
  };

  const renderPastOrders = () => {
    const pastOrders =
      props.orders.filter((item) => item.status === constants.orderDelivered) ||
      [];
    if (pastOrders.length === 0) {
      return null;
    }

    const sortedOrders = pastOrders.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });

    return (
      <>
        <Text style={styles.textTitle}>Past Orders</Text>
        <FlatList
          contentContainerStyle={styles.listContentContainer}
          data={sortedOrders || []}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => renderItem(item)}
        />
      </>
    );
  };

  return (
    <View style={styles.container}>
      <LoadingIndicator
        isLoading={props.isFetching && props.orders.length === 0}
      />
      <ScrollView style={styles.contentContainer}>
        {renderCurrentOrders()}
        {renderPastOrders()}
      </ScrollView>
    </View>
  );
}

const mapStateToProps = (state) => ({
  retailers: state.retailer.retailers,
  orders: state.order.orders,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
