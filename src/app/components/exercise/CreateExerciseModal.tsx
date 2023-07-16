import React, {useEffect, useRef, useState} from 'react';
import {MuscleGroup, useCreateExerciseMutation} from '../../graphql/operations';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import GradientButton from '../common/GradientButton';
import {CustomBottomSheet} from '../bottomSheet/CustomBottomSheet';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import MuscleGroupList from '../workouts/MuscleGroupList';
import Constants from '../../utils/Constants';
import SelectMuscleGroups from '../workouts/SelectMuscleGroups';

interface CreateExerciseModalProps {
  active: boolean;
  onDismiss: (added: boolean) => void;
}

const CreateExerciseModal: React.FC<CreateExerciseModalProps> = props => {
  const [exerciseName, setExerciseName] = useState('');
  const [primaryMuscleGroups, setPrimaryMuscleGroups] = useState<MuscleGroup[]>(
    [],
  );
  const [secondaryMuscleGroups, setSecondaryMuscleGroups] = useState<
    MuscleGroup[]
  >([]);

  const bottomSheetModalRefMain = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefMuscleSelect = useRef<BottomSheetModal>(null);

  const [muscleSelectType, setMuscleSelectType] = useState<
    'PRIMARY' | 'SECONDARY'
  >();

  const [createExercise, {}] = useCreateExerciseMutation({
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (props.active) {
      bottomSheetModalRefMain?.current?.present();
    } else {
      bottomSheetModalRefMain?.current?.dismiss();
    }
  }, [props.active]);

  const saveNewExercise = (): void => {
    createExercise({
      variables: {
        input: {
          name: exerciseName,
          primaryMuscles: primaryMuscleGroups,
          secondaryMuscles: secondaryMuscleGroups,
        },
      },
    }).finally(() => {
      bottomSheetModalRefMain?.current?.dismiss();
      props.onDismiss(true);
    });
  };

  return (
    <>
      <CustomBottomSheet
        ref={bottomSheetModalRefMain}
        index={55}
        onDismiss={() => props.onDismiss(false)}>
        <Text style={styles.label}>New exercise</Text>
        <TextInput
          style={styles.nameInput}
          placeholder={'Name'}
          onChangeText={setExerciseName}
          maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
        />
        <View style={styles.spaceBetween}>
          <Text>Primary muscle groups:</Text>
          <Button
            title={'Select'}
            onPress={() => {
              bottomSheetModalRefMuscleSelect?.current?.present();
              setMuscleSelectType('PRIMARY');
            }}
          />
        </View>
        <MuscleGroupList
          muscleGroups={primaryMuscleGroups}
          pillColor="#00C5ED"
          textColor="white"
        />
        <View style={styles.spaceBetween}>
          <Text>Secondary muscle groups:</Text>
          <Button
            title={'Select'}
            onPress={() => {
              bottomSheetModalRefMuscleSelect?.current?.present();
              setMuscleSelectType('SECONDARY');
            }}
          />
        </View>
        <MuscleGroupList
          muscleGroups={secondaryMuscleGroups}
          pillColor="#00C5ED"
          textColor="white"
        />
        <View style={styles.containerButton}>
          <GradientButton
            title={'Save'}
            gradients={Constants.PRIMARY_GRADIENT}
            onClick={saveNewExercise}
            disabled={
              exerciseName.length === 0 || primaryMuscleGroups.length === 0
            }
          />
        </View>
      </CustomBottomSheet>
      <CustomBottomSheet
        ref={bottomSheetModalRefMuscleSelect}
        onDismiss={() => bottomSheetModalRefMuscleSelect?.current?.dismiss()}>
        <SelectMuscleGroups
          preselected={
            muscleSelectType === 'PRIMARY'
              ? primaryMuscleGroups
              : secondaryMuscleGroups
          }
          onConfirm={groups => {
            muscleSelectType === 'PRIMARY'
              ? setPrimaryMuscleGroups(groups)
              : setSecondaryMuscleGroups(groups);
            bottomSheetModalRefMuscleSelect?.current?.dismiss();
            bottomSheetModalRefMain?.current?.present();
          }}
        />
      </CustomBottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
  },
  nameInput: {
    backgroundColor: 'lightgrey',
    padding: Constants.CONTAINER_PADDING,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Constants.CONTAINER_PADDING,
  },
  containerButton: {
    marginTop: 20,
  },
});

export default CreateExerciseModal;
