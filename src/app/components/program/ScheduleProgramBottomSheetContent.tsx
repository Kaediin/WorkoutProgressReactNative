import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {
  ScheduledProgramInput,
  useMyProgramsQuery,
} from '../../graphql/operations';
import Loader from '../common/Loader';
import {defaultStyles} from '../../utils/DefaultStyles';
import AppText from '../common/AppText';
import DatePicker from 'react-native-date-picker';
import moment from 'moment/moment';
import {BottomSheetTextInput} from '@gorhom/bottom-sheet';
import Constants from '../../utils/Constants';
import ClickableText from '../common/ClickableText';
import ExpandableView from '../common/ExpandableView';
import {DATE_TIME_FORMAT} from '../../utils/Date';

interface ScheduleProgramBottomSheetContentProps {
  onProgramScheduleChanged: (input: ScheduledProgramInput) => void;
  loading: boolean;
}

const ScheduleProgramBottomSheetContent: React.FC<
  ScheduleProgramBottomSheetContentProps
> = props => {
  const {data: programs, loading: programsLoading} = useMyProgramsQuery({
    fetchPolicy: 'no-cache',
  });

  const [showPickerProgramSelect, setShowPickerProgramSelect] = useState(false);
  const [showPickerSchedule, setShowPickerSchedule] = useState(false);
  const [workoutName, setWorkoutName] = useState<string>('');
  const [programName, setProgramName] = useState<string>('');
  const [programId, setProgramId] = useState<string>('');
  const [scheduleZonedDateTime, setScheduleZonedDateTime] = useState(
    new Date(),
  );
  const [remark, setRemark] = useState<string>('');

  useEffect(() => {
    props.onProgramScheduleChanged({
      programId,
      workoutName,
      scheduleZonedDateTime: moment(scheduleZonedDateTime).toISOString(true),
      zonedDateTime: '',
      remark,
    });
  }, [programId, scheduleZonedDateTime, remark]);

  return (
    <View>
      {programsLoading || props.loading ? (
        <Loader isLoading dark style={defaultStyles.absoluteCenterContent} />
      ) : (
        <ScrollView>
          <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
            <AppText xSmall T2 style={defaultStyles.blackTextColor}>
              Select program
            </AppText>
            <ClickableText
              text={programName || 'Select program'}
              onPress={() =>
                setShowPickerProgramSelect(!showPickerProgramSelect)
              }
            />
          </View>
          <ExpandableView
            styles={styles.borderExpandableView}
            showChildren={showPickerProgramSelect}
            contentHeight={230}>
            <Picker
              selectedValue={programId}
              onValueChange={selectedId => {
                setProgramId(selectedId);
                const selectedProgram = programs?.myPrograms?.find(
                  x => x.id === selectedId,
                );
                setProgramName(selectedProgram?.name || '');
                setWorkoutName(selectedProgram?.name || '');
              }}>
              <Picker.Item label="" value="" />
              {programs?.myPrograms?.map(program => (
                <Picker.Item
                  key={program.id}
                  label={program.name}
                  value={program.id}
                />
              ))}
            </Picker>
          </ExpandableView>
          <View style={defaultStyles.marginTop} />
          {programId && (
            <>
              <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
                <AppText xSmall T2 style={defaultStyles.blackTextColor}>
                  Schedule start date
                </AppText>
                <ClickableText
                  text={
                    scheduleZonedDateTime
                      ? moment(scheduleZonedDateTime).format(DATE_TIME_FORMAT)
                      : 'Schedule start date'
                  }
                  onPress={() => setShowPickerSchedule(!showPickerSchedule)}
                />
              </View>
              <ExpandableView
                styles={styles.borderExpandableView}
                showChildren={showPickerSchedule}
                contentHeight={230}>
                <View style={defaultStyles.centerInRow}>
                  <DatePicker
                    date={scheduleZonedDateTime}
                    minimumDate={new Date()}
                    mode="datetime"
                    onDateChange={setScheduleZonedDateTime}
                  />
                </View>
              </ExpandableView>
              <View style={defaultStyles.marginTop} />
              <AppText xSmall T2 style={defaultStyles.blackTextColor}>
                Workout name
              </AppText>
              <BottomSheetTextInput
                style={defaultStyles.textInputWithHeight}
                defaultValue={workoutName || ''}
                placeholderTextColor={'darkgrey'}
                placeholder="Workout name"
                onChangeText={setWorkoutName}
                maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
              />
              <View style={defaultStyles.marginTop} />
              <AppText xSmall T2 style={defaultStyles.blackTextColor}>
                Remark
              </AppText>
              <BottomSheetTextInput
                style={defaultStyles.textInputWithHeight}
                defaultValue={remark || ''}
                placeholderTextColor={'darkgrey'}
                placeholder="Remark"
                onChangeText={setRemark}
                maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
              />
            </>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  borderExpandableView: {
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: Constants.BORDER_RADIUS_SMALL,
    marginTop: Constants.CONTAINER_PADDING_MARGIN,
  },
});

export default ScheduleProgramBottomSheetContent;
