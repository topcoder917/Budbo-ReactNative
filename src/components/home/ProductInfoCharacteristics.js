import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';

import ProgressBar from '../common/ProgressBar';
import fonts from 'config/fonts';
import colors from 'config/colors';

const Item = ({item, onPress, style}) => (
  <View
    style={{width: '50%', paddingLeft: 8, paddingRight: 8, marginBottom: 16}}>
    <Text style={styles.barTitle}>
      {item.title} | {item.value}%
    </Text>
    <ProgressBar value={Number(item.value)} />
  </View>
);

export default function ProductInfoCharacteristics(props) {
  const attributes = props.attributes;
  const renderItem = ({item}) => {
    return <Item item={item} onPress={() => {}} />;
  };

  let DATA = [
    {
      id: 'characteristic-01',
      title: 'Happy',
      value: attributes.happy,
    },
    {
      id: 'characteristic-02',
      title: 'Stress Relief',
      value: attributes.stress,
    },
    {
      id: 'characteristic-03',
      title: 'Euphoric',
      value: attributes.euphoric,
    },
    {
      id: 'characteristic-04',
      title: 'Depression Relief',
      value: attributes.depression,
    },
    {
      id: 'characteristic-05',
      title: 'Uplifted',
      value: attributes.uplifted,
    },
    {
      id: 'characteristic-06',
      title: 'Pain Relief',
      value: attributes.pain,
    },
    {
      id: 'characteristic-07',
      title: 'Creativity Booster',
      value: attributes.creativity,
    },
    {
      id: 'characteristic-08',
      title: 'Loss of Appetite',
      value: attributes.appetite,
    },
    {
      id: 'characteristic-09',
      title: 'Relaxed',
      value: attributes.relaxed,
    },
    {
      id: 'characteristic-10',
      title: 'Insomnia',
      value: attributes.insomnia,
    },
  ];

  return (
    <>
      <Text style={styles.title}>Attributes</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    width: '100%',
    fontSize: 16,
    fontFamily: fonts.sfProTextBold,
    color: colors.soft,
    paddingBottom: 5,
    borderBottomColor: colors.greyWhite,
    borderBottomWidth: 1,
    marginBottom: 10,
    paddingLeft: 15,
  },
  barTitle: {
    fontSize: 12,
    fontFamily: fonts.sfProTextRegular,
    color: colors.greyWhite,
    marginBottom: 7,
  },
});
