import React, {useEffect, useState} from 'react';
import {ActivityStackParamList} from '../../../stacks/ActivityStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../../components/common/GradientBackground';
import {
  ProgramLogGroupType,
  ProgramWorkoutLongFragment,
  useEndScheduledProgramMutation,
  useMarkLogAsCompletedMutation,
  useScheduledProgramByIdLazyQuery,
} from '../../../graphql/operations';
import {FlashList} from '@shopify/flash-list';
import {RefreshControl} from 'react-native';
import ActivityProgramLogGroup from '../../../components/program/ActivityProgramLogGroup';
import moment from 'moment/moment';
import ClickableText from '../../../components/common/ClickableText';
import {defaultStyles} from '../../../utils/DefaultStyles';
import EndWorkoutModal from '../../../components/workouts/EndWorkoutModal';
import Loader from '../../../components/common/Loader';

type Props = NativeStackScreenProps<ActivityStackParamList, 'ProgramDetail'>;

const ActivityProgramDetailScreen: React.FC<Props> = props => {
  // const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [showEndWorkoutModal, setShowEndWorkoutModal] = useState(false);
  const [programWorkout, setProgramWorkout] =
    useState<ProgramWorkoutLongFragment>();

  // Sort the types in the order we want to display them
  const sortedTypes = [
    ProgramLogGroupType.WARMUP,
    ProgramLogGroupType.MAIN,
    ProgramLogGroupType.COOLDOWN,
  ];

  const [fetchScheduledProgram, {loading: scheduledProgramLoading}] =
    useScheduledProgramByIdLazyQuery({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data?.scheduledProgramById) {
          setProgramWorkout(data.scheduledProgramById.programWorkout);
          props.navigation.setOptions({
            headerRight: () => (
              <ClickableText
                text={'End Workout'}
                styles={[defaultStyles.error, defaultStyles.p14]}
                onPress={() => setShowEndWorkoutModal(true)}
              />
            ),
          });
        }
      },
    });
  const [markAsComplete, {loading: markAsCompleteLoading}] =
    useMarkLogAsCompletedMutation({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data.markLogAsCompleted) {
          fetchScheduledProgram({
            variables: {
              id: props.route.params.scheduledProgramId,
            },
          });
        }
      },
    });

  const [endScheduledWorkout, {loading: endScheduledWorkoutLoading}] =
    useEndScheduledProgramMutation({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data.endScheduledProgram) {
          props.navigation.navigate('ActivityOverview');
        }
      },
    });

  // State for the program
  // const [programWorkout, setProgramWorkout] = useState();
  // const [program, setProgram] = useState<ProgramLongFragment>();
  // const [editProgramLog, setEditProgramLog] = useState<ProgramLogFragment>();
  // const [editProgramLogInput, setEditProgramLogInput] =
  //   useState<ProgramLogInput>();

  // Fetch on param change
  useEffect(() => {
    if (props.route.params.scheduledProgramId) {
      fetchScheduledProgram({
        variables: {
          id: props.route.params.scheduledProgramId,
        },
      });
    }
  }, [props.route.params.scheduledProgramId]);

  // useEffect(() => {
  //   if (editProgramLog) {
  //     bottomSheetModalRef.current?.present();
  //   } else {
  //     bottomSheetModalRef.current?.dismiss();
  //   }
  // }, [editProgramLog]);

  return (
    <GradientBackground>
      {endScheduledWorkoutLoading ? (
        <Loader isLoading />
      ) : (
        <FlashList
          refreshing={scheduledProgramLoading || markAsCompleteLoading}
          refreshControl={
            <RefreshControl
              colors={['#fff', '#ccc']}
              tintColor={'#fff'}
              refreshing={scheduledProgramLoading || markAsCompleteLoading}
              onRefresh={() => {
                fetchScheduledProgram({
                  variables: {
                    id: props.route.params.scheduledProgramId,
                  },
                });
              }}
            />
          }
          renderItem={({item}) => {
            if (item.programWorkoutLogs.length === 0) {
              return <></>;
            }
            return (
              <ActivityProgramLogGroup
                group={item}
                onLogPress={log => {
                  if (log && log.programLog?.id && programWorkout?.workout.id) {
                    markAsComplete({
                      variables: {
                        id: log.programLog.id,
                        workoutId: programWorkout?.workout.id,
                        zonedDateTimeString: moment().toISOString(true),
                      },
                    });
                  }
                }}
                onEditLogPress={_ => {
                  //   setEditProgramLog(log);
                  //   setEditProgramLogInput({
                  //     logValue: log.logValue,
                  //     repetitions: log.repetitions,
                  //     effort: log.effort,
                  //     cooldownSeconds: log.cooldownSeconds,
                  //     intervalSeconds: log.intervalSeconds,
                  //     exerciseId: log.exercise?.id,
                  //     subdivisions: log.subdivisions?.map(sub => ({
                  //       id: '',
                  //       logValue: sub.logValue,
                  //       repetitions: sub.repetitions,
                  //       effort: sub.effort,
                  //       exerciseId: sub.exercise?.id,
                  //       cooldownSeconds: sub.cooldownSeconds,
                  //       intervalSeconds: sub.intervalSeconds,
                  //       programLogGroupId: '',
                  //     })),
                  //     programLogGroupId: '',
                  //   });
                }}
              />
            );
          }}
          data={(programWorkout?.groups || []).sort(
            (a, b) => sortedTypes.indexOf(a.type) - sortedTypes.indexOf(b.type),
          )}
          estimatedItemSize={3}
        />
      )}

      {/*<BottomSheetModalProvider>*/}
      {/*  <CustomBottomSheet*/}
      {/*    ref={bottomSheetModalRef}*/}
      {/*    backgroundColor={{backgroundColor: Constants.PRIMARY_GRADIENT[0]}}*/}
      {/*    onDismissClicked={() => setEditProgramLog(undefined)}*/}
      {/*    rightText={'Adjust and mark as saved'}*/}
      {/*    index={*/}
      {/*      editProgramLog?.subdivisions &&*/}
      {/*      editProgramLog.subdivisions.length > 0*/}
      {/*        ? 75*/}
      {/*        : 30*/}
      {/*    }>*/}
      {/*    {editProgramLog?.id && editProgramLogInput && (*/}
      {/*      <ActivityAdjustProgramBottomSheetContent*/}
      {/*        id={editProgramLog.id}*/}
      {/*        log={editProgramLogInput}*/}
      {/*        onLogChange={setEditProgramLogInput}*/}
      {/*        exerciseMap={[*/}
      {/*          editProgramLog.exercise,*/}
      {/*          ...(editProgramLog.subdivisions &&*/}
      {/*          editProgramLog.subdivisions.length > 0*/}
      {/*            ? editProgramLog.subdivisions?.map(s => s.exercise)*/}
      {/*            : []),*/}
      {/*        ].reduce((acc, e) => {*/}
      {/*          if (!e) {*/}
      {/*            return acc;*/}
      {/*          }*/}
      {/*          acc[e.id] = e.name;*/}
      {/*          return acc;*/}
      {/*        }, {} as {[key: string]: string})}*/}
      {/*      />*/}
      {/*    )}*/}
      {/*  </CustomBottomSheet>*/}
      {/*</BottomSheetModalProvider>*/}
      {programWorkout?.workout && (
        <EndWorkoutModal
          visible={showEndWorkoutModal}
          onDismiss={() => setShowEndWorkoutModal(false)}
          workout={programWorkout.workout}
          onWorkoutEnded={() => {
            setShowEndWorkoutModal(false);
            endScheduledWorkout({
              variables: {
                id: props.route.params.scheduledProgramId,
                zonedDateTime: moment().toISOString(true),
              },
            });
          }}
        />
      )}
    </GradientBackground>
  );
};

export default ActivityProgramDetailScreen;
