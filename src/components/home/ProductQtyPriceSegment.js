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

export default function ProductQtyPriceSegment(props) {
  const price = props.price;
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [count, setCount] = React.useState(1);
  return (
    <View
      style={{
        width: screenWidth,
        marginTop: 26,
        paddingLeft: 32,
        paddingRight: 32,
      }}>
      <Text style={styles.price}>
        ${price ? parseFloat(price * count).toFixed(2) : ''}
      </Text>
      <View
        style={{
          height: 24,
          marginTop: 9,
          // backgroundColor: colors.headerTitleBack,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            borderRadius: 12,
            backgroundColor: colors.headerTitleBack,
            width: 100,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (price) {
                if (count > 1) {
                  setCount(count - 1);
                  props.handleQuantity(count - 1);
                }
              }
            }}>
            <Text style={styles.itemText}>-</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderRadius: 12,
            backgroundColor: colors.headerTitleBack,
            width: 100,
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
            {count}
          </Text>
        </View>
        <View
          style={{
            borderRadius: 12,
            backgroundColor: colors.headerTitleBack,
            width: 109,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (price) {
                setCount(count + 1);
                props.handleQuantity(count + 1);
              }
            }}>
            <Text style={styles.itemText}>+</Text>
          </TouchableOpacity>
        </View>
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
  price: {
    color: colors.primary,
    fontSize: 11,
    textAlign: 'right',
    fontFamily: fonts.sfProTextRegular,
    width: '100%',
  },
});
