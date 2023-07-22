import React, {useEffect, useRef, useState} from 'react';
import {
  ExerciseFragment,
  MuscleGroup,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
} from '../../graphql/operations';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import GradientButton from '../common/GradientButton';
import {CustomBottomSheet} from './CustomBottomSheet';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import MuscleGroupList from '../workouts/MuscleGroupList';
import Constants from '../../utils/Constants';
import SelectMuscleGroups from '../workouts/SelectMuscleGroups';
import ClickableText from '../common/ClickableText';
import {nonNullable} from '../../utils/List';

interface CreateExerciseModalProps {
  active: boolean;
  onDismiss: (added: boolean) => void;
  existingExercise?: ExerciseFragment;
  onUpdate: () => void;
}

const CreateExerciseModalContent: React.FC<
  CreateExerciseModalProps
> = props => {
  const [exerciseName, setExerciseName] = useState(
    props.existingExercise?.name || '',
  );
  const [primaryMuscleGroups, setPrimaryMuscleGroups] = useState<MuscleGroup[]>(
    props.existingExercise?.primaryMuscles?.filter(nonNullable) || [],
  );
  const [secondaryMuscleGroups, setSecondaryMuscleGroups] = useState<
    MuscleGroup[]
  >(props.existingExercise?.secondaryMuscles?.filter(nonNullable) || []);

  const bottomSheetModalRefMain = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefMuscleSelect = useRef<BottomSheetModal>(null);

  const [muscleSelectType, setMuscleSelectType] = useState<
    'PRIMARY' | 'SECONDARY'
  >();

  const [createExercise, {}] = useCreateExerciseMutation({
    fetchPolicy: 'no-cache',
  });
  const [updateExercise] = useUpdateExerciseMutation({fetchPolicy: 'no-cache'});

  useEffect(() => {
    if (props.active) {
      bottomSheetModalRefMain?.current?.present();
    } else {
      bottomSheetModalRefMain?.current?.dismiss();
    }
  }, [props.active]);

  const saveExercise = (): void => {
    if (props.existingExercise?.id) {
      updateExercise({
        variables: {
          id: props.existingExercise.id,
          input: {
            name: exerciseName,
            primaryMuscles: primaryMuscleGroups,
            secondaryMuscles: secondaryMuscleGroups,
          },
        },
      });
    } else {
      createExercise({
        variables: {
          input: {
            name: exerciseName,
            primaryMuscles: primaryMuscleGroups,
            secondaryMuscles: secondaryMuscleGroups,
          },
        },
      });
    }
    bottomSheetModalRefMain?.current?.dismiss();
    props.onDismiss(true);
    props.onUpdate();
  };

  useEffect(() => {
    if (props.existingExercise) {
      setExerciseName(props.existingExercise.name);
      setPrimaryMuscleGroups(
        props.existingExercise.primaryMuscles?.filter(nonNullable) || [],
      );
      setSecondaryMuscleGroups(
        props.existingExercise.secondaryMuscles?.filter(nonNullable) || [],
      );
    } else {
      setExerciseName('');
      setPrimaryMuscleGroups([]);
      setSecondaryMuscleGroups([]);
    }
  }, [props.existingExercise]);

  return (
    <>
      <CustomBottomSheet
        ref={bottomSheetModalRefMain}
        index={55}
        onDismiss={() => props.onDismiss(false)}>
        {!props.existingExercise && (
          <Text style={styles.label}>New exercise</Text>
        )}
        <TextInput
          style={styles.nameInput}
          placeholder={'Name'}
          value={exerciseName}
          onChangeText={setExerciseName}
          maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
        />
        <View style={styles.spaceBetween}>
          <Text>Primary muscle groups:</Text>
          <ClickableText
            text={'Select'}
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
          <ClickableText
            text={'Select'}
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
            onClick={saveExercise}
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
    padding: Constants.CONTAINER_PADDING_MARGIN,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  spaceBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Constants.CONTAINER_PADDING_MARGIN,
  },
  containerButton: {
    marginTop: 20,
  },
});

export default CreateExerciseModalContent;
