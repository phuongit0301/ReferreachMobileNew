import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Platform, Animated, Dimensions, Keyboard, KeyboardAvoidingView, TextInput} from 'react-native';
import {useHeaderHeight} from '@react-navigation/elements';
import {useKeyboard} from '@react-native-community/hooks';
import {GlobalStyles} from '~Root/config';

const KeyboardShift = (props: PropsWithChildren<{}>) => {
  const {children} = props;
  const [shift, setShift] = useState(new Animated.Value(0));
  const keyboard = useKeyboard();

  // On mount, add keyboard show and hide listeners
  // On unmount, remove them
  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide);
    return () => {
      Keyboard.removeAllListeners('keyboardDidShow');
      Keyboard.removeAllListeners('keyboardDidHide');
    };
  }, []);

  //  For React Native 0.66 and up, use this useEffect and useState combo, and comment out the other useEffect:
  //  const [didShowListener, setDidShowListener] = useState<EmitterSubscription | null>()
  //  const [didHideListener, setDidHideListener] = useState<EmitterSubscription | null>()
  //   useEffect(() => {
  //     setDidShowListener(Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow));
  //     setDidHideListener(Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide));
  //     return () => {
  //       if (didShowListener){
  //         didShowListener.remove();
  //       }
  //       if (didHideListener) {
  //         didHideListener.remove();
  //       }
  //     }
  //   }, [])

  const handleKeyboardDidShow = () => {
    const {height: windowHeight} = Dimensions.get('window');
    const keyboardHeight = keyboard.keyboardHeight;
    const currentlyFocusedInputRef = TextInput.State.currentlyFocusedInput();
    currentlyFocusedInputRef.measure((x, y, width, height, pageX, pageY) => {
      const fieldHeight = height;
      const fieldTop = pageY;
      const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
      if (gap >= 0) {
        return;
      }
      Animated.timing(shift, {
        toValue: gap,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleKeyboardDidHide = () => {
    Animated.timing(shift, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  // Android: we need an animated view since the keyboard style can vary widely
  // And React Native's KeyboardAvoidingView isn't always reliable
  if (Platform.OS === 'android') {
    return (
      <Animated.View style={[GlobalStyles.container, {transform: [{translateY: shift}]}]}>{children}</Animated.View>
    );
  }

  // iOS: React Native's KeyboardAvoidingView with header offset and
  // behavior 'padding' works fine on all ios devices (and keyboard types)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const headerHeight = useHeaderHeight();
  return (
    <KeyboardAvoidingView keyboardVerticalOffset={headerHeight} style={GlobalStyles.container} behavior={'padding'}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default KeyboardShift;
