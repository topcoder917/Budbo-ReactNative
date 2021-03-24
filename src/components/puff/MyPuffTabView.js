import React from 'react';
import {StyleSheet, FlatList, View, Text, Platform} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';

import PuffItem from './PuffItem';

import fonts from 'config/fonts';
import colors from 'config/colors';
import constants from 'config/constants';

import {connect} from 'react-redux';
import {removePuff} from 'budboRedux/actions/puffActions';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const productTypes = ['Indica', 'Sativa', 'Hybrid', 'CBD'];
const productCategories = ['Flower', 'Edible', 'Concentrate', 'Deal'];

function MyPuffTabView(props) {
  const navigation = props.navigation;
  const [labels, setLabels] = React.useState([]);
  const [content, setContent] = React.useState([]);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const insets = useSafeAreaInsets();

  const handleDelete = (productId) => {
    props.removePuff(productId);
  };

  const renderPuffItem = ({item}) => {
    let data = {
      id: item.id,
      name: item.name,
      image: {
        uri:
          item.image != ''
            ? item.image
            : 'https://via.placeholder.com/150x150?text=PRODUCT',
      },
      class1: productCategories[item.category],
      class2: item.types.map((type) => productTypes[type]).join(' '),
      volumn: '1/8oz',
      content: item.description,
      price: item.prices[3],
    };
    return (
      <PuffItem
        item={data}
        onPress={() => {
          // setSelectedId(item.id)
          navigation.navigate('AvailableLocation', {
            productId: item.id,
            products: props.puff,
          });
        }}
        handleDelete={handleDelete}
      />
    );
  };

  React.useEffect(() => {
    let myPuffs = props.puff;
    let labels = [];
    let content = [];
    const flowerData = myPuffs.filter((item) => {
      return item.category == 0;
    });
    if (flowerData.length > 0) {
      labels.push('Flower');
      content.push(flowerData);
    }
    const concentrateData = myPuffs.filter((item) => {
      return item.category == 2;
    });
    if (concentrateData.length > 0) {
      labels.push('Concentrates');
      content.push(concentrateData);
    }
    const edibleData = myPuffs.filter((item) => {
      return item.category == 1;
    });
    if (edibleData.length > 0) {
      labels.push('Edibles');
      content.push(edibleData);
    }
    const dealData = myPuffs.filter((item) => {
      return item.category == 3;
    });
    if (dealData.length > 0) {
      labels.push('Deals');
      content.push(dealData);
    }
    setLabels(labels);
    setContent(content);
  }, [props.puff]);

  const handleChange = (obj) => {
    setSelectedIndex(obj.i);
  };

  return (
    <View>
      <ScrollableTabView
        style={styles.tabView}
        initialPage={0}
        onChangeTab={handleChange}
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
            <Text
              tabLabel={label}
              // data={content[index]}
              // renderItem={renderPuffItem}
              keyExtractor={(item) => item.id.toString()}
            />
          );
        })}
      </ScrollableTabView>
      <View
        style={{
          ...styles.tabContent,
          height:
            Platform.OS == 'android'
              ? constants.screenHeight - 81 - 212
              : constants.screenHeight - 81 - insets.top - insets.bottom - 160,
        }}>
        <FlatList
          data={content[selectedIndex]}
          renderItem={renderPuffItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => ({
  puff: state.puff.puffProducts,
});

const mapDispatchToProps = {
  removePuff,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPuffTabView);

const styles = StyleSheet.create({
  tabView: {
    marginTop: 30,
    backgroundColor: colors.primaryBackgroundColor,
  },
  tabContent: {
    position: 'absolute',
    width: constants.screenWidth,
    left: 0,
    top: 81,
    paddingTop: 16,
  },
});
