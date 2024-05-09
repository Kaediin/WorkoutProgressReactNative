import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ActivityStackParamList} from '../../../stacks/ActivityStack';
import {
  ProgramLongFragment,
  useProgramByIdLazyQuery,
} from '../../../graphql/operations';
import Loader from '../../../components/common/Loader';
import GradientBackground from '../../../components/common/GradientBackground';
import AppText from '../../../components/common/AppText';
import {enumToReadableString} from '../../../utils/String';
import ProgramLogListItem from '../../../components/program/ProgramLogListItem';
import {defaultStyles} from '../../../utils/DefaultStyles';

type Props = NativeStackScreenProps<ActivityStackParamList, 'ProgramDetail'>;

const ActivityProgramDetailScreen: React.FC<Props> = props => {
  const [programById, {loading: programByIdLoading}] = useProgramByIdLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data.programById) {
        props.navigation.setOptions({headerTitle: data.programById.name});
        setProgram(data.programById);
      }
    },
  });

  const [program, setProgram] = useState<ProgramLongFragment>();

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
      {programByIdLoading ? (
        <Loader isLoading />
      ) : (
        <ScrollView style={styles.container} key={program?.id}>
          {program?.logGroups.map(logGroup => (
            <View>
              <AppText h3 centerText>
                {enumToReadableString(logGroup.type)}
              </AppText>
              <View style={defaultStyles.separatorWithHeight} />
              {logGroup.logs.map(log => (
                <>
                  <ProgramLogListItem log={log} />
                  <View style={defaultStyles.marginTop} />
                </>
              ))}
            </View>
          ))}
        </ScrollView>
      )}
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default ActivityProgramDetailScreen;
