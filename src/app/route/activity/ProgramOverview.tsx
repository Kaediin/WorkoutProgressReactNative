import React, {useMemo, useRef, useState} from 'react';
import {RefreshControl, StyleSheet, View} from 'react-native';
import {defaultStyles} from '../../utils/DefaultStyles';
import FloatingButton from '../../components/common/FloatingButton';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import {CustomBottomSheet} from '../../components/bottomSheet/CustomBottomSheet';
import AppText from '../../components/common/AppText';
import {
  ProgramInput,
  ScheduledProgramInput,
  useCreateProgramMutation,
  useDeleteProgramMutation,
  useMyProgramsQuery,
  useScheduleProgramMutation,
  useUpdateProgramMutation,
} from '../../graphql/operations';
import Constants from '../../utils/Constants';
import moment from 'moment';
import Loader from '../../components/common/Loader';
import ProgramListItem from '../../components/program/ProgramListItem';
import ContextMenu from 'react-native-context-menu-view';
import ConfirmModal from '../../components/common/ConfirmModal';
import {Fab} from '../../utils/Fab';
import {Add, Schedule} from '../../icons/svg';
import ScheduleProgramBottomSheetContent from '../../components/program/ScheduleProgramBottomSheetContent';
import {IActionProps} from 'react-native-floating-action';
import {FlashList} from '@shopify/flash-list';

interface ProgramOverviewProps {
  onProgramPressed: (programId: string) => void;
  onNavigateToActivity: () => void;
}

