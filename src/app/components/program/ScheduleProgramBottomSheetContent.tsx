import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
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

interface ScheduleProgramBottomSheetContentProps {
  onProgramScheduleChanged: (input: ScheduledProgramInput) => void;
}

const ScheduleProgramBottomSheetContent: React.FC<
  ScheduleProgramBottomSheetContentProps
> = props => {
  const {data: programs, loading: programsLoading} = useMyProgramsQuery({
    fetchPolicy: 'no-cache',
  });

  const [programId, setProgramId] = useState<string>('');
  const [scheduleZonedDateTime, setScheduleZonedDateTime] = useState(
    new Date(),
  );
  const [remark, setRemark] = useState<string>('');

  useEffect(() => {
    props.onProgramScheduleChanged({
      programId,
      scheduleZonedDateTime: moment(scheduleZonedDateTime).toISOString(true),
      zonedDateTime: '',
      remark,
    });
  }, [programId, scheduleZonedDateTime, remark]);

  return (
    <View>
      {programsLoading ? (
        <Loader isLoading />
      ) : (
        <>
          <AppText xSmall T2 style={defaultStyles.blackTextColor}>
            Select program
          </AppText>
          <Picker
            itemStyle={defaultStyles.p14}
            selectedValue={programId}
            onValueChange={setProgramId}>
            <Picker.Item label="" value="" />
            {programs?.myPrograms?.map(program => (
              <Picker.Item
                key={program.id}
                label={program.name}
                value={program.id}
              />
            ))}
          </Picker>
          {programId && (
            <>
              <AppText xSmall T2 style={defaultStyles.blackTextColor}>
                Schedule start date
              </AppText>
              <View style={defaultStyles.centerInRow}>
                <DatePicker
                  date={scheduleZonedDateTime}
                  minimumDate={new Date()}
                  mode="datetime"
                  onDateChange={setScheduleZonedDateTime}
                />
              </View>
            </>
          )}
        </>
      )}
    </View>
  );
};

export default ScheduleProgramBottomSheetContent;
