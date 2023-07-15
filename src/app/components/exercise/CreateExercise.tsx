import React, {useState} from 'react';
import GradientButton from '../common/GradientButton';
import CreateExerciseModal from './CreateExerciseModal';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';

const CreateExercise: React.FC = () => {
  const [createExerciseModalActive, setCreateExerciseModalActive] =
    useState(false);

  return (
    <BottomSheetModalProvider>
      <GradientButton
        styles={styles.button}
        title={'Create exercise'}
        onClick={() => setCreateExerciseModalActive(true)}
      />
      <CreateExerciseModal
        active={createExerciseModalActive}
        onDismiss={() => setCreateExerciseModalActive(false)}
      />
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
  },
});

export default CreateExercise;