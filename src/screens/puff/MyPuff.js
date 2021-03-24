import React from 'react';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import colors from 'config/colors';
import fonts from 'config/fonts';
import constants from 'config/constants';

import HeaderBar from 'components/common/HeaderBar';
import PuffItem from 'components/puff/PuffItem';
import MyPuffTabView from 'components/puff/MyPuffTabView';

import {connect} from 'react-redux';
import {refreshHome} from 'budboRedux/actions/homeActions';

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];

function MyPuff(props) {
  const navigation = props.navigation;

  // const renderPuffItem = ({item}) => {
  //   let data = {
  //     name: item.name,
  //     image: {
  //       uri:
  //         item.image != ''
  //           ? item.image
  //           : 'https://via.placeholder.com/150x150?text=PRODUCT',
  //     },
  //     class1: productCategories[item.category],
  //     class2: item.types.map((type) => productTypes[type]).join(' '),
  //     volumn: '1/8oz',
  //     price: item.prices[3],
  //   };
  //   return (
  //     <PuffItem
  //       item={data}
  //       onPress={() => {
  //         // setSelectedId(item.id)
  //         navigation.navigate('AvailableLocation', {
  //           productId: item.id,
  //           products: myPuffs,
  //         });
  //       }}
  //     />
  //   );
  // };

  return (
    <SafeAreaView style={styles.homeContainer}>
      <HeaderBar
        leftButton="back"
        onLeftPress={() => {
          props.refreshHome(props.refreshCount + 1);
          navigation.pop();
        }}
      />
      <Text style={styles.title}>My Puffs</Text>
      {props.puff.length > 0 && <MyPuffTabView navigation={navigation} />}
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  puff: state.puff.puffProducts,
  refreshCount: state.home.refreshCount,
});

const mapDispatchToProps = {
  refreshHome,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPuff);

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primaryBackgroundColor,
    paddingTop: 12,
  },
  title: {
    width: '100%',
    color: colors.soft,
    fontSize: 36,
    fontFamily: fonts.sfProTextBold,
    marginTop: 19,
    paddingLeft: 48,
  },
  tabView: {
    marginTop: 10,
  },
});
