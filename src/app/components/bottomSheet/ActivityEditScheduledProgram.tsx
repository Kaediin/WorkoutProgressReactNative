import React, {useEffect, useState} from 'react';
import {
  ScheduledProgramFragment,
  WorkoutStatus,
} from '../../graphql/operations';
import DatePicker from 'react-native-date-picker';
import moment, {Moment} from 'moment/moment';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import {defaultStyles} from '../../utils/DefaultStyles';
import {View} from 'react-native';
import AppText from '../common/AppText';
import Constants from '../../utils/Constants';

interface ActivityEditScheduledProgramProps {
  scheduledProgram: ScheduledProgramFragment;
  onChangeScheduledProgram: (
    scheduledProgram: ScheduledProgramFragment,
  ) => void;
}

const ActivityEditScheduledProgram: React.FC<
  ActivityEditScheduledProgramProps
> = props => {
  const [scheduledDateTime, _] = useState<Moment>(
    moment.utc(props.scheduledProgram.scheduledDateTime).local(true),
  );
  const [scheduledProgram, setScheduledProgram] = useState(
    props.scheduledProgram,
  );

  useEffect(() => {
    props.onChangeScheduledProgram(scheduledProgram);
  }, [scheduledProgram]);

  return (
    <View>
      <AppText style={defaultStyles.blackTextColor} xSmall T2>
        Workout name
      </AppText>
      <BottomSheetTextInput
        defaultValue={scheduledProgram.programWorkout.workout.name || ''}
        onChangeText={name => {
          setScheduledProgram(prevState => ({
            ...prevState,
            programWorkout: {
              ...prevState.programWorkout,
              workout: {
                ...prevState.programWorkout.workout,
                name,
              },
            },
          }));
        }}
        style={defaultStyles.textInputWithHeight}
        placeholderTextColor={'darkgrey'}
        placeholder={'Workout name'}
      />
      <View style={defaultStyles.marginTop} />
      <AppText style={defaultStyles.blackTextColor} xSmall T2>
        Workout remark
      </AppText>
      <BottomSheetTextInput
        defaultValue={scheduledProgram.programWorkout.workout.remark || ''}
        onChangeText={remark => {
          setScheduledProgram(prevState => ({
            ...prevState,
            programWorkout: {
              ...prevState.programWorkout,
              workout: {
                ...prevState.programWorkout.workout,
                remark,
              },
            },
          }));
        }}
        style={defaultStyles.textInputWithHeight}
        placeholderTextColor={'darkgrey'}
        placeholder={'Remarks for this workout'}
        maxLength={Constants.TEXT_AREA_MAX_LENGTH}
      />
      {scheduledProgram.programWorkout.workout.status ===
        WorkoutStatus.SCHEDULED && (
        <>
          <View style={defaultStyles.marginTop} />
          <AppText style={defaultStyles.blackTextColor} xSmall T2>
            Scheduled date and time
          </AppText>
          <DatePicker
            date={scheduledDateTime.toDate()}
            mode="datetime"
            onDateChange={date => {
              setScheduledProgram(prevState => ({
                ...prevState,
                scheduledDateTime: moment(date).toISOString(true),
              }));
            }}
          />
        </>
      )}
    </View>
  );
};

export default ActivityEditScheduledProgram;
