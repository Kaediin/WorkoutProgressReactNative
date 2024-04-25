import React, {useMemo, useRef, useState} from 'react';
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native';
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
  useCreateProgramMutation,
  useDeleteProgramMutation,
  useMyProgramsQuery,
  useUpdateProgramMutation,
} from '../../graphql/operations';
import Constants from '../../utils/Constants';
import moment from 'moment';
import Loader from '../../components/common/Loader';
import ProgramListItem from '../../components/program/ProgramListItem';
import ContextMenu from 'react-native-context-menu-view';
import ConfirmModal from '../../components/common/ConfirmModal';

interface ProgramOverviewProps {
  onProgramPressed: (programId: string) => void;
}

const ProgramOverview: React.FC<ProgramOverviewProps> = props => {
  // Constants
  const initialProgram: ProgramInput = {
    name: '',
    zonedDateTime: '',
    remark: '',
  };

  // Refs
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // States
  const [deleteProgramId, setDeleteProgramId] = useState<string>('');
  const [editID, setEditID] = useState<string>();
  const [openDateTimePicker, setOpenDateTimePicker] = useState(false);
  const [program, setProgram] = useState<ProgramInput>(initialProgram);

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
          bottomSheetModalRef.current?.dismiss();
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
          bottomSheetModalRef.current?.dismiss();
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
    if (bottomSheetModalRef.current) {
      setEditID(undefined);
      bottomSheetModalRef.current.present();
    }
  };

  return (
    <View style={[defaultStyles.flex1, defaultStyles.marginTop]}>
      <FlatList
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
                bottomSheetModalRef.current?.present();
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
        ListEmptyComponent={() => (
          <AppText style={defaultStyles.marginTop50} centerText>
            No programs created yet
          </AppText>
        )}
      />
      <BottomSheetModalProvider>
        <CustomBottomSheet
          ref={bottomSheetModalRef}
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
        <FloatingButton onClick={onFABClicked} />
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
