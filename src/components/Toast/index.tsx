import React, {useEffect, useRef} from 'react';
import {Text, View, Animated, TouchableOpacity, ViewStyle, Dimensions, Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Image from '~Root/components/Image';
import Paragraph from '~Root/components/Paragraph';
import { IMAGES } from '~Root/config';

import styles from './styles';

interface IProps {
  show: boolean;
  message?: string;
  setShowToast?: any;
  styleToastContainer?: ViewStyle;
  isModal?: boolean;
  toValue?: number;
}

const {height} = Dimensions.get('window');

const ToastCustom: React.FC<IProps> = ({
  show = false,
  message = '',
  setShowToast,
  styleToastContainer = {},
  isModal = false,
  toValue = 250,
}) => {
  const popAnim = useRef(new Animated.Value(height)).current;
  const successHeader = 'Success!';
  const successMessage = 'You pressed the success button';

  useEffect(() => {
    if (show) {
      popIn();
    }
  }, [show]);

  const popOut = () => {
    setTimeout(() => {
      Animated.timing(popAnim, {
        toValue: height,
        duration: 300,
        useNativeDriver: true,
      }).start();
      setShowToast(false);
    }, 2000);
  };

  const popIn = () => {
    Animated.timing(popAnim, {
      toValue: isModal ? toValue : Platform.OS === 'ios' ? 680 : 650,
      duration: 300,
      useNativeDriver: true,
    }).start(popOut());
  };

  return (
    <Animated.View
      style={[
        styles.toastContainerActive,
        styleToastContainer,
        {
          transform: [{translateY: popAnim}],
        },
      ]}>
      <View style={styles.toastRow}>
        <Image source={IMAGES.iconLogo} resizeMode='contain' style={styles.iconLogo} />
        <View style={styles.toastTextContainer}>
          {message !== '' ? (
            <Paragraph textWhite p title={message} style={styles.toastText} />
          ) : (
            <>
              <Paragraph textWhite p title={successHeader} />
              <Paragraph textWhite p title={successMessage} />
            </>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

export default ToastCustom;
