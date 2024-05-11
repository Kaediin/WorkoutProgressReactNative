import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import AppText from '../common/AppText';
import {
  ProgramLogFragment,
  ProgramLogGroupFragment,
} from '../../graphql/operations';
import {enumToReadableString} from '../../utils/String';
import {defaultStyles} from '../../utils/DefaultStyles';
import ClickableText from '../common/ClickableText';
import ProgramLogListItem from './ProgramLogListItem';
import {nonNullable} from '../../utils/List';
import ContextMenu from 'react-native-context-menu-view';
import {ContextMenuActions} from '../../types/ContextMenuActions';
import {Delete} from '../../icons/svg';

interface ProgramLogGroupListItemProps {
  programLogGroup: ProgramLogGroupFragment;
  onLogPress?: (log: ProgramLogFragment) => void;
  onCreateLogPress?: () => void;
  onEditLogPress?: (log: ProgramLogFragment) => void;
  onDeleteLogPress?: (id: string) => void;
  onDeleteGroupPress?: (id: string) => void;
  readonly?: boolean;
}

const ProgramLogGroupListItem: React.FC<
  ProgramLogGroupListItemProps
> = props => {
  return (
    <View style={defaultStyles.container}>
      <View style={styles.row}>
        <View style={[defaultStyles.row, defaultStyles.spaceBetween]}>
          <AppText h4>
            {enumToReadableString(props.programLogGroup.type)}
          </AppText>
          {!props.readonly && (
            <View style={defaultStyles.row}>
              <ClickableText
                text={'Add log'}
                onPress={props.onCreateLogPress}
              />
              <View style={defaultStyles.marginHorizontal} />
              <TouchableOpacity
                onPress={() =>
                  props.onDeleteGroupPress &&
                  props.onDeleteGroupPress(props.programLogGroup.id)
                }>
                <Delete />
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={defaultStyles.marginBottom} />
        <View>
          {props.programLogGroup.logs.filter(nonNullable).map(log => (
            <TouchableOpacity
              style={defaultStyles.marginBottom}
              key={log.id}
              onPress={() => props.onLogPress && props.onLogPress(log)}>
              <ContextMenu
                actions={[
                  {
                    title: ContextMenuActions.EDIT,
                  },
                  {
                    title: ContextMenuActions.DELETE,
                    destructive: true,
                  },
                ]}
                onPress={e => {
                  if (e.nativeEvent.name === ContextMenuActions.EDIT) {
                    props.onEditLogPress && props.onEditLogPress(log);
                  } else if (e.nativeEvent.name === ContextMenuActions.DELETE) {
                    if (log.id) {
                      props.onDeleteLogPress && props.onDeleteLogPress(log.id);
                    }
                  }
                }}>
                <ProgramLogListItem log={log} />
              </ContextMenu>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    width: '100%',
    marginBottom: 10,
  },
});

export default ProgramLogGroupListItem;
