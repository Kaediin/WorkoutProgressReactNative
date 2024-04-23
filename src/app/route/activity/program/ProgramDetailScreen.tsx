import React, {useEffect, useRef, useState} from 'react';
import GradientBackground from '../../../components/common/GradientBackground';
import {ActivityStackParamList} from '../../../stacks/ActivityStack';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ProgramLogGroupFragment,
  ProgramLogGroupType,
  useCreateProgramLogGroupMutation,
  useProgramByIdLazyQuery,
  useProgramLogGroupsByProgramIdLazyQuery,
} from '../../../graphql/operations';
import FloatingButton from '../../../components/common/FloatingButton';
import {Add} from '../../../icons/svg';
import Constants from '../../../utils/Constants';
import {Platform, StyleSheet} from 'react-native';
import {Fab} from '../../../utils/Fab';
import {IActionProps} from 'react-native-floating-action';
import {FlashList} from '@shopify/flash-list';
import AppText from '../../../components/common/AppText';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBottomSheet} from '../../../components/bottomSheet/CustomBottomSheet';
import {Picker} from '@react-native-picker/picker';
import {enumToReadableString} from '../../../utils/String';
import ProgramLogGroupListItem from '../../../components/program/ProgramLogGroupListItem';

type Props = NativeStackScreenProps<ActivityStackParamList, 'ProgramDetail'>;

const ProgramDetailScreen: React.FC<Props> = props => {
  const isIOS = Platform.OS === 'ios';

  // Refs
  const refCreateLogGoup = useRef<BottomSheetModal>(null);

  // State
  const [actions, setActions] = useState<IActionProps[]>([]);
  const [programLogGroups, setProgramLogGroups] = useState<
    ProgramLogGroupFragment[]
  >([]);
  const [selectedGroupType, setSelectedGroupType] =
    useState<ProgramLogGroupType>();

  // Queries
  const [fetchProgramById, {data: programByIdData}] = useProgramByIdLazyQuery({
    fetchPolicy: 'no-cache',
  });

  const [fetchProgramGroups] = useProgramLogGroupsByProgramIdLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data.programLogGroupsByProgramId) {
        setProgramLogGroups(data.programLogGroupsByProgramId);

        const _actions = [];
        if (data.programLogGroupsByProgramId.length < 3) {
          _actions.push({
            text: 'Add group',
            icon: isIOS ? <Add /> : require('../../../icons/plus.png'),
            name: Fab.RELOG,
            color: Constants.FAB_ACTION_COLOR,
          });
        }
        setActions(_actions);
      }
    },
  });

  // Mutations
  const [createProgramLogGroup] = useCreateProgramLogGroupMutation({
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      fetchProgramGroups({
        variables: {programId: props.route.params.programId},
      });
      refCreateLogGoup?.current?.close();
    },
  });

  // Set header title on data change
  useEffect(() => {
    if (programByIdData?.programById) {
      props.navigation.setOptions({
        headerTitle: programByIdData.programById.name,
      });
    }
  }, [programByIdData?.programById]);

  // Fetch program and groups on programId change
  useEffect(() => {
    if (props.route.params.programId) {
      fetchProgramById({variables: {id: props.route.params.programId}});
      fetchProgramGroups({
        variables: {programId: props.route.params.programId},
      });
    }
  }, [props.route.params.programId]);

  return (
    <GradientBackground>
      <FlashList
        renderItem={({item}) => (
          <ProgramLogGroupListItem
            programLogGroup={item}
            onCreateLogPress={() =>
              props.navigation.navigate('ProgramCreateLog', {
                programId: props.route.params.programId,
                type: item.type,
              })
            }
          />
        )}
        data={programLogGroups}
        estimatedItemSize={3}
      />
      {actions.length > 0 && (
        <FloatingButton
          actions={actions}
          onPressAction={name =>
            name === Fab.RELOG
              ? refCreateLogGoup?.current?.present()
              : undefined
          }
        />
      )}
      <BottomSheetModalProvider>
        <CustomBottomSheet
          ref={refCreateLogGoup}
          rightText={'Create group'}
          disableRightText={selectedGroupType === undefined}
          onRightTextClicked={() =>
            selectedGroupType &&
            createProgramLogGroup({
              variables: {
                input: {
                  programId: props.route.params.programId,
                  type: selectedGroupType as ProgramLogGroupType,
                  logs: [],
                },
              },
            })
          }
          index={45}>
          <AppText style={styles.header}>Name</AppText>
          <Picker
            selectedValue={selectedGroupType}
            onValueChange={itemValue =>
              itemValue
                ? setSelectedGroupType(itemValue)
                : setSelectedGroupType(undefined)
            }>
            <Picker.Item label={''} value={''} />
            {[
              ProgramLogGroupType.WARMUP,
              ProgramLogGroupType.MAIN,
              ProgramLogGroupType.COOLDOWN,
            ]
              .filter(type => !programLogGroups.find(g => g.type === type))
              .map((type, index) => (
                <Picker.Item
                  key={index}
                  label={enumToReadableString(type)}
                  value={type}
                />
              ))}
          </Picker>
        </CustomBottomSheet>
      </BottomSheetModalProvider>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'grey',
  },
});
export default ProgramDetailScreen;
