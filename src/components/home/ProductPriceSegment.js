import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';

import fonts from 'config/fonts';
import colors from 'config/colors';

const screenWidth = Math.round(Dimensions.get('window').width);

export default function ProductPriceSegment(props) {
  const prices = props.prices;
  const [selectedIndex, setSelectedIndex] = React.useState(
    prices[3] ? 2 : prices[2] ? 1 : prices[1] ? 0 : null,
  );

  React.useEffect(() => {
    setSelectedIndex(prices[3] ? 2 : prices[2] ? 1 : prices[1] ? 0 : null);
  }, [prices]);
  return (
    <View
      style={{
        width: screenWidth,
        height: 24,
        // backgroundColor: colors.headerTitleBack,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 26,
        paddingLeft: 32,
        paddingRight: 32,
      }}>
      <View
        style={{
          borderRadius: 12,
          backgroundColor: colors.headerTitleBack,
          width: 109,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (prices[1]) {
              setSelectedIndex(0);
              props.handlePriceIndex(1);
            }
          }}>
          <Text
            style={
              selectedIndex != 0
                ? styles.itemText
                : [
                    styles.itemText,
                    {
                      borderColor: colors.primary,
                      borderWidth: 1,
                    },
                  ]
            }>
            1g • ${prices[1] ? parseFloat(prices[1]).toFixed(2) : ''}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderRadius: 12,
          backgroundColor: colors.headerTitleBack,
          width: 100,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (prices[3]) {
              setSelectedIndex(2);
              props.handlePriceIndex(3);
            }
          }}>
          <Text
            style={
              selectedIndex != 2
                ? styles.itemText
                : [
                    styles.itemText,
                    {
                      borderColor: colors.primary,
                      borderWidth: 1,
                    },
                  ]
            }>
            1/8oz • ${prices[3] ? parseFloat(prices[3]).toFixed(2) : ''}
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderRadius: 12,
          backgroundColor: colors.headerTitleBack,
          width: 100,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (prices[2]) {
              setSelectedIndex(1);
              props.handlePriceIndex(2);
            }
          }}>
          <Text
            style={
              selectedIndex != 1
                ? styles.itemText
                : [
                    styles.itemText,
                    {
                      borderColor: colors.primary,
                      borderWidth: 1,
                    },
                  ]
            }>
            1/4oz • ${prices[2] ? parseFloat(prices[2]).toFixed(2) : ''}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemText: {
    height: Platform.OS == 'ios' ? 25 : 'auto',
    color: colors.primary,
    fontSize: 11,
    textAlign: 'center',
    fontFamily: fonts.sfProTextRegular,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 6,
    paddingBottom: 5,
    borderRadius: 12,
    // backgroundColor: colors.headerTitleBack,
  },
});
