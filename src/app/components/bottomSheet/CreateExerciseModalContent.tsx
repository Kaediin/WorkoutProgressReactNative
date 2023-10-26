import React, {useEffect, useRef, useState} from 'react';
import {
  ExerciseFragment,
  LogValueFragment,
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
import LogValueSelect from '../common/LogValueSelect';
import {logValueToString} from '../../utils/String';
import {defaultStyles} from '../../utils/DefaultStyles';
import Loader from '../common/Loader';

interface CreateExerciseModalProps {
  active: boolean;
  onDismiss: () => void;
  existingExercise?: ExerciseFragment;
  onUpdate: () => void;
}

const CreateExerciseModalContent: React.FC<
  CreateExerciseModalProps
> = props => {
  const [loading, setLoading] = useState(false);
  const [exerciseName, setExerciseName] = useState(
    props.existingExercise?.name || '',
  );
  const [exerciseNotes, setExerciseNotes] = useState(
    props.existingExercise?.notes || '',
  );
  const [primaryMuscleGroups, setPrimaryMuscleGroups] = useState<MuscleGroup[]>(
    props.existingExercise?.primaryMuscles?.filter(nonNullable) || [],
  );
  const [defaultAppliedWeight, setDefaultAppliedWeight] = useState<
    LogValueFragment | undefined
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

  const saveExercise = async (): Promise<void> => {
    bottomSheetModalRefMain?.current?.dismiss();
    setLoading(true);
    if (props.existingExercise?.id) {
      await updateExercise({
        variables: {
          id: props.existingExercise.id,
          input: {
            name: exerciseName,
            primaryMuscles: primaryMuscleGroups,
            secondaryMuscles: secondaryMuscleGroups,
            defaultAppliedWeight: defaultAppliedWeight
              ? {
                  base: defaultAppliedWeight.base,
                  fraction: defaultAppliedWeight.fraction,
                  unit: defaultAppliedWeight.unit,
                }
              : null,
            notes: exerciseNotes,
          },
        },
      });
    } else {
      await createExercise({
        variables: {
          input: {
            name: exerciseName,
            primaryMuscles: primaryMuscleGroups,
            secondaryMuscles: secondaryMuscleGroups,
            defaultAppliedWeight,
            notes: exerciseNotes,
          },
        },
      });
    }
    props.onUpdate();
    props.onDismiss();
    setLoading(false);
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
      {loading ? (
        <Loader />
      ) : (
        <>
          <CustomBottomSheet
            ref={bottomSheetModalRefMain}
            index={55}
            onCloseClicked={() => props.onDismiss()}>
            {!props.existingExercise && (
              <Text style={styles.label}>New exercise</Text>
            )}
            <TextInput
              style={defaultStyles.textInput}
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
            <View style={styles.spaceBetween}>
              <Text>Default applied weight</Text>
              <ClickableText
                text={
                  defaultAppliedWeight
                    ? logValueToString(defaultAppliedWeight)
                    : 'Select'
                }
                onPress={() => {
                  bottomSheetModalRefWeightSelect?.current?.present();
                }}
              />
            </View>
            <TextInput
              style={defaultStyles.textAreaInput}
              defaultValue={exerciseNotes}
              placeholder={'Notes (ex: Machine height 5)'}
              onChangeText={setExerciseNotes}
              maxLength={Constants.TEXT_AREA_MAX_LENGTH}
              multiline
            />
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
            <LogValueSelect
              logValue={defaultAppliedWeight}
              onWeightSelected={value =>
                setDefaultAppliedWeight(
                  value.base > 0 || (value.fraction || 0) > 0
                    ? value
                    : undefined,
                )
              }
            />
          </CustomBottomSheet>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 10,
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
