import React, {useEffect, useState} from 'react';
import {OnboardingStackParamList} from '../../stacks/OnboardingStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../components/common/GradientBackground';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import GradientButton from '../../components/common/GradientButton';
import useUserStore from '../../stores/userStore';
import {
  ExerciseFragment,
  useAddOnboardingExercisesMutation,
  useCompleteOnboardingMutation,
  useDeleteExerciseMutation,
  useMyExercisesQuery,
  useOnboardingExercisesLazyQuery,
} from '../../graphql/operations';
import * as Sentry from '@sentry/react-native';
import Loader from '../../components/common/Loader';
import HeaderLabel from '../../components/nav/headerComponents/HeaderLabel';
import CreateExerciseModal from '../../components/bottomSheet/CreateExerciseModal';
import ExerciseProfileListItem from '../../components/exercise/ExerciseProfileListItem';
import ContextMenu from 'react-native-context-menu-view';
import {ContextMenuActions} from '../../types/ContextMenuActions';
import {defaultStyles} from '../../utils/DefaultStyles';
import PopupModal from '../../components/common/PopupModal';
import Constants from '../../utils/Constants';
import AppText from '../../components/common/AppText';
import Modal from 'react-native-modal';
import ClickableText from '../../components/common/ClickableText';
import {Selected, Unselected} from '../../icons/svg';

type Props = NativeStackScreenProps<
  OnboardingStackParamList,
  'OnboardingExerciseSelect'
>;

