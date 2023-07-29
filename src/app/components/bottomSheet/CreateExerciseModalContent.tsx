import React, {useEffect, useRef, useState} from 'react';
import {
  ExerciseFragment,
  MuscleGroup,
  useCreateExerciseMutation,
  useUpdateExerciseMutation,
  WeightValueFragment,
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
import WeightSelect from '../common/WeightSelect';
import {weightValueToString} from '../../utils/String';
import {defaultStyles} from '../../utils/DefaultStyles';

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
  const [defaultAppliedWeight, setDefaultAppliedWeight] = useState<
    WeightValueFragment | undefined
  >(props.existingExercise?.defaultAppliedWeight || undefined);
  const [secondaryMuscleGroups, setSecondaryMuscleGroups] = useState<
    MuscleGroup[]
  >(props.existingExercise?.secondaryMuscles?.filter(nonNullable) || []);

  const bottomSheetModalRefMain = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefMuscleSelect = useRef<BottomSheetModal>(null);
  const bottomSheetModalRefWeightSelect = useRef<BottomSheetModal>(null);

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
            defaultAppliedWeight: defaultAppliedWeight
              ? {
                  baseWeight: defaultAppliedWeight.baseWeight,
                  fraction: defaultAppliedWeight.fraction,
                  unit: defaultAppliedWeight.unit,
                }
              : null,
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
            defaultAppliedWeight,
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
      setDefaultAppliedWeight(
        props.existingExercise.defaultAppliedWeight || undefined,
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
        onCloseClicked={() => props.onDismiss(false)}>
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
          <Text>Primary muscle groups</Text>
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
          pillColor={Constants.SECONDARY_GRADIENT[0]}
          textColor="white"
        />
        <View style={styles.spaceBetween}>
          <Text>Secondary muscle groups</Text>
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
          pillColor={Constants.SECONDARY_GRADIENT[0]}
          textColor="white"
        />
        <View style={[defaultStyles.spaceBetween, defaultStyles.container]}>
          <Text>Default applied weight</Text>
          <ClickableText
            text={
              defaultAppliedWeight
                ? weightValueToString(defaultAppliedWeight)
                : 'Select'
            }
            onPress={() => {
              bottomSheetModalRefMain?.current?.dismiss();
              bottomSheetModalRefWeightSelect?.current?.present();
            }}
          />
        </View>
        <View style={styles.containerButton}>
          <GradientButton
            title={'Save'}
            gradients={Constants.SECONDARY_GRADIENT}
            onClick={saveExercise}
            disabled={
              exerciseName.length === 0 || primaryMuscleGroups.length === 0
            }
          />
        </View>
      </CustomBottomSheet>
      <CustomBottomSheet
        ref={bottomSheetModalRefMuscleSelect}
        onCloseClicked={() => {
          bottomSheetModalRefMuscleSelect?.current?.dismiss();
          bottomSheetModalRefMain?.current?.present();
        }}
        closeText={'Select'}>
        <SelectMuscleGroups
          preselected={
            muscleSelectType === 'PRIMARY'
              ? primaryMuscleGroups
              : secondaryMuscleGroups
          }
          onSelected={groups => {
            muscleSelectType === 'PRIMARY'
              ? setPrimaryMuscleGroups(groups)
              : setSecondaryMuscleGroups(groups);
          }}
        />
      </CustomBottomSheet>
      <CustomBottomSheet
        ref={bottomSheetModalRefWeightSelect}
        onCloseClicked={() => {
          bottomSheetModalRefWeightSelect?.current?.dismiss();
          bottomSheetModalRefMain?.current?.present();
        }}
        index={65}
        closeText={'Select'}>
        <WeightSelect
          weightValue={defaultAppliedWeight}
          onWeightSelected={value =>
            setDefaultAppliedWeight(
              value.baseWeight > 0 || (value.fraction || 0) > 0
                ? value
                : undefined,
            )
          }
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
