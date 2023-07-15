import React, {useCallback, useMemo} from 'react';
import Constants from '../../utils/Constants';
import {StyleSheet, View} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

type CustomBottomSheetProps = {
  children: React.ReactNode;
  index?: number;
  onDismiss?: () => void;
};

export const CustomBottomSheet = React.forwardRef<
  BottomSheetModal,
  CustomBottomSheetProps
>(({children, index, onDismiss}, ref) => {
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
      index={index || 98}
      snapPoints={Constants.BOTTOM_SHEET_SNAPPOINTS}
      backdropComponent={renderBackdrop}
      onDismiss={onDismiss}>
      <BottomSheetScrollView>
        <View style={styles.bottomSheetContainer}>{children}</View>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  bottomSheetContainer: {
    padding: Constants.CONTAINER_PADDING,
  },
});
