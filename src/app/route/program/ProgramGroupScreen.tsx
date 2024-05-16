import React, {useEffect, useRef, useState} from 'react';
import GradientBackground from '../../components/common/GradientBackground';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  ProgramLogGroupFragment,
  ProgramLogGroupType,
  useCreateProgramLogGroupMutation,
  useDeleteProgramLogGroupMutation,
  useDeleteProgramLogMutation,
  useProgramByIdLazyQuery,
  useProgramLogGroupsByProgramIdLazyQuery,
} from '../../graphql/operations';
import FloatingButton from '../../components/common/FloatingButton';
import {Add} from '../../icons/svg';
import Constants from '../../utils/Constants';
import {Platform, RefreshControl, StyleSheet} from 'react-native';
import {Fab} from '../../utils/Fab';
import {IActionProps} from 'react-native-floating-action';
import {FlashList} from '@shopify/flash-list';
import AppText from '../../components/common/AppText';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {CustomBottomSheet} from '../../components/bottomSheet/CustomBottomSheet';
import {Picker} from '@react-native-picker/picker';
import {enumToReadableString} from '../../utils/String';
import ProgramLogGroupListItem from '../../components/program/ProgramLogGroupListItem';
import ConfirmModal from '../../components/common/ConfirmModal';
import {useIsFocused} from '@react-navigation/native';
import {ProgramStackParamList} from '../../stacks/ProgramStack';
import {defaultStyles} from '../../utils/DefaultStyles';
import Loader from '../../components/common/Loader';

type Props = NativeStackScreenProps<
  ProgramStackParamList,
  'ProgramDetailScreen'
>;

const ProgramGroupScreen: React.FC<Props> = props => {
  const isIOS = Platform.OS === 'ios';
  const isFocussed = useIsFocused();
  const sortedTypes = [
    ProgramLogGroupType.WARMUP,
    ProgramLogGroupType.MAIN,
    ProgramLogGroupType.COOLDOWN,
  ];

  // Refs
  const refCreateLogGoup = useRef<BottomSheetModal>(null);

  // State
  const [deleteLogGroupId, setDeleteLogGroupId] = useState<string>();
  const [deleteLogId, setDeleteLogId] = useState<string>();
  const [actions, setActions] = useState<IActionProps[]>([]);
  const [programLogGroups, setProgramLogGroups] = useState<
    ProgramLogGroupFragment[]
  >([]);
  const [selectedGroupType, setSelectedGroupType] =
    useState<ProgramLogGroupType>();

  // Queries
  // Fetch program by id
  const [
    fetchProgramById,
    {data: programByIdData, loading: fetchProgramByIdLoading},
  ] = useProgramByIdLazyQuery({
    fetchPolicy: 'no-cache',
  });

  // Fetch program log groups by program id
  const [fetchProgramGroups, {loading: fetchProgramGroupsLoading}] =
    useProgramLogGroupsByProgramIdLazyQuery({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data.programLogGroupsByProgramId) {
          // Sort by type
          setProgramLogGroups(
            data.programLogGroupsByProgramId.sort(
              (a, b) =>
                sortedTypes.indexOf(a.type) - sortedTypes.indexOf(b.type),
            ),
          );

          const _actions = [];
          if (data.programLogGroupsByProgramId.length < 3) {
            _actions.push({
              text: 'Add group',
              icon: isIOS ? <Add /> : require('../../icons/plus.png'),
              name: Fab.RELOG,
              color: Constants.FAB_ACTION_COLOR,
            });
          }
          setActions(_actions);
        }
      },
    });

  // Mutations
  // Create program log group
  const [createProgramLogGroup] = useCreateProgramLogGroupMutation({
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      refetch();
      refCreateLogGoup?.current?.close();
    },
  });

  // Delete program log
  const [deleteProgramLog] = useDeleteProgramLogMutation({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data.deleteProgramLog) {
        refetch();
      }
    },
  });

  const [deleteProgramLogGroup] = useDeleteProgramLogGroupMutation({
    fetchPolicy: 'no-cache',
    onCompleted: data => {
      if (data.deleteProgramLogGroup) {
        refetch();
      }
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
      refetch();
    }
  }, [props.route.params.programId]);

  // Refetch on focus
  useEffect(() => {
    if (isFocussed) {
      refetch();
    }
  }, [isFocussed]);

  // Refetch program and groups
  const refetch = () => {
    fetchProgramById({variables: {id: props.route.params.programId}});
    fetchProgramGroups({
      variables: {programId: props.route.params.programId},
    });
  };

  const loading = fetchProgramByIdLoading || fetchProgramGroupsLoading;
  return (
    <GradientBackground>
      <FlashList
        refreshing={loading}
        refreshControl={
          <RefreshControl
            colors={['#fff', '#ccc']}
            tintColor={'#fff'}
            refreshing={loading}
            onRefresh={() =>
              fetchProgramById({variables: {id: props.route.params.programId}})
            }
          />
        }
        renderItem={({item}) => (
          <ProgramLogGroupListItem
            programLogGroup={item}
            onCreateLogPress={() =>
              props.navigation.navigate('ProgramCreateLogScreen', {
                programLogGroupId: item.id,
                type: item.type,
              })
            }
            onLogPress={log =>
              props.navigation.navigate('ProgramCreateLogScreen', {
                programLogGroupId: item.id,
                type: item.type,
                log: log,
              })
            }
            onEditLogPress={log =>
              props.navigation.navigate('ProgramCreateLogScreen', {
                programLogGroupId: item.id,
                type: item.type,
                log: log,
              })
            }
            onDeleteLogPress={setDeleteLogId}
            onDeleteGroupPress={setDeleteLogGroupId}
          />
        )}
        data={programLogGroups}
        estimatedItemSize={3}
        ListEmptyComponent={() =>
          loading ? (
            <Loader isLoading style={defaultStyles.absoluteCenterContent} />
          ) : (
            <AppText
              style={[defaultStyles.container, defaultStyles.marginTopLarge]}
              centerText>
              Click on the + to add a group
            </AppText>
          )
        }
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
      <ConfirmModal
        message={'Are you sure you want to delete this log?'}
        isOpen={!!deleteLogId}
        type={'WARNING'}
        onDismiss={() => setDeleteLogId(undefined)}
        onConfirm={() => {
          if (deleteLogId) {
            deleteProgramLog({variables: {id: deleteLogId}});
            setDeleteLogId(undefined);
          }
        }}
      />
      <ConfirmModal
        message={'Are you sure you want to delete this log group?'}
        isOpen={!!deleteLogGroupId}
        type={'WARNING'}
        onDismiss={() => setDeleteLogGroupId(undefined)}
        onConfirm={() => {
          if (deleteLogGroupId) {
            deleteProgramLogGroup({variables: {id: deleteLogGroupId}});
            setDeleteLogGroupId(undefined);
          }
        }}
      />
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
export default ProgramGroupScreen;
