import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {TextStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {defaultStyles} from '../../utils/DefaultStyles';

interface AppTextProps {
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
  h0?: boolean;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  p?: boolean;
  caption?: boolean;
  callout?: boolean;
  semibold?: boolean;
  weightSix?: boolean;
  regular?: boolean;
  weightSeven?: boolean;
  bold?: boolean;
  italic?: boolean;
  headline?: boolean;
  bodyMedium?: boolean;
  bodySmall?: boolean;
  pickerHeader?: boolean;
  pickerCaption?: boolean;
  subHead?: boolean;
  xSmall?: boolean;
  small?: boolean;
  T1?: boolean;
  T2?: boolean;
  footNote?: boolean;
  h1Menco?: boolean;
  h2Menco?: boolean;
  h1MencoBlack?: boolean;
  centerText?: boolean;
  rightText?: boolean;
}

const AppText: React.FC<AppTextProps> = props => {
  return (
    <Text
      style={[
        defaultStyles.whiteTextColor,
        props.style,
        props.h0 && styles.h0,
        props.h1 && styles.h1,
        props.h1Menco && styles.h1Menco,
        props.h2Menco && styles.h2Menco,
        props.h1MencoBlack && styles.h1MencoBlack,
        props.h2 && styles.h2,
        props.h3 && styles.h3,
        props.h4 && styles.h4,
        props.h5 && styles.headline,
        props.headline && styles.headline,
        props.bodyMedium && styles.bodyMedium,
        props.bodySmall && styles.bodySmall,
        props.pickerHeader && styles.pickerHeader,
        props.pickerCaption && styles.pickerCaption,
        props.subHead && styles.subHead,
        props.small && styles.bodySmall,
        props.xSmall && styles.bodyXS,
        props.p && styles.bodySmall,
        props.caption && styles.caption,
        props.callout && styles.callout,
        props.footNote && styles.footNote,
        props.T1 && styles.T1,
        props.T2 && styles.T2,
        props.bold && styles.bold,
        props.italic && styles.italic,
        props.semibold && styles.semibold,
        props.weightSix && styles.weightSix,
        props.weightSeven && styles.weightSeven,
        props.centerText && defaultStyles.textAlignCenter,
        props.rightText && defaultStyles.textAlignRight,
      ]}
      onPress={props.onPress}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  h0: {
    fontSize: 36,
    lineHeight: 41,
    fontWeight: '900',
  },
  h1x: {
    fontSize: 34,
    lineHeight: 41,
    fontWeight: 'bold',
  },
  h1MencoBlack: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    // fontFamily: 'Menco-Black',
  },
  h1Menco: {
    fontSize: 36,
    lineHeight: 34,
    fontWeight: '900',
    // fontFamily: 'Menco-Bold',
  },
  h2Menco: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    // fontFamily: 'Menco-Bold',
  },
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
    // fontFamily: 'OpenSans-Regular',
  },
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700',
    // fontFamily: 'OpenSans-Regular',
  },
  h3: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: '600',
    // fontFamily: 'OpenSans-Regular',
  },
  h4: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    // fontFamily: 'OpenSans-Regular',
  },
  headline: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '600',
    // fontFamily: 'OpenSans-Regular',
  },
  bodyMedium: {
    fontSize: 17,
    lineHeight: 22,
    // fontFamily: 'OpenSans-SemiBold',
  },
  bodyItalic: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '400',
    fontStyle: 'italic',
    // fontFamily: 'OpenSans-Regular',
  },
  callout: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '400',
    // fontFamily: 'OpenSans-Regular',
  },
  bodyXS: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    // fontFamily: 'OpenSans-Regular',
  },
  bodySmall: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '400',
    // fontFamily: 'OpenSans-Regular',
  },
  pickerHeader: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    // fontFamily: 'OpenSans-Regular',
  },
  pickerCaption: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: 'normal',
    // fontFamily: 'OpenSans-Regular',
  },
  footNote: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400',
    // fontFamily: 'OpenSans-Regular',
  },
  subHead: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '600',
    // fontFamily: 'OpenSans-Regular',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400',
    // fontFamily: 'OpenSans-Regular',
  },
  T1: {
    opacity: 0.7,
  },
  T2: {
    opacity: 0.5,
  },
  semibold: {
    fontWeight: '500',
  },
  weightSix: {
    fontWeight: '600',
  },
  weightSeven: {
    fontWeight: '700',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  txtStyle: {
    color: 'white',
  },
});
export default AppText;