const OnboardingExerciseSelect: React.FC<Props> = () => {
  const setMe = useUserStore(state => state.setMe);

  // Keep track of selected exercises
  const [onboardingExercisesSelected, setOnboardingExercisesSelected] =
    useState<string[]>([]);
  // Keep track of onboarding exercises that are fetched from the server
  const [onboardingExercises, setOnboardingExercises] = useState<
    ExerciseFragment[]
  >([]);
  // Keep track of the modal state
  const [showOnboardingExerciseModal, setShowOnboardingExerciseModal] =
    useState(false);

  // Selected exercise to be removed
  const [deleteExerciseId, setDeleteExerciseId] = useState('');
  // Selected exercise to be edited
  const [editExercise, setEditExercise] = useState<ExerciseFragment>();
  // Modal state for creating a new exercise
  const [createExerciseModalActive, setCreateExerciseModalActive] =
    useState(false);

  // Mutation to add selected exercises to user
  const [saveSelectedExercises, {loading: saveSelectedExercisesLoading}] =
    useAddOnboardingExercisesMutation({
      fetchPolicy: 'no-cache',
      onCompleted: _ => {
        refetchExercises();
      },
      onError: error => Sentry.captureException(error),
    });

  // Mutation to complete onboarding
  const [completeOnboarding, {loading: completeOnboardingLoading}] =
    useCompleteOnboardingMutation({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data?.completeOnboarding) {
          setMe(data.completeOnboarding);
        }
      },
      onError: error => Sentry.captureException(error),
    });

  // Mutation to delete an exercise
  const [deleteExercise, {loading: deleteExerciseLoading}] =
    useDeleteExerciseMutation({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data?.deleteExercise) {
          refetchExercises();
        }
      },
      onError: error => Sentry.captureException(error),
    });

  // Query to fetch onboarding exercises
  const [fetchOnboardingExercises, {loading: fetchOnboardingExercisesLoading}] =
    useOnboardingExercisesLazyQuery({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data?.onboardingExercises) {
          setOnboardingExercises(data.onboardingExercises);
        }
      },
      onError: error => Sentry.captureException(error),
    });

  // Query to fetch user exercises
  const {
    data: exercisesData,
    loading: exercisesDataLoading,
    refetch: refetchExercises,
  } = useMyExercisesQuery({fetchPolicy: 'no-cache'});

  // Open modal if an exercise is selected for editing
  useEffect(() => {
    if (editExercise) {
      setCreateExerciseModalActive(true);
    }
  }, [editExercise]);

  // Load onboarding exercises only once and when modal is opened
  useEffect(() => {
    if (showOnboardingExerciseModal && onboardingExercises.length === 0) {
      // Fetch onboarding exercises
      fetchOnboardingExercises();
    }
  }, [showOnboardingExerciseModal]);

  // handle on press of onboarding exercise click
  const handleOnboardingExerciseClick = (item: ExerciseFragment) => {
    if (onboardingExercisesSelected.includes(item.id)) {
      setOnboardingExercisesSelected(
        onboardingExercisesSelected.filter(id => id !== item.id),
      );
    } else {
      setOnboardingExercisesSelected([...onboardingExercisesSelected, item.id]);
    }
  };

  // handle save onboarding exercises
  const handleSaveOnboardingExercises = () => {
    setShowOnboardingExerciseModal(false);
    // Add get all onboarding exercises by selected ids
    saveSelectedExercises({
      variables: {
        ids: onboardingExercisesSelected,
      },
    });
  };

  return (
    <GradientBackground>
      {completeOnboardingLoading ||
      exercisesDataLoading ||
      deleteExerciseLoading ||
      saveSelectedExercisesLoading ? (
        <Loader isLoading />
      ) : (
        <>
          <FlatList
            data={exercisesData?.myExercises || []}
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => (
              <View style={[defaultStyles.centerInRow, styles.headerStyles]}>
                <View style={defaultStyles.marginBottom}>
                  <AppText>
                    Add your exercises or select a few from a ready-made list
                  </AppText>
                </View>
                <View style={defaultStyles.centerInRow}>
                  <HeaderLabel
                    label={'Create new exercise'}
                    onPress={() => {
                      setEditExercise(undefined);
                      setCreateExerciseModalActive(true);
                    }}
                  />
                  <View style={defaultStyles.marginTop} />
                  <HeaderLabel
                    label={'Add from list'}
                    onPress={() => setShowOnboardingExerciseModal(true)}
                  />
                </View>
              </View>
            )}
            renderItem={item => {
              return (
                <ContextMenu
                  key={item.item.id}
                  actions={[
                    {title: ContextMenuActions.EDIT},
                    {title: ContextMenuActions.REMOVE, destructive: true},
                  ]}
                  onPress={e =>
                    e.nativeEvent.name === ContextMenuActions.EDIT
                      ? setEditExercise(item.item)
                      : setDeleteExerciseId(item.item.id)
                  }
                  style={defaultStyles.shadow}>
                  <ExerciseProfileListItem
                    exercise={item.item}
                    onPress={() => setEditExercise(item.item)}
                  />
                </ContextMenu>
              );
            }}
          />
          <View style={defaultStyles.centerInRow}>
            <GradientButton
              styles={styles.buttonContainer}
              title="Complete Onboarding"
              onPress={completeOnboarding}
            />
          </View>
        </>
      )}
      <CreateExerciseModal
        active={createExerciseModalActive}
        onDismiss={added => {
          setCreateExerciseModalActive(false);
          setEditExercise(undefined);
          if (added) {
            refetchExercises();
          }
        }}
        existingExercise={editExercise}
        onUpdate={() => refetchExercises()}
      />
      <Modal
        isVisible={showOnboardingExerciseModal}
        onBackdropPress={() => setShowOnboardingExerciseModal(false)}
        onBackButtonPress={() => setShowOnboardingExerciseModal(false)}
        onDismiss={() => setShowOnboardingExerciseModal(false)}>
        <View style={styles.modalStyle}>
          <GradientBackground styles={styles.modalGradientStyles}>
            <View
              style={[
                defaultStyles.spaceBetween,
                defaultStyles.marginVertical,
              ]}>
              <View>
                <AppText>Ready-made exercises</AppText>
                <ClickableText
                  containerStyles={defaultStyles.marginTop}
                  text={`${
                    onboardingExercisesSelected.length > 0 &&
                    onboardingExercisesSelected.length ===
                      onboardingExercises.length
                      ? 'Unselect'
                      : 'Select'
                  } all (${onboardingExercises.length})`}
                  onPress={() => {
                    if (
                      onboardingExercisesSelected.length > 0 &&
                      onboardingExercisesSelected.length ===
                        onboardingExercises.length
                    ) {
                      setOnboardingExercisesSelected([]);
                    } else {
                      setOnboardingExercisesSelected(
                        onboardingExercises.map(exercise => exercise.id),
                      );
                    }
                  }}
                />
              </View>
              <ClickableText
                text={`Save (${onboardingExercisesSelected.length})`}
                onPress={() => handleSaveOnboardingExercises()}
                disabled={onboardingExercisesSelected.length === 0}
              />
            </View>
            {fetchOnboardingExercisesLoading ? (
              <Loader isLoading />
            ) : (
              <FlatList
                data={onboardingExercises}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={defaultStyles.row}
                    onPress={() => handleOnboardingExerciseClick(item)}>
                    {onboardingExercisesSelected.includes(item.id) ? (
                      <Selected />
                    ) : (
                      <Unselected />
                    )}
                    <View style={styles.containerOnboardingExercise}>
                      <ExerciseProfileListItem
                        exercise={item}
                        onPress={() => handleOnboardingExerciseClick(item)}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </GradientBackground>
        </View>
      </Modal>
      <PopupModal
        message={'Are you sure you want to delete this exercise?'}
        isOpen={Boolean(deleteExerciseId)}
        type={'WARNING'}
        onDismiss={() => setDeleteExerciseId('')}
        onConfirm={() => {
          deleteExercise({
            variables: {
              id: deleteExerciseId,
            },
            fetchPolicy: 'no-cache',
          });
          setDeleteExerciseId('');
        }}
      />
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 300,
    marginTop: 20,
    marginBottom: 50,
  },
  headerStyles: {
    padding: 20,
    backgroundColor: Constants.SECONDARY_GRADIENT[0],
  },
  modalStyle: {
    height: '70%',
  },
  modalGradientStyles: {
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    padding: 20,
  },
  containerOnboardingExercise: {
    flex: 1,
  },
});
export default OnboardingExerciseSelect;
