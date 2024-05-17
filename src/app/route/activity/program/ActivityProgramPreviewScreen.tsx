import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ActivityStackParamList} from '../../../stacks/ActivityStack';
import {
  ProgramLogGroupType,
  ProgramWorkoutFragment,
  useScheduledProgramByIdLazyQuery,
  useStartScheduledProgramMutation,
} from '../../../graphql/operations';
import Loader from '../../../components/common/Loader';
import GradientBackground from '../../../components/common/GradientBackground';
import {FlashList} from '@shopify/flash-list';
import {defaultStyles} from '../../../utils/DefaultStyles';
import AppText from '../../../components/common/AppText';
import ClickableText from '../../../components/common/ClickableText';
import moment from 'moment/moment';
import ActivityProgramLogGroup from '../../../components/program/ActivityProgramLogGroup';

type Props = NativeStackScreenProps<ActivityStackParamList, 'ProgramPreview'>;

const ActivityProgramPreviewScreen: React.FC<Props> = props => {
  const sortedTypes = [
    ProgramLogGroupType.WARMUP,
    ProgramLogGroupType.MAIN,
    ProgramLogGroupType.COOLDOWN,
  ];
  const [programWorkout, setProgramWorkout] =
    useState<ProgramWorkoutFragment>();
  const [fetchScheduledProgram, {loading: scheduledProgramLoading}] =
    useScheduledProgramByIdLazyQuery({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data.scheduledProgramById) {
          if (props.route.params.status === 'ready') {
            props.navigation.setOptions({
              headerTitle:
                data.scheduledProgramById.programWorkout.workout.name,
              headerRight: () => (
                <ClickableText
                  text={'Start as workout'}
                  onPress={() =>
                    startScheduledProgram({
                      variables: {
                        id: props.route.params.scheduledProgramId,
                        zonedDateTime: moment().toISOString(true),
                      },
                    })
                  }
                />
              ),
            });
          } else {
            props.navigation.setOptions({
              headerTitle:
                data.scheduledProgramById.programWorkout.workout.name,
              headerRight: () => <></>,
            });
          }
          setProgramWorkout(data.scheduledProgramById.programWorkout);
        }
      },
    });

  const [startScheduledProgram, {loading: startScheduledProgramLoading}] =
    useStartScheduledProgramMutation({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data.startScheduledProgram) {
          props.navigation.replace('ProgramDetail', {
            scheduledProgramId: props.route.params.scheduledProgramId,
          });
        }
      },
    });

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

  return (
    <GradientBackground>
      {scheduledProgramLoading || startScheduledProgramLoading ? (
        <Loader isLoading />
      ) : (
        <FlashList
          ListHeaderComponent={() => (
            <View style={defaultStyles.container}>
              {props.route.params.status === 'ready' ? (
                <AppText centerText>
                  This program is ready to be started as a workout.
                </AppText>
              ) : props.route.params.status === 'scheduled' ? (
                <AppText centerText>
                  This program will be ready to start on the scheduled date and
                  time.
                </AppText>
              ) : null}
            </View>
          )}
          renderItem={({item}) => (
            <ActivityProgramLogGroup
              group={item}
              onLogPress={() => {}}
              onEditLogPress={() => {}}
              readonly
            />
          )}
          data={(programWorkout?.groups || []).sort(
            (a, b) => sortedTypes.indexOf(a.type) - sortedTypes.indexOf(b.type),
          )}
          estimatedItemSize={3}
        />
      )}
    </GradientBackground>
  );
};

export default ActivityProgramPreviewScreen;
