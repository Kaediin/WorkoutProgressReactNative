import React, {useEffect, useMemo, useState} from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import CreateExercise from '../../components/exercise/CreateExercise';
import {
  PreferenceInput,
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

const ProfileScreen: React.FC = () => {
  const preference = usePreferenceStore(state => state.preference);
  const setPreference = usePreferenceStore(state => state.setPreference);

  const [newUnitSelect, setNewUnitSelect] = useState<WeightUnit.KG>();
  const [unitSelectOpen, setUnitSelectOpen] = useState(false);
  const [createExerciseModalActive, setCreateExerciseModalActive] =
    useState(false);

  const [updateMyPreferences, {data: dataUpdateMyPreferences}] =
    useUpdatePreferenceMutation({
      fetchPolicy: 'no-cache',
    });

  const {data: exercisesData, loading: exercisesDataLoading} =
    useMyExercisesQuery({fetchPolicy: 'no-cache'});

  const exercises = useMemo(
    () => exercisesData?.myExercises,
    [exercisesData?.myExercises],
  );

  const [preferenceInput, setPreferenceInput] = useState<PreferenceInput>();

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

  return (
    <GradientBackground>
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
                value={newUnitSelect || preferenceInput?.unit || WeightUnit.KG}
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
              onPress={() => setCreateExerciseModalActive(true)}
            />
          </View>
        </View>
      </View>
      <View style={defaultStyles.container}>
        <Text style={defaultStyles.h2}>Exercises</Text>
        {exercisesDataLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={exercises}
            renderItem={({item}) => <ExerciseProfileListItem exercise={item} />}
          />
        )}
      </View>
      <SinglePicker
        active={createExerciseModalActive}
        onDismiss={() => setCreateExerciseModalActive(false)}
        pickerValue={
          preferenceInput?.defaultRepetitions || Constants.DEFAULT_REPETITIONS
        }
        onPickerSelect={onDefaultRepetitionSelect}
        pickerOptions={Constants.BOTTOM_SHEET_SNAPPOINTS.map(
          value => +value.replace('%', ''),
        )}
      />
      <CreateExercise />
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
