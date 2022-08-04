import React, {useEffect, useState} from 'react';
import {Linking} from 'react-native';

export const useDeepLinkURL = () => {
  const [linkedURL, setLinkedURL] = useState<string | null>(null);

  // 1. If the app is not already open, it is opened and the url is passed in as the initialURL
  // You can handle these events with Linking.getInitialURL(url) -- it returns a Promise that
  // resolves to the url, if there is one.
  useEffect(() => {
    const getUrlAsync = async () => {
      // Get the deep link used to open the app
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setLinkedURL(decodeURI(initialUrl));
      }
    };

    getUrlAsync().catch(error => console.log(error));
  }, []);

  // 2. If the app is already open, the app is foregrounded and a Linking event is fired
  // You can handle these events with Linking.addEventListener(url, callback)
  useEffect(() => {
    const callback = ({url}: {url: string}) => setLinkedURL(decodeURI(url));
    const linkingSubscription = Linking.addEventListener('url', callback);
    return () => {
      //   Linking.removeEventListener('url', callback);
      linkingSubscription.remove();
    };
  }, []);

  const resetURL = () => setLinkedURL(null);

  return {linkedURL, resetURL};
};
