import {useNetInfo} from '@react-native-community/netinfo';
import React, {PropsWithChildren} from 'react';
import PopupModal from '../components/common/PopupModal';

const NetworkProvider: React.FC<PropsWithChildren> = props => {
  const netInfo = useNetInfo();

  return (
    <>
      {props.children}
      <PopupModal
        isOpen={netInfo.isConnected === false}
        message={'Connection error. Device is not connected to the internet'}
        onDismiss={() => {}}
        type={'ERROR'}
      />
    </>
  );
};

export default NetworkProvider;
