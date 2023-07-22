import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';
import {enumToReadableString} from '../../utils/String';
import GradientButton from './GradientButton';

interface PopupModalProps {
  message: string;
  isOpen: boolean;
  type: 'WARNING' | 'ERROR' | 'INFO';
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
        <View style={styles.buttonContainer}>
          <GradientButton
            title={'Understood'}
            onClick={props.onDismiss}
            gradients={Constants.POSITIVE_GRADIENT}
          />
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
  buttonContainer: {
    marginTop: 20,
  },
});

export default PopupModal;
