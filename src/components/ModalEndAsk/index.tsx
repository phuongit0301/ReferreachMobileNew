import React from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, View, ViewStyle} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {Icon, ModalDialogCommon, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {MainNavigatorParamsList} from '~Root/navigation/config';
import {adjust} from '~Root/utils';
import styles from './styles';

interface PropsNav {
  navigation: NativeStackNavigationProp<MainNavigatorParamsList, AppRoute.HOME_DETAIL>;
}

interface Props {
  isVisible: boolean;
  isDefault: boolean;
  onHideModal: () => void;
  styleModal?: ViewStyle;
  onFoundResponse: () => void;
}

const ModalEndAsk: React.FC<Props & PropsNav> = ({
  isVisible = false,
  isDefault = false,
  onHideModal = () => {},
  styleModal = {},
  onFoundResponse = () => {},
}) => {
  const {t} = useTranslation();

  return (
    <ModalDialogCommon
      isVisible={isVisible}
      onHideModal={onHideModal}
      isDefault={isDefault}
      styleModal={{...styles.styleModal, ...styleModal}}
      styleModalContainer={styles.styleModalContainer}>
      <Paragraph h5 textCenter textSteelBlueColor bold title={t('end_ask')} />
      <View style={[GlobalStyles.flexColumn, styles.buttonGroup]}>
        <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.pv15]} onPress={onFoundResponse}>
          <Paragraph textCenter h5 textEerieBlackColor title={t('found_a_response')} style={GlobalStyles.container} />
          <Icon name='arrow-alt-circle-right' size={adjust(18)} color={BASE_COLORS.eerieBlackColor} />
        </TouchableOpacity>
        <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.pv15]} onPress={onHideModal}>
          <Paragraph
            textCenter
            h5
            textEerieBlackColor
            title={t('not_found_a_response')}
            style={GlobalStyles.container}
          />
          <Icon name='arrow-alt-circle-right' size={adjust(18)} color={BASE_COLORS.eerieBlackColor} />
        </TouchableOpacity>
      </View>
    </ModalDialogCommon>
  );
};

export default ModalEndAsk;
