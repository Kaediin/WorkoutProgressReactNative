import React from 'react';
import Modal from 'react-native-modal';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Constants from '../../utils/Constants';
import {enumToReadableString} from '../../utils/String';
import GradientButton from './GradientButton';
import {defaultStyles} from '../../utils/DefaultStyles';
import AppText from './AppText';

interface PopupModalProps {
  message: string;
  isOpen: boolean;
  type: 'WARNING' | 'ERROR' | 'INFO';
  onConfirm?: () => void;
  onDismiss: () => void;
  overrideGradient?: (string | number)[];
  overrideTitle?: string;
  overrideConfirmGradient?: string[];
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
        <AppText style={defaultStyles.h1}>
          {props.overrideTitle
            ? props.overrideTitle
            : enumToReadableString(props.type)}
        </AppText>
        <AppText style={defaultStyles.container}>{props.message}</AppText>
        {props.type !== 'ERROR' && (
          <View style={[defaultStyles.spaceBetween, defaultStyles.marginTop]}>
            <GradientButton
              title={props.onConfirm ? 'Cancel' : 'Understood'}
              onPress={props.onDismiss}
              gradients={Constants.TERTIARY_GRADIENT}
              styles={[defaultStyles.flex1, styles.margin]}
            />
            {props.onConfirm && (
              <GradientButton
                title={'Confirm'}
                onPress={props.onConfirm}
                gradients={
                  props.overrideConfirmGradient || Constants.TERTIARY_GRADIENT
                }
                styles={defaultStyles.flex1}
              />
            )}
          </View>
        )}
      </LinearGradient>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: Constants.CONTAINER_PADDING_MARGIN * 2,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  margin: {
    marginRight: 10,
  },
});

export default PopupModal;
