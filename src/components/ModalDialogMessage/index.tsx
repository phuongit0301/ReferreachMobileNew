import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

import {Icon, ModalDialogCommon, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {adjust} from '~Root/utils';
import styles from './styles';

interface Props {
  visibleModal: boolean;
  isDefault: boolean;
  onSelectIndividual: () => void;
  onSelectJoint: () => void;
  onVisibleModal: () => void;
}

const ModalDialogMessage: React.FC<Props> = ({
  visibleModal = false,
  isDefault = false,
  onSelectIndividual = () => {},
  onSelectJoint = () => {},
  onVisibleModal = () => {},
}) => {
  const {t} = useTranslation();

  return (
    <ModalDialogCommon
      isVisible={visibleModal}
      onHideModal={onVisibleModal}
      isDefault={isDefault}
      styleContainer={GlobalStyles.pb0}
      styleModal={GlobalStyles.styleModal}
      styleModalContainer={GlobalStyles.styleModalContainer}>
      <View style={GlobalStyles.pv20}>
        <Paragraph h5 textSteelBlueColor title={t('send_message')} style={styles.item} />
        <TouchableOpacity onPress={onSelectIndividual} style={[GlobalStyles.flexRow, styles.item]}>
          <Icon name='question-circle' size={adjust(10)} color={BASE_COLORS.blackColor} style={GlobalStyles.mr10} />
          <Paragraph
            h5
            textSteelBlueColor
            title={t('individual_message')}
            style={[GlobalStyles.mr5, GlobalStyles.container]}
          />
          <Icon name='arrow-circle-right' size={adjust(15)} color={BASE_COLORS.blackColor} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onSelectJoint} style={[GlobalStyles.flexRow, styles.itemNoBorder]}>
          <Icon name='question-circle' size={adjust(10)} color={BASE_COLORS.blackColor} style={GlobalStyles.mr10} />
          <Paragraph
            h5
            textSteelBlueColor
            title={t('joint_message')}
            style={[GlobalStyles.mr5, GlobalStyles.container]}
          />
          <Icon name='arrow-circle-right' size={adjust(15)} color={BASE_COLORS.blackColor} />
        </TouchableOpacity>
      </View>
    </ModalDialogCommon>
  );
};

export default ModalDialogMessage;