const ProgramOverview: React.FC<ProgramOverviewProps> = props => {
  // Constants
  const initialProgram: ProgramInput = {
    name: '',
    zonedDateTime: '',
    remark: '',
  };

  // Refs
  const createProgramBottomSheetModalRef = useRef<BottomSheetModal>(null);
  const scheduleProgramBottomSheetModalRef = useRef<BottomSheetModal>(null);

  // States
  const [deleteProgramId, setDeleteProgramId] = useState<string>('');
  const [editID, setEditID] = useState<string>();
  const [program, setProgram] = useState<ProgramInput>(initialProgram);
  const [scheduleProgramInput, setScheduleProgramInput] =
    useState<ScheduledProgramInput>();

  // Queries
  const {
    data: myPrograms,
    loading: myProgramsLoading,
    refetch: refetchMyPrograms,
  } = useMyProgramsQuery({
    fetchPolicy: 'no-cache',
  });

  // Mutations
  const [createProgram, {loading: newProgramLoading}] =
    useCreateProgramMutation({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data.createProgram) {
          refetchMyPrograms();
          setProgram(initialProgram);
          createProgramBottomSheetModalRef.current?.dismiss();
        }
      },
    });

  const [updateProgram, {loading: updateProgramLoading}] =
    useUpdateProgramMutation({
      fetchPolicy: 'no-cache',
      onCompleted: data => {
        if (data?.updateProgram) {
          refetchMyPrograms();
          setProgram(initialProgram);
          createProgramBottomSheetModalRef.current?.dismiss();
        }
      },
    });

  const [removeProgram] = useDeleteProgramMutation({
    fetchPolicy: 'no-cache',
    onCompleted: () => {
      setDeleteProgramId('');
      refetchMyPrograms();
    },
  });

  const [scheduleProgram, {loading: scheduleProgramLoading}] =
    useScheduleProgramMutation({
      fetchPolicy: 'no-cache',
      onCompleted: () => {
        scheduleProgramBottomSheetModalRef.current?.dismiss();
        props.onNavigateToActivity();
      },
    });

  /**
   * Disable the FAB if the program name is empty
   */
  const disabled = useMemo(
    () => !program.name || program.name.length === 0,
    [program.name],
  );

  /**
   * Function to handle the click event of the FAB
   */
  const onFABClicked = () => {
    if (createProgramBottomSheetModalRef.current) {
      setEditID(undefined);
      createProgramBottomSheetModalRef.current.present();
    }
  };

  const fabActions = useMemo<IActionProps[]>(() => {
    const data: IActionProps[] = [
      {
        text: 'Create program',
        icon: <Add />,
        name: Fab.NEWLOG,
        color: Constants.PRIMARY_GRADIENT[0],
      },
    ];
    if (myPrograms?.myPrograms && myPrograms?.myPrograms.length > 0) {
      data.push({
        text: 'Schedule program',
        icon: <Schedule />,
        name: Fab.SCHEDULE,
        color: Constants.PRIMARY_GRADIENT[0],
      });
    }
    return data;
  }, [myPrograms?.myPrograms]);

  return (
    <View style={[defaultStyles.flex1, defaultStyles.marginTop]}>
      <FlashList
        estimatedItemSize={3}
        data={myPrograms?.myPrograms}
        refreshControl={
          <RefreshControl
            colors={['#fff', '#ccc']}
            tintColor={'#fff'}
            refreshing={myProgramsLoading}
            onRefresh={refetchMyPrograms}
          />
        }
        refreshing={myProgramsLoading}
        renderItem={({item}) => (
          <ContextMenu
            actions={[
              {
                title: 'Edit',
              },
              {
                title: 'Delete',
                destructive: true,
              },
            ]}
            onPress={e => {
              if (e.nativeEvent.name === 'Edit') {
                setEditID(item.id);
                setProgram({
                  name: item.name,
                  zonedDateTime: item.createdDateTime,
                  remark: item.remark,
                });
                createProgramBottomSheetModalRef.current?.present();
              } else if (e.nativeEvent.name === 'Delete') {
                setDeleteProgramId(item.id);
              }
            }}
            key={item.id}
            style={defaultStyles.shadow}>
            <ProgramListItem
              program={item}
              onProgramPressed={props.onProgramPressed}
            />
          </ContextMenu>
        )}
        ListEmptyComponent={() =>
          myProgramsLoading ? (
            <Loader isLoading style={defaultStyles.absoluteCenterContent} />
          ) : (
            <AppText
              style={[defaultStyles.marginTop50, defaultStyles.container]}
              centerText>
              No programs created yet. Click on the + to create a program
            </AppText>
          )
        }
      />
      <BottomSheetModalProvider>
        <CustomBottomSheet
          ref={createProgramBottomSheetModalRef}
          index={40}
          rightText={editID ? 'Adjust program' : 'Create program'}
          disableRightText={disabled}
          onRightTextClicked={() => {
            if (editID) {
              updateProgram({
                variables: {
                  id: editID,
                  input: {
                    name: program.name,
                    zonedDateTime: moment().toISOString(true),
                    remark: program.remark,
                  },
                },
              });
            } else {
              createProgram({
                variables: {
                  input: {
                    name: program.name,
                    zonedDateTime: moment().toISOString(true),
                    remark: program.remark,
                  },
                },
              });
            }
          }}>
          {newProgramLoading || updateProgramLoading ? (
            <Loader isLoading />
          ) : (
            <>
              <View
                style={[defaultStyles.separator, defaultStyles.marginBottom]}
              />
              <View style={defaultStyles.spaceBetween}>
                <AppText style={styles.header}>Name</AppText>
              </View>
              <BottomSheetTextInput
                style={defaultStyles.textInputWithHeight}
                defaultValue={program.name}
                placeholderTextColor={'darkgrey'}
                placeholder="Program name"
                onChangeText={name =>
                  setProgram(prevState => ({...prevState, name}))
                }
                maxLength={Constants.TEXT_INPUT_MAX_LENGTH}
              />

              <View style={defaultStyles.marginTop} />

              <AppText style={styles.header}>Remark</AppText>
              <BottomSheetTextInput
                defaultValue={program.remark || ''}
                onChangeText={remark =>
                  setProgram(prevState => ({...prevState, remark}))
                }
                style={defaultStyles.textInputWithHeight}
                placeholderTextColor={'darkgrey'}
                placeholder={'Remarks for this workout'}
                maxLength={Constants.TEXT_AREA_MAX_LENGTH}
              />
            </>
          )}
        </CustomBottomSheet>
        <CustomBottomSheet
          ref={scheduleProgramBottomSheetModalRef}
          rightText={'Schedule'}
          disableRightText={
            scheduleProgramInput?.programId.length === 0 ||
            !scheduleProgramInput?.scheduleZonedDateTime
          }
          onRightTextClicked={() => {
            if (
              !scheduleProgramInput ||
              !scheduleProgramInput?.programId ||
              !scheduleProgramInput?.scheduleZonedDateTime ||
              !scheduleProgramInput?.workoutName
            ) {
              return;
            }
            scheduleProgram({
              variables: {
                input: {
                  programId: scheduleProgramInput.programId,
                  workoutName: scheduleProgramInput.workoutName,
                  scheduleZonedDateTime:
                    scheduleProgramInput.scheduleZonedDateTime,
                  zonedDateTime: moment().toISOString(true),
                  remark: scheduleProgramInput.remark,
                },
              },
            });
          }}>
          <ScheduleProgramBottomSheetContent
            onProgramScheduleChanged={setScheduleProgramInput}
            loading={scheduleProgramLoading}
          />
        </CustomBottomSheet>
        <FloatingButton
          actions={fabActions}
          onPressAction={name =>
            name === Fab.NEWLOG
              ? onFABClicked()
              : name === Fab.SCHEDULE
              ? scheduleProgramBottomSheetModalRef.current?.present()
              : null
          }
        />
      </BottomSheetModalProvider>
      <ConfirmModal
        message={'Are you sure you want to remove this program?'}
        isOpen={!!deleteProgramId}
        type={'WARNING'}
        onDismiss={() => setDeleteProgramId('')}
        onConfirm={() =>
          removeProgram({
            variables: {
              id: deleteProgramId,
            },
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'grey',
  },
});

export default ProgramOverview;
