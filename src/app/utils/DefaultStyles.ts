import {StyleSheet} from 'react-native';
import Constants from './Constants';

export const defaultStyles = StyleSheet.create({
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  marginHorizontal: {
    marginHorizontal: Constants.CONTAINER_PADDING_MARGIN,
  },
  marginVertical: {
    marginVertical: Constants.CONTAINER_PADDING_MARGIN,
  },
  container: {
    margin: Constants.CONTAINER_PADDING_MARGIN,
  },
  marginTop50: {
    marginTop: 50,
  },
  marginTopLarge: {
    marginTop: 100,
  },
  marginTop: {
    marginTop: Constants.CONTAINER_PADDING_MARGIN,
  },
  footnote: {
    color: '#ccc',
    fontSize: 11,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
  textAlignRight: {
    textAlign: 'right',
  },
  h1: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
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
  p20: {
    fontSize: 20,
    lineHeight: 24,
  },
  p14: {
    fontSize: 14,
    lineHeight: 20,
  },
  whiteTextColor: {
    color: 'white',
  },
  spaceBetween: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  justifyCenter: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  spaceEvenly: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  zIndex10: {
    zIndex: 10,
  },
  clickableText: {
    color: '#41E1B4',
  },
  disabledText: {
    color: '#ccc',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputWithHeight: {
    backgroundColor: 'lightgrey',
    margin: 2,
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    marginTop: Constants.CONTAINER_PADDING_MARGIN,
  },
  textAreaInput: {
    backgroundColor: 'lightgrey',
    margin: 2,
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    marginTop: Constants.CONTAINER_PADDING_MARGIN,
    minHeight: 50,
  },
  p11: {
    fontSize: 11,
  },
  p9: {
    fontSize: 9,
  },
  textInput: {
    backgroundColor: 'lightgrey',
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  marginBottom: {
    marginBottom: Constants.CONTAINER_PADDING_MARGIN,
  },
  error: {
    color: 'red',
    fontSize: 12,
    textAlign: 'center',
  },
  flex1: {
    flex: 1,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  blackTextColor: {
    color: 'black',
  },
  absoluteCenterContent: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerInRow: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgrey',
    width: '100%',
  },
  separatorWithHeight: {
    height: 1,
    backgroundColor: 'lightgrey',
    width: '100%',
    marginVertical: Constants.CONTAINER_PADDING_MARGIN * 2,
  },
});
