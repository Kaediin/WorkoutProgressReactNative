import React, {useRef} from 'react';
import {FloatingAction, IActionProps} from 'react-native-floating-action';
import Constants from '../../utils/Constants';

interface FloatingButtonProps {
  onClick?: () => void;
  secondary?: boolean;
  actions?: IActionProps[];
  onPressAction?: (name: string | undefined) => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  onClick,
  actions,
  onPressAction,
}) => {
  const refFLoat = useRef<FloatingAction>(null);

  return (
    <FloatingAction
      ref={refFLoat}
      onPressMain={() => {
        if (!actions && onClick) {
          onClick();
        }
      }}
      onOpen={() => {
        if (!actions) {
          // @ts-ignore
          refFLoat?.current?.animateButton();
        }
      }}
      actions={actions}
      onPressItem={name => {
        if (onPressAction) {
          onPressAction(name);
        }
      }}
      color={Constants.PRIMARY_GRADIENT[0]}
    />
  );
};

export default FloatingButton;
