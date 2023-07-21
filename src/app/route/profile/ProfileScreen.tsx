import React, {useEffect, useMemo, useState} from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import CreateExerciseModal from '../../components/bottomSheet/CreateExerciseModal';
import {
  ExerciseFragment,
  PreferenceInput,
  useDeleteExerciseMutation,
  useMyExercisesQuery,
  useUpdatePreferenceMutation,
  WeightUnit,
} from '../../graphql/operations';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ExerciseProfileListItem from '../../components/exercise/ExerciseProfileListItem';
import {defaultStyles} from '../../utils/DefaultStyles';
import DropDownPicker from 'react-native-dropdown-picker';
import Constants from '../../utils/Constants';
import SinglePicker from '../../components/bottomSheet/SinglePicker';
import ClickableText from '../../components/common/ClickableText';
import usePreferenceStore from '../../stores/preferenceStore';
import ContextMenu from 'react-native-context-menu-view';
import {ContextMenuActions} from '../../types/ContextMenuActions';

const ProfileScreen: React.FC = () => {
  const preference = usePreferenceStore(state => state.preference);
  const setPreference = usePreferenceStore(state => state.setPreference);

  const [newUnitSelect, setNewUnitSelect] = useState<WeightUnit.KG>();
  const [preferenceInput, setPreferenceInput] = useState<PreferenceInput>();
  const [unitSelectOpen, setUnitSelectOpen] = useState(false);
  const [adjustDefaultRepetitions, setAdjustDefaultRepetitions] =
    useState(false);
  const [createExerciseModalActive, setCreateExerciseModalActive] =
    useState(false);
  const [editExercise, setEditExercise] = useState<ExerciseFragment>();
  const [updateMyPreferences, {data: dataUpdateMyPreferences}] =
    useUpdatePreferenceMutation({
      fetchPolicy: 'no-cache',
    });
  const [deleteExercise] = useDeleteExerciseMutation({fetchPolicy: 'no-cache'});

  const {
    data: exercisesData,
    loading: exercisesDataLoading,
    refetch: refetchExercises,
  } = useMyExercisesQuery({fetchPolicy: 'no-cache'});

  const exercises = useMemo(
    () => exercisesData?.myExercises,
    [exercisesData?.myExercises],
  );

  const onDefaultRepetitionSelect = (value: string | number): void => {
    setPreferenceInput(prevState => ({
      ...prevState,
      defaultRepetitions: (value as number) || Constants.DEFAULT_REPETITIONS,
    }));
    updateMyPreferences({
      variables: {
        input: {
          ...preferenceInput,
          defaultRepetitions: value as number,
        },
      },
    });
  };

  const onDeleteExercise = (id: string): void => {
    deleteExercise({
      variables: {
        id,
      },
    });
  };

  const refetchData = (): void => {
    refetchExercises();
  };

  useEffect(() => {
    if (preference) {
      setPreferenceInput({
        unit: preference.unit,
        defaultRepetitions: preference.defaultRepetitions,
      });
    }
  }, [preference]);

  useEffect(() => {
    if (newUnitSelect) {
      setPreferenceInput(prevState => ({
        ...prevState,
        unit: newUnitSelect,
      }));
      updateMyPreferences({
        variables: {
          input: {
            ...preferenceInput,
            unit: newUnitSelect,
          },
        },
      });
    }
  }, [newUnitSelect]);

  useEffect(() => {
    if (dataUpdateMyPreferences?.updateMyPreference) {
      setPreference(dataUpdateMyPreferences?.updateMyPreference);
    }
  }, [dataUpdateMyPreferences?.updateMyPreference]);

  useEffect(() => {
    if (editExercise) {
      setCreateExerciseModalActive(true);
    }
  }, [editExercise]);

  return (
    <GradientBackground>
      <View style={defaultStyles.container}>
        {exercisesDataLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={exercises}
            ListHeaderComponent={
              <>
                <View style={defaultStyles.container}>
                  <Text style={defaultStyles.h2}>Preferences</Text>
                  <View>
                    <View
                      style={[
                        defaultStyles.spaceBetween,
                        defaultStyles.container,
                        defaultStyles.zIndex10,
                      ]}>
                      <Text style={defaultStyles.whiteTextColor}>Unit</Text>
                      <View>
                        <DropDownPicker
                          setValue={setNewUnitSelect}
                          value={
                            newUnitSelect ||
                            preferenceInput?.unit ||
                            WeightUnit.KG
                          }
                          items={[
                            {
                              value: WeightUnit.KG,
                              label: WeightUnit.KG,
                            },
                            {
                              value: WeightUnit.LBS,
                              label: WeightUnit.LBS,
                            },
                          ]}
                          open={unitSelectOpen}
                          setOpen={setUnitSelectOpen}
                          style={styles.dropdownContainerStyle}
                          dropDownContainerStyle={styles.dropdownContainerStyle}
                        />
                      </View>
                    </View>
                    <View style={[defaultStyles.spaceBetween, styles.padding]}>
                      <View>
                        <Text style={defaultStyles.whiteTextColor}>
                          Default repetitions
                        </Text>
                      </View>
                      <ClickableText
                        text={
                          preferenceInput?.defaultRepetitions ||
                          Constants.DEFAULT_REPETITIONS
                        }
                        onPress={() => setAdjustDefaultRepetitions(true)}
                      />
                    </View>
                  </View>
                </View>
                <Text style={defaultStyles.h2}>Exercises</Text>
                <ClickableText
                  text={'Create exercise'}
                  onPress={() => {
                    setEditExercise(undefined);
                    setCreateExerciseModalActive(true);
                  }}
                  styles={defaultStyles.textAlignCenter}
                />
              </>
            }
            renderItem={({item}) => (
              <ContextMenu
                actions={[
                  {title: ContextMenuActions.EDIT},
                  {title: ContextMenuActions.REMOVE},
                ]}
                onPress={e =>
                  e.nativeEvent.name === ContextMenuActions.EDIT
                    ? setEditExercise(item)
                    : onDeleteExercise(item.id)
                }>
                <ExerciseProfileListItem exercise={item} />
              </ContextMenu>
            )}
          />
        )}
      </View>
      <SinglePicker
        active={adjustDefaultRepetitions}
        onDismiss={() => setAdjustDefaultRepetitions(false)}
        pickerValue={
          preferenceInput?.defaultRepetitions || Constants.DEFAULT_REPETITIONS
        }
        onPickerSelect={onDefaultRepetitionSelect}
        pickerOptions={Constants.BOTTOM_SHEET_SNAPPOINTS.map(
          value => +value.replace('%', ''),
        )}
      />
      <CreateExerciseModal
        active={createExerciseModalActive}
        onDismiss={() => setCreateExerciseModalActive(false)}
        existingExercise={editExercise}
        onUpdate={refetchData}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  dropdownContainerStyle: {
    width: 80,
    borderWidth: 0,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderWidth: 0,
    width: 80,
    borderRadius: Constants.BORDER_RADIUS_SMALL,
  },
  padding: {
    marginHorizontal: 20,
  },
  maxWidth: {
    width: '80%',
  },
});

export default ProfileScreen;
