import {StyleSheet} from 'react-native';
import Constants from './Constants';

export const defaultStyles = StyleSheet.create({
  container: {
    padding: Constants.CONTAINER_PADDING_MARGIN * 2,
  },
  footnote: {
    opacity: 0.5,
    fontSize: 11,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 22,
    lineHeight: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  h3: {
    fontSize: 20,
    lineHeight: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  h4: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  whiteTextColor: {
    color: 'white',
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  zIndex10: {
    zIndex: 10,
  },
  clickableText: {
    color: '#41E1B4',
  },
  remarkInput: {
    backgroundColor: 'lightgrey',
    margin: 2,
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    marginTop: Constants.CONTAINER_PADDING_MARGIN,
    minHeight: 50,
  },
});
