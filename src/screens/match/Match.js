/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import colors from 'config/colors';
import constants from 'config/constants';
// import fonts from 'config/fonts';
// import {wp} from 'config/utils';

import GradientSlider from 'components/common/GradientSlider';
import GradientButton from 'components/common/GradientButton';
// import HeaderMenu from 'components/common/HeaderMenu';
// import HeaderAddressBar from 'components/common/HeaderAddressBar';
// import HeaderCart from 'components/common/HeaderCart';

const DATA = [
  {title: 'Happy', value: 50},
  {title: 'Relaxed', value: 50},
  {title: 'Euphoric', value: 50},
  {title: 'Uplifted', value: 50},
  {title: 'Creativity booster', value: 50},
  {title: 'Stress relief', value: 50},
  {title: 'Depression relief', value: 50},
  {title: 'Pain relief', value: 50},
  {title: 'Loss of appetite', value: 50},
  {title: 'Insomnia', value: 50},
];

export default function Match({navigation, height}) {
  const position = new Animated.Value(constants.screenHeight);
  const [attributes, setAttributes] = React.useState(DATA);

  React.useEffect(() => {
    // setNavigationBar();

    Animated.timing(position, {
      easing: Easing.cubic,
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  // const setNavigationBar = () => {
  //   navigation.setOptions({
  //     headerLeft: () => <HeaderMenu navigation={navigation} />,
  //     headerTitle: () => <HeaderAddressBar />,
  //     headerRight: () => <HeaderCart />,
  //   });
  // };

  const handleChange = (value, index) => {
    let tempAttributes = attributes.map((item) => item);
    tempAttributes[index].value = value;
    setAttributes(tempAttributes);
    console.log(tempAttributes);
  };

  const handleFindMatch = () => {
    // navigation.navigate('MatchResults', {attributes});

    navigation.navigate('MatchTabScreens', {
      screen: 'MatchResults',
      params: {
        attributes,
      },
    });

    // navigation.dispatch(
    //   CommonActions.reset({
    //     index: 1,
    //     routes: [
    //       {name: 'MatchTabScreens'},
    //       {
    //         name: 'MatchResults',
    //         params: {attributes},
    //       },
    //     ],
    //   }),
    // );
  };

  const contentHeight = 50 * DATA.length + 56 + 40;

  return (
    <View
      style={[
        styles.container,
        {height: contentHeight > height ? contentHeight : height},
      ]}>
      <View style={styles.scrollViewContainer}>
        {attributes.map((data, index) => (
          <GradientSlider
            key={index}
            style={styles.sliderItemContainer}
            title={data.title}
            initValue={data.value}
            width={constants.screenWidth - 32}
            onChange={(value) => handleChange(value, index)}
          />
        ))}
        <GradientButton
          style={styles.findButton}
          title="Find my Match"
          onPress={() => handleFindMatch()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primaryBackgroundColor,
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 16,
    // paddingBottom: 20,
  },
  sliderItemContainer: {
    height: 30,
    marginBottom: 20,
  },
  findButton: {
    marginTop: 10,
  },
});
