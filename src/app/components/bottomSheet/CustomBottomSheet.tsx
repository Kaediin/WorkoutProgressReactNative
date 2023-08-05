import React, {useCallback, useMemo} from 'react';
import Constants from '../../utils/Constants';
import {StyleSheet, View} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import ClickableText from '../common/ClickableText';

type CustomBottomSheetProps = {
  children: React.ReactNode;
  index?: number;
  onCloseClicked?: () => void;
  closeText?: string;
  dismissText?: string;
};

export const CustomBottomSheet = React.forwardRef<
  BottomSheetModal,
  CustomBottomSheetProps
>(({children, index, onCloseClicked, closeText}, ref) => {
  const modalRef = useMemo(
    () => ref as React.RefObject<BottomSheetModal>,
    [ref],
  );

  // renders
  const renderBackdrop = useCallback(
    // @ts-ignore
    props => (
      <BottomSheetBackdrop
        {...props}
        onPress={modalRef.current?.dismiss}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [modalRef],
  );

  return (
    <BottomSheetModal
      ref={modalRef}
      index={index || 90}
      snapPoints={Constants.BOTTOM_SHEET_SNAPPOINTS}
      backdropComponent={renderBackdrop}
      onDismiss={onCloseClicked}>
      {closeText && (
        <ClickableText
          styles={styles.dismissText}
          text={closeText}
          onPress={onCloseClicked}
        />
      )}
      <BottomSheetScrollView>
        <View style={styles.bottomSheetContainer}>{children}</View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    padding: Constants.CONTAINER_PADDING_MARGIN,
  },
  dismissText: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});
