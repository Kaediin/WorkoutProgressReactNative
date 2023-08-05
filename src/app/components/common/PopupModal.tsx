import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';
import {enumToReadableString} from '../../utils/String';
import GradientButton from './GradientButton';
import {defaultStyles} from '../../utils/DefaultStyles';

interface PopupModalProps {
  message: string;
  isOpen: boolean;
  type: 'WARNING' | 'ERROR' | 'INFO';
  onConfirm?: () => void;
  onDismiss: () => void;
  overrideGradient?: (string | number)[];
}

const PopupModal: React.FC<PopupModalProps> = props => {
  return (
    <Modal
      isVisible={props.isOpen}
      onDismiss={props.onDismiss}
      onBackdropPress={props.onDismiss}>
      <LinearGradient
        style={styles.container}
        colors={
          props.overrideGradient
            ? props.overrideGradient
            : props.type === 'WARNING'
            ? Constants.SECONDARY_GRADIENT
            : props.type === 'ERROR'
            ? Constants.ERROR_GRADIENT
            : ['#ffffff', '#cccccc']
        }>
        <Text style={styles.header}>{enumToReadableString(props.type)}</Text>
        <Text>{props.message}</Text>
        <View style={[defaultStyles.spaceBetween, defaultStyles.marginTop]}>
          <GradientButton
            title={props.onConfirm ? 'Dismiss' : 'Understood'}
            onClick={props.onDismiss}
            gradients={Constants.SECONDARY_GRADIENT_FADED}
            styles={[defaultStyles.flex1, styles.margin]}
          />
          {props.onConfirm && (
            <GradientButton
              title={'Confirm'}
              onClick={props.onConfirm}
              gradients={Constants.TERTIARY_GRADIENT}
              styles={defaultStyles.flex1}
            />
          )}
        </View>
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Constants.CONTAINER_PADDING_MARGIN * 2,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: Constants.CONTAINER_PADDING_MARGIN,
    textAlign: 'center',
  },
  margin: {
    marginRight: 10,
  },
});

export default PopupModal;
