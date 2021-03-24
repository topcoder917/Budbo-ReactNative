import React, {useState} from 'react';
import {View, ViewPropTypes, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Slider from 'react-native-simple-slider';
import LinearGradient from 'react-native-linear-gradient';

import colors from 'config/colors';
import fonts from 'config/fonts';

export default function GradientSlider(props) {
  const [value, setValue] = useState(props.initValue || 0);
  const [unfillWidth, setUnfillWidth] = useState(
    ((100 - props.initValue) * props.width) / 100,
  );

  const renderTitle = () => {
    if (!props.title) {
      return null;
    }

    return (
      <Text
        style={[
          styles.textTitle,
          {color: value > 0 ? colors.white : colors.greyWhite},
        ]}>
        {props.title}
      </Text>
    );
  };

  return (
    <View style={[styles.container, props.style]}>
      {renderTitle()}
      <View style={styles.contentContainer}>
        <LinearGradient
          style={styles.fillContainer}
          colors={[
            colors.firstGradientColor,
            colors.secondGradientColor,
            colors.thirdGradientColor,
          ]}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
        />
        <View style={[styles.unfillContainer, {width: unfillWidth}]} />
        <Slider
          value={value}
          sliderHeight={4.5}
          sliderWidth={props.width}
          minimumValue={0}
          maximumValue={100}
          thumbButtonSize={12}
          thumbTintColor={
            value < 50 ? colors.thirdGradientColor : colors.firstGradientColor
          }
          onValueChange={(val) => {
            setValue(val);
            setUnfillWidth(((100 - val) * props.width) / 100);
          }}
          disabledHoverEffect={false}
          minimumTrackTintColor="rgba(255, 255, 255, 0)"
          maximumTrackTintColor="rgba(255, 255, 255, 0)"
          onSlidingComplete={(val) => {
            setUnfillWidth(((100 - val) * props.width) / 100);
            props.onChange(val);
          }}
        />
      </View>
    </View>
  );
}

GradientSlider.defaultProps = {
  style: {},
  initValue: 0,
  onChange: () => {},
};

GradientSlider.propTypes = {
  style: ViewPropTypes.style,
  title: PropTypes.string,
  initValue: PropTypes.number,
  width: PropTypes.number,
  onChange: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {},
  textTitle: {
    fontSize: 14,
    fontFamily: fonts.sfProTextRegular,
  },
  contentContainer: {
    height: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fillContainer: {
    width: '100%',
    height: 4.5,
    borderRadius: 2.5,
    position: 'absolute',
  },
  unfillContainer: {
    height: 4.5,
    borderRadius: 2,
    backgroundColor: '#323B56',
    position: 'absolute',
    right: 0,
  },
});
