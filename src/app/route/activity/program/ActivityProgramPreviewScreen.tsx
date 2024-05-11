import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ActivityStackParamList} from '../../../stacks/ActivityStack';
import {
  ProgramLogGroupType,
  ProgramLongFragment,
  useProgramByIdLazyQuery,
  useStartScheduledProgramMutation,
} from '../../../graphql/operations';
import Loader from '../../../components/common/Loader';
import GradientBackground from '../../../components/common/GradientBackground';
import ProgramLogGroupListItem from '../../../components/program/ProgramLogGroupListItem';
import {FlashList} from '@shopify/flash-list';
import {defaultStyles} from '../../../utils/DefaultStyles';
import AppText from '../../../components/common/AppText';
import ClickableText from '../../../components/common/ClickableText';
import moment from 'moment/moment';

type Props = NativeStackScreenProps<ActivityStackParamList, 'ProgramPreview'>;

const ActivityProgramPreviewScreen: React.FC<Props> = props => {
  const sortedTypes = [
    ProgramLogGroupType.WARMUP,
    ProgramLogGroupType.MAIN,
    ProgramLogGroupType.COOLDOWN,
  ];

  const [programById, {loading: programByIdLoading}] = useProgramByIdLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data.programById) {
        if (props.route.params.status === 'ready') {
          props.navigation.setOptions({
            headerTitle: data.programById.name,
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
            headerTitle: data.programById.name,
            headerRight: () => <></>,
          });
        }
        setProgram(data.programById);
      }
    },
  });
  const [startScheduledProgram, {loading: startScheduledProgramLoading}] =
    useStartScheduledProgramMutation({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data.startScheduledProgram) {
          // props.navigation.replace('');
        }
      },
    });

  const [program, setProgram] = useState<ProgramLongFragment>();

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

  return (
    <GradientBackground>
      {programByIdLoading || startScheduledProgramLoading ? (
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
            <ProgramLogGroupListItem
              programLogGroup={item}
              onCreateLogPress={() => {}}
              onEditLogPress={_ => {}}
              onDeleteLogPress={() => {}}
              onDeleteGroupPress={() => {}}
              readonly
            />
          )}
          data={(program?.logGroups || []).sort(
            (a, b) => sortedTypes.indexOf(a.type) - sortedTypes.indexOf(b.type),
          )}
          estimatedItemSize={3}
        />
      )}
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default ActivityProgramPreviewScreen;
