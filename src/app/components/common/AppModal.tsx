import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';
import {ViewStyle} from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

interface AppModalProps {
  isVisible: boolean;
  onDismiss: () => void;
  children: React.ReactNode;
  onBackdropPress?: () => void;
  onBackButtonPress?: () => void;
  containerStyles?: StyleProp<ViewStyle>;
}

const AppModal: React.FC<AppModalProps> = props => {
  return (
    <Modal
      isVisible={props.isVisible}
      onBackdropPress={props.onBackdropPress ?? props.onDismiss}
      onBackButtonPress={props.onBackButtonPress ?? props.onDismiss}
      onDismiss={props.onDismiss}>
      <LinearGradient
        colors={Constants.SECONDARY_GRADIENT}
        style={[props.containerStyles, styles.container]}>
        {props.children}
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
});
export default AppModal;
