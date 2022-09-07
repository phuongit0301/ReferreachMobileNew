import React, {createContext} from 'react';
import PubNub from 'pubnub';
import {useSelector} from 'react-redux';
import {PubNubProvider} from 'pubnub-react';

import {AppState} from '~Root/reducers';

const PubNubContext = createContext({});

export const usePubNub = () => {
  const context = React.useContext(PubNubContext);
  if (context === undefined) {
    throw new Error('`usePubNub` hook must be used within a `PubNubContextProvider` component');
  }
  return context;
};

export const PubNubContextProvider = (props: any) => {
  const pubnubState = useSelector((state: AppState) => state.pubnubState);

  const {children} = props;

  const pubnub = new PubNub({
    subscribeKey: pubnubState?.data?.subscribe_key ?? '',
    publishKey: pubnubState?.data?.publish_key ?? '',
    uuid: pubnubState?.data?.uuid ?? new Date().getTime(),
    authKey: pubnubState?.data?.token ?? '',
    // logVerbosity: true,
  });

  return (
    <PubNubContext.Provider value={{pubnub}}>
      <PubNubProvider client={pubnub}>{children}</PubNubProvider>
    </PubNubContext.Provider>
  );
};
