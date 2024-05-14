import React, {useEffect, useRef, useState} from 'react';
import {ActivityStackParamList} from '../../../stacks/ActivityStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import GradientBackground from '../../../components/common/GradientBackground';
import {
  ProgramLogFragment,
  ProgramLogGroupType,
  ProgramLogInput,
  ProgramLongFragment,
  useEndScheduledProgramMutation,
  useMarkLogAsCompletedMutation,
  useProgramByIdLazyQuery,
} from '../../../graphql/operations';
import {FlashList} from '@shopify/flash-list';
import {RefreshControl} from 'react-native';
import ActivityProgramLogGroup from '../../../components/program/ActivityProgramLogGroup';
import moment from 'moment/moment';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBottomSheet} from '../../../components/bottomSheet/CustomBottomSheet';
import Constants from '../../../utils/Constants';
import ClickableText from '../../../components/common/ClickableText';
import {defaultStyles} from '../../../utils/DefaultStyles';
import ActivityAdjustProgramBottomSheetContent from '../../../components/bottomSheet/ActivityAdjustProgramBottomSheetContent';
import AppText from '../../../components/common/AppText';
import AppModal from '../../../components/common/AppModal';

type Props = NativeStackScreenProps<ActivityStackParamList, 'ProgramDetail'>;

const ActivityProgramDetailScreen: React.FC<Props> = props => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // Sort the types in the order we want to display them
  const sortedTypes = [
    ProgramLogGroupType.WARMUP,
    ProgramLogGroupType.MAIN,
    ProgramLogGroupType.COOLDOWN,
  ];

  // Fetch the program by id
  const [programById, {loading: programByIdLoading}] = useProgramByIdLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data.programById) {
        setProgram(data.programById);
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
          programById({
            variables: {
              id: props.route.params.programId,
            },
          });
        }
      },
    });
  const [endScheduledWorkout] = useEndScheduledProgramMutation({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data.endScheduledProgram) {
        props.navigation.navigate('ActivityOverview');
      }
    },
  });

  // State for the program
  const [showEndWorkoutModal, setShowEndWorkoutModal] = useState(false);
  const [program, setProgram] = useState<ProgramLongFragment>();
  const [editProgramLog, setEditProgramLog] = useState<ProgramLogFragment>();
  const [editProgramLogInput, setEditProgramLogInput] =
    useState<ProgramLogInput>();

  // Fetch on param change
  useEffect(() => {
    if (props.route.params.programId) {
      programById({
        variables: {
          id: props.route.params.programId,
        },
      });
    }
  }, [props.route.params.programId]);

  useEffect(() => {
    if (editProgramLog) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [editProgramLog]);

  return (
    <GradientBackground>
      <FlashList
        refreshing={programByIdLoading || markAsCompleteLoading}
        refreshControl={
          <RefreshControl
            colors={['#fff', '#ccc']}
            tintColor={'#fff'}
            refreshing={programByIdLoading || markAsCompleteLoading}
            onRefresh={() => {
              programById({
                variables: {
                  id: props.route.params.programId,
                },
              });
            }}
          />
        }
        renderItem={({item}) => {
          if (item.logs.length === 0) {
            return <></>;
          }
          return (
            <ActivityProgramLogGroup
              group={item}
              onLogPress={log => {
                if (log && log.id) {
                  markAsComplete({
                    variables: {
                      id: log.id,
                      workoutId: props.route.params.workoutId,
                      zonedDateTimeString: moment().toISOString(true),
                    },
                  });
                }
              }}
              onEditLogPress={log => {
                setEditProgramLog(log);
                setEditProgramLogInput({
                  logValue: log.logValue,
                  repetitions: log.repetitions,
                  effort: log.effort,
                  cooldownSeconds: log.cooldownSeconds,
                  intervalSeconds: log.intervalSeconds,
                  exerciseId: log.exercise?.id,
                  subdivisions: log.subdivisions?.map(sub => ({
                    id: '',
                    logValue: sub.logValue,
                    repetitions: sub.repetitions,
                    effort: sub.effort,
                    exerciseId: sub.exercise?.id,
                    cooldownSeconds: sub.cooldownSeconds,
                    intervalSeconds: sub.intervalSeconds,
                    programLogGroupId: '',
                  })),
                  programLogGroupId: '',
                });
              }}
            />
          );
        }}
        data={(program?.logGroups || []).sort(
          (a, b) => sortedTypes.indexOf(a.type) - sortedTypes.indexOf(b.type),
        )}
        estimatedItemSize={3}
      />
      <BottomSheetModalProvider>
        <CustomBottomSheet
          ref={bottomSheetModalRef}
          backgroundColor={{backgroundColor: Constants.PRIMARY_GRADIENT[0]}}
          onDismissClicked={() => setEditProgramLog(undefined)}
          rightText={'Adjust and mark as saved'}
          index={
            editProgramLog?.subdivisions &&
            editProgramLog.subdivisions.length > 0
              ? 75
              : 30
          }>
          {editProgramLog?.id && editProgramLogInput && (
            <ActivityAdjustProgramBottomSheetContent
              id={editProgramLog.id}
              log={editProgramLogInput}
              onLogChange={setEditProgramLogInput}
              exerciseMap={[
                editProgramLog.exercise,
                ...(editProgramLog.subdivisions &&
                editProgramLog.subdivisions.length > 0
                  ? editProgramLog.subdivisions?.map(s => s.exercise)
                  : []),
              ].reduce((acc, e) => {
                if (!e) {
                  return acc;
                }
                acc[e.id] = e.name;
                return acc;
              }, {} as {[key: string]: string})}
            />
          )}
        </CustomBottomSheet>
      </BottomSheetModalProvider>
      <AppModal
        isVisible={showEndWorkoutModal}
        onDismiss={() => setShowEndWorkoutModal(false)}>
        <AppText>test</AppText>
      </AppModal>
    </GradientBackground>
  );
};

export default ActivityProgramDetailScreen;
