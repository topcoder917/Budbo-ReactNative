/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect, useRef} from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';

import constants from 'config/constants';
import colors from 'config/colors';
import fonts from 'config/fonts';
import {setOrders} from 'budboRedux/actions/orderActions';

import HeaderMenu from 'components/common/HeaderMenu';
import HeaderAddressBar from 'components/common/HeaderAddressBar';
import HeaderCart from 'components/common/HeaderCart';
import Exchange from './Exchange';
import MyWallet from './MyWallet';
import OrderHistory from './OrderHistory';

function Wallet(props) {
  const [isFetching, setIsFetching] = useState(false);

  let scrollTabRef = useRef(null);

  useEffect(() => {
    setNavigationBar();

    const unsubscribe = props.navigation.addListener('focus', () => {
      fetchOrders();
      const {params} = props.route;
      if (
        params &&
        params.currentTab &&
        params.currentTab === 'Order History'
      ) {
        setTimeout(() => {
          scrollTabRef.current.goToPage(2);
        }, 500);
      }
    });

    return unsubscribe;
  }, []);

  const setNavigationBar = () => {
    props.navigation.setOptions({
      headerLeft: () => <HeaderMenu navigation={props.navigation} />,
      headerTitle: () => <HeaderAddressBar />,
      headerRight: () => <HeaderCart />,
    });
  };

  const fetchOrders = () => {
    setIsFetching(true);
    fetch(constants.baseApiUrl + `api/orders/user/${props.user.id}`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('response: ', JSON.stringify(data));
        const orders = [];
        data.orders.map((order) => {
          orders.push({
            ...order,
            products: JSON.parse(order.products),
            rates: JSON.parse(order.rates),
            totals: JSON.parse(order.totals),
          });
        });

        if (props.setOrders && orders) {
          props.setOrders(orders);
        }
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setIsFetching(false);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.texTitle}>Wallet</Text>
      <ScrollableTabView
        ref={scrollTabRef}
        style={styles.scrollableTabBarContainer}
        tabBarUnderlineStyle={styles.tabBarUnderline}
        tabBarTextStyle={styles.textTabBar}
        tabBarActiveTextColor={colors.primary}
        tabBarInactiveTextColor={colors.greyWhite}
        initialPage={0}
        renderTabBar={() => <DefaultTabBar style={styles.scrollableTabBar} />}>
        <Exchange tabLabel="Exchange" />
        <MyWallet tabLabel="My Wallet" />
        <OrderHistory
          tabLabel="Order History"
          navigation={props.navigation}
          isFetching={isFetching}
        />
      </ScrollableTabView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  setOrders,
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 12,
    backgroundColor: colors.primaryBackgroundColor,
  },
  texTitle: {
    width: '100%',
    color: colors.soft,
    fontSize: 36,
    fontFamily: fonts.sfProTextBold,
    marginVertical: 15,
    marginLeft: 37,
  },
  scrollableTabBarContainer: {},
  tabBarUnderline: {
    height: 1,
    backgroundColor: colors.primary,
  },
  textTabBar: {
    fontSize: 15,
    fontFamily: fonts.sfProTextLight,
  },
  scrollableTabBar: {
    borderBottomColor: colors.secondaryBackgroundColor,
    marginVertical: 13,
  },
});
