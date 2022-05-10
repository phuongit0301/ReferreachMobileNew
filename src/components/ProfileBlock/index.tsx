import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Category, Icon, Paragraph, UserCard} from '~Root/components';
import styles from './styles';
interface Props {
  myself: any[];
  client: any[];
  partner: any[];
  onDelete: ({index, target}: {index: number; target: string}) => void;
  handleModal: ({title, target}: {title: string; target: number}) => void;
  showTooltip?: any;
  checkbox?: any;
  onTooltipPress?: (target: string) => void;
  onCheckBoxChange?: (isChecked: boolean, target: string) => void;
}

const ProfileBlock: React.FC<Props> = ({
  myself = [],
  client = [],
  partner = [],
  onDelete = () => {},
  handleModal = () => {},
  showTooltip,
  checkbox,
  onTooltipPress = (target: string) => {},
  onCheckBoxChange = (isChecked: boolean, target: string) => {},
}) => {
  const {t} = useTranslation();

  return (
    <View style={GlobalStyles.flexColumn}>
      <UserCard
        data={myself}
        title={t('your_industry')}
        subTitle={t('visible_to_public')}
        showRequired={true}
        onPress={() => handleModal({title: t('your_industry'), target: 1})}
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonTextStyle}
        styleContainer={styles.cardItemContainer}
        subTitleContainerStyle={styles.cardSubTitleContainerStyle}
        textRequiredStyle={styles.cardTextRequiredStyle}
        showIconSubTitle={true}
        iconSubName='globe'
        subTitleStyle={styles.subTitleStyle}
        showTooltip={showTooltip?.first}
        onTooltipPress={() => onTooltipPress('first')}
        tooltipTitle={t('your_industry')}
        tooltipDescription={t('your_industry_description')}
        onDelete={onDelete}
        dataTarget='myself'
        styleTag={styles.styleTag}
      />
      <UserCard
        data={client}
        title={t('you_sell_to')}
        subTitle={t('not_visible_to_public')}
        showRequired={false}
        onPress={() => handleModal({title: t('you_sell_to'), target: 2})}
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonTextStyle}
        styleContainer={styles.cardItemContainer}
        subTitleContainerStyle={styles.cardSubTitleContainerStyle}
        textRequiredStyle={styles.cardTextRequiredStyle}
        subTitleStyle={styles.subTitleStyle}
        iconSubName='eye-slash'
        showTooltip={showTooltip?.second}
        onTooltipPress={() => onTooltipPress('second')}
        tooltipTitle={t('you_sell_to')}
        tooltipDescription={t('you_sell_to_description')}
        onDelete={onDelete}
        dataTarget='client'
        styleTag={styles.styleTag}
      />
      <UserCard
        data={partner}
        title={t('your_partners')}
        subTitle={t('trusted_network')}
        onPress={() => handleModal({title: t('your_partners'), target: 3})}
        containerStyle={styles.buttonContainer}
        textStyle={styles.buttonTextStyle}
        styleContainer={styles.cardItemContainer}
        subTitleContainerStyle={styles.cardSubTitleContainerStyle}
        showIconSubTitle={false}
        showTooltip={showTooltip?.third}
        onTooltipPress={() => onTooltipPress('third')}
        tooltipTitle={t('your_partners')}
        tooltipDescription={t('your_partners_description')}
        onDelete={onDelete}
        dataTarget='partner'
        styleTag={styles.styleTag}
      />
    </View>
  );
};

export default ProfileBlock;
