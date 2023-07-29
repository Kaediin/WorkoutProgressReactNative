import React, {useEffect, useRef} from 'react';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBottomSheet} from './CustomBottomSheet';
import {Picker} from '@react-native-picker/picker';
import {StyleSheet, View} from 'react-native';

interface SinglePickerProps {
  active: boolean;
  onDismiss: () => void;
  pickerOptions: string[] | number[];
  pickerValue: string | number;
  onPickerSelect: (value: string | number) => void;
}

const SinglePicker: React.FC<SinglePickerProps> = props => {
  const bottomSheetModalRefMain = useRef<BottomSheetModal>(null);

  useEffect(() => {
    if (props.active) {
      bottomSheetModalRefMain?.current?.present();
    } else {
      bottomSheetModalRefMain?.current?.dismiss();
    }
  }, [props.active]);

  return (
    <BottomSheetModalProvider>
      <View style={styles.absolute}>
        <CustomBottomSheet
          ref={bottomSheetModalRefMain}
          onCloseClicked={props.onDismiss}
          index={50}
          closeText={'Select'}>
          <Picker
            selectedValue={props.pickerValue}
            onValueChange={props.onPickerSelect}>
            {props.pickerOptions.map(value => (
              <Picker.Item key={value} label={value.toString()} value={value} />
            ))}
          </Picker>
        </CustomBottomSheet>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
  },
});

export default SinglePicker;
