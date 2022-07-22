import React from 'react';
import {View, TextStyle, ViewStyle, KeyboardAvoidingView, ScrollView, Platform} from 'react-native';
import Modal from 'react-native-modal';

import {Button, Paragraph} from '~Root/components';

import styles from './styles';

type Animate =
  | 'bounce'
  | 'flash'
  | 'jello'
  | 'pulse'
  | 'rotate'
  | 'rubberBand'
  | 'shake'
  | 'swing'
  | 'tada'
  | 'wobble'
  | 'bounceIn'
  | 'bounceInDown'
  | 'bounceInUp'
  | 'bounceInLeft'
  | 'bounceInRight'
  | 'bounceOut'
  | 'bounceOutDown'
  | 'bounceOutUp'
  | 'bounceOutLeft'
  | 'bounceOutRight'
  | 'fadeIn'
  | 'fadeInDown'
  | 'fadeInDownBig'
  | 'fadeInUp'
  | 'fadeInUpBig'
  | 'fadeInLeft'
  | 'fadeInLeftBig'
  | 'fadeInRight'
  | 'fadeInRightBig'
  | 'fadeOut'
  | 'fadeOutDown'
  | 'fadeOutDownBig'
  | 'fadeOutUp'
  | 'fadeOutUpBig'
  | 'fadeOutLeft'
  | 'fadeOutLeftBig'
  | 'fadeOutRight'
  | 'fadeOutRightBig'
  | 'flipInX'
  | 'flipInY'
  | 'flipOutX'
  | 'flipOutY'
  | 'lightSpeedIn'
  | 'lightSpeedOut'
  | 'slideInDown'
  | 'slideInUp'
  | 'slideInLeft'
  | 'slideInRight'
  | 'slideOutDown'
  | 'slideOutUp'
  | 'slideOutLeft'
  | 'slideOutRight'
  | 'zoomIn'
  | 'zoomInDown'
  | 'zoomInUp'
  | 'zoomInLeft'
  | 'zoomInRight'
  | 'zoomOut'
  | 'zoomOutDown'
  | 'zoomOutUp'
  | 'zoomOutLeft'
  | 'zoomOutRight';

interface Props {
  isVisible: boolean;
  isDefault?: boolean;
  title?: string;
  content?: string;
  onHideModal: () => void;
  onPositive?: () => void;
  btnText?: string;
  styleTitle?: TextStyle;
  styleContentContainer?: ViewStyle;
  styleContent?: TextStyle;
  styleButtonContainer?: ViewStyle;
  styleModal?: ViewStyle;
  styleBtnText?: TextStyle;
  styleContainer?: ViewStyle;
  styleModalContainer?: ViewStyle;
  animationIn?: Animate;
  animationOut?: Animate;
}

const ModalDialogCommon: React.FC<Props> = ({
  isVisible,
  isDefault = true,
  title = '',
  content = '',
  btnText = 'OK',
  onHideModal = () => {},
  onPositive = () => {},
  styleTitle = {},
  styleContentContainer = {},
  styleContent = {},
  styleButtonContainer = {},
  styleBtnText = {},
  styleModal = {},
  styleContainer = {},
  styleModalContainer = {},
  animationIn = 'slideInUp',
  animationOut = 'slideOutDown',
  children,
}) => {
  return (
    <Modal
      style={styleModalContainer}
      isVisible={isVisible}
      onBackdropPress={onHideModal}
      animationIn={animationIn}
      useNativeDriver={true}
      hideModalContentWhileAnimating={true}
      animationOut={animationOut}>
      <KeyboardAvoidingView enabled behavior={Platform.OS === 'android' ? undefined : 'position'}>
        <ScrollView scrollEnabled={false} keyboardShouldPersistTaps='handled'>
          <View style={[styles.container, styles.modal, styleModal]}>
            {isDefault ? (
              <>
                <Paragraph h4 style={[styles.title, styleTitle]} title={title} />
                <View style={[styles.contentContainer, styleContentContainer]}>
                  <Paragraph h5 textBlack title={content} style={[styles.styleContent, styleContent]} />
                </View>
                <Button
                  title={btnText}
                  onPress={onPositive}
                  containerStyle={{...styles.btnStyle, ...styleBtnText}}
                  textStyle={styles.h3BoldDefault}
                />
              </>
            ) : (
              children
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ModalDialogCommon;
