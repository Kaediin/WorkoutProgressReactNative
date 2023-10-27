import React, {useCallback, useMemo} from 'react';
import Constants from '../../utils/Constants';
import {StyleSheet, View} from 'react-native';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import ClickableText from '../common/ClickableText';
import {defaultStyles} from '../../utils/DefaultStyles';

type CustomBottomSheetProps = {
  children: React.ReactNode;
  index?: number;
  onRightTextClicked?: () => void;
  onLeftTextClicked?: () => void;
  onDismissClicked?: () => void;
  rightText?: string;
  leftText?: string;
  disableRightText?: boolean;
};

export const CustomBottomSheet = React.forwardRef<
  BottomSheetModal,
  CustomBottomSheetProps
>(
  (
    {
      children,
      index,
      onLeftTextClicked,
      onRightTextClicked,
      rightText,
      onDismissClicked,
      leftText,
      disableRightText,
    },
    ref,
  ) => {
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
        onDismiss={onDismissClicked}>
        <View style={defaultStyles.spaceBetween}>
          {leftText ? (
            <ClickableText
              styles={styles.leftText}
              text={leftText}
              onPress={onLeftTextClicked}
            />
          ) : (
            <View />
          )}
          {rightText && (
            <ClickableText
              styles={styles.rightText}
              text={rightText}
              onPress={onRightTextClicked}
              disabled={disableRightText}
            />
          )}
        </View>

        <BottomSheetScrollView>
          <View style={styles.bottomSheetContainer}>{children}</View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    padding: Constants.CONTAINER_PADDING_MARGIN,
  },
  leftText: {
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  rightText: {
    alignSelf: 'flex-end',
    marginRight: 20,
  },
});
