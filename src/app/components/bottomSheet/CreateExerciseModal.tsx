import React from 'react';
import CreateExerciseModalContent from './CreateExerciseModalContent';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {ExerciseFragment} from '../../graphql/operations';

interface CreateExerciseProps {
  active: boolean;
  onDismiss: () => void;
  existingExercise?: ExerciseFragment;
  onUpdate: () => void;
}

const CreateExerciseModal: React.FC<CreateExerciseProps> = ({
  active,
  onDismiss,
  existingExercise,
  onUpdate,
}) => {
  return (
    <BottomSheetModalProvider>
      <CreateExerciseModalContent
        active={active}
        onDismiss={onDismiss}
        existingExercise={existingExercise}
        onUpdate={onUpdate}
      />
    </BottomSheetModalProvider>
  );
};

export default CreateExerciseModal;
