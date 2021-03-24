import React from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';

import ProgressBar from '../common/ProgressBar';
import GradientSlider from '../common/GradientSlider';
import fonts from 'config/fonts';
import colors from 'config/colors';

const screenWidth = Math.round(Dimensions.get('window').width);

const Item = ({item, onPress, style, handleChange}) => (
  <View
    style={{width: '50%', paddingLeft: 8, paddingRight: 8, marginBottom: 16}}>
    <Text style={styles.barTitle}>
      {item.name} | {parseFloat(item.value).toFixed(0)}%
    </Text>
    <GradientSlider
      initValue={parseInt(item.value)}
      width={screenWidth / 2 - 40}
      onChange={(val) => {
        handleChange(item.key, val);
      }}
    />
  </View>
);

export default function ReviewCharacteristics(props) {
  const attributes = props.attributes;

  let DATA = [
    {
      id: 'characteristic-01',
      title: 'Happy',
      key: 'happy',
      value: attributes.happy,
    },
    {
      id: 'characteristic-02',
      title: 'Stress Relief',
      key: 'stress',
      value: attributes.stress,
    },
    {
      id: 'characteristic-03',
      title: 'Euphoric',
      key: 'euphoric',
      value: attributes.euphoric,
    },
    {
      id: 'characteristic-04',
      title: 'Depression Relief',
      key: 'depression',
      value: attributes.depression,
    },
    {
      id: 'characteristic-05',
      title: 'Uplifted',
      key: 'uplifted',
      value: attributes.uplifted,
    },
    {
      id: 'characteristic-06',
      title: 'Pain Relief',
      key: 'pain',
      value: attributes.pain,
    },
    {
      id: 'characteristic-07',
      title: 'Creativity Booster',
      key: 'creativity',
      value: attributes.creativity,
    },
    {
      id: 'characteristic-08',
      title: 'Loss of Appetite',
      key: 'appetite',
      value: attributes.appetite,
    },
    {
      id: 'characteristic-09',
      title: 'Relaxed',
      key: 'relaxed',
      value: attributes.relaxed,
    },
    {
      id: 'characteristic-10',
      title: 'Insomnia',
      key: 'insomnia',
      value: attributes.insomnia,
    },
  ];
  const [attr, setAttr] = React.useState(attributes);
  const [data, setData] = React.useState(DATA);

  const renderItem = ({item}) => {
    return <Item item={item} handleChange={handleChange} />;
  };

  const handleChange = (key, value) => {
    let res = attr;
    res[key] = value;
    setAttr(res);
    props.handleAttributes(res);

    let changeData = data.map((item) => item);
    changeData.forEach((item) => {
      if (item.key == key) {
        item.value = value;
      }
    });
    setData(changeData);
  };

  return (
    <>
      <Text style={styles.title}>Attributes</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
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
