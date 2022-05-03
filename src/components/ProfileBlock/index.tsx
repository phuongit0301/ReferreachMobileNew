import React from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Category, Icon, Paragraph, UserCard} from '~Root/components';
import styles from './styles';
interface Props {
  industries: any[];
  clients: any[];
  partners: any[];
  onDelete: ({index, target}: {index: number; target: string}) => void;
  handleIndustry: ({title, target}: {title: string; target: number}) => void;
  showTooltip?: any;
  checkbox?: any;
  onTooltipPress?: (target: string) => void;
  onCheckBoxChange?: (isChecked: boolean, target: string) => void;
}

const ProfileBlock: React.FC<Props> = ({
  industries = [],
  clients = [],
  partners = [],
  onDelete = () => {},
  handleIndustry = () => {},
  showTooltip,
  checkbox,
  onTooltipPress = (target: string) => {},
  onCheckBoxChange = (isChecked: boolean, target: string) => {},
}) => {
  const {t} = useTranslation();

  return (
    <View style={GlobalStyles.flexColumn}>
      {industries.length > 0 ? (
        <View style={styles.tagContainer}>
          <Paragraph h5 title={t('your_industry')} style={styles.titleStyle} />
          <View style={styles.tagSubTitle}>
            <Icon name='globe' size={14} color={BASE_COLORS.gunmetalColor} />
            <Paragraph p title={t('visible_to_public')} style={styles.subTitleStyle} />
          </View>
          {industries.map((item: any, index: number) =>
            typeof item === 'object' ? (
              <Category
                key={`selected-${index}`}
                itemKey={`${index}`}
                name={item?.name}
                showButton={true}
                onPress={() => onDelete({index, target: 'myself'})}
              />
            ) : (
              <Category
                key={`selected-${index}`}
                itemKey={`${index}`}
                name={item}
                showButton={true}
                onPress={() => onDelete({index, target: 'myself'})}
              />
            ),
          )}
        </View>
      ) : (
        <UserCard
          title={t('your_industry')}
          subTitle={t('visible_to_public')}
          showRequired={true}
          onPress={() => handleIndustry({title: t('your_industry'), target: 1})}
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
        />
      )}
      {clients.length > 0 ? (
        <View style={styles.tagContainer}>
          <Paragraph h5 title={t('you_sell_to')} style={styles.titleStyle} />
          <View style={styles.tagSubTitle}>
            <Icon name='eye-slash' size={14} color={BASE_COLORS.gunmetalColor} />
            <Paragraph p title={t('visible_to_public')} style={styles.subTitleStyle} />
          </View>
          {clients.map((item: any, index: number) =>
            typeof item === 'object' ? (
              <Category
                key={`selected-client-${index}`}
                itemKey={`${index}`}
                name={item?.name}
                showButton={true}
                onPress={() => onDelete({index, target: 'client'})}
              />
            ) : (
              <Category
                key={`selected-client-${index}`}
                itemKey={`${index}`}
                name={item}
                showButton={true}
                onPress={() => onDelete({index, target: 'client'})}
              />
            ),
          )}
        </View>
      ) : (
        <UserCard
          title={t('you_sell_to')}
          subTitle={t('not_visible_to_public')}
          showRequired={false}
          onPress={() => handleIndustry({title: t('you_sell_to'), target: 2})}
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
          checkboxTitle={t('sell_all_businesses')}
          showCheckbox={true}
          isChecked={checkbox?.second}
          onCheckBoxChange={onCheckBoxChange}
        />
      )}
      {partners.length > 0 ? (
        <View style={styles.tagContainer}>
          <Paragraph h5 title={t('your_partners')} style={styles.titleStyle} />
          <View style={styles.tagSubTitle}>
            <Icon name='check-circle' size={14} color={BASE_COLORS.gunmetalColor} />
            <Paragraph p title={t('visible_to_public')} style={styles.subTitleStyle} />
          </View>
          {partners.map((item: any, index: number) =>
            typeof item === 'object' ? (
              <Category
                key={`selected-partner-${index}`}
                itemKey={`${index}`}
                name={item.name}
                showButton={true}
                onPress={() => onDelete({index, target: 'partner'})}
              />
            ) : (
              <Category
                key={`selected-partner-${index}`}
                itemKey={`${index}`}
                name={item}
                showButton={true}
                onPress={() => onDelete({index, target: 'partner'})}
              />
            ),
          )}
        </View>
      ) : (
        <UserCard
          title={t('your_partners')}
          subTitle={t('trusted_network')}
          onPress={() => handleIndustry({title: t('your_partners'), target: 3})}
          containerStyle={styles.buttonContainer}
          textStyle={styles.buttonTextStyle}
          styleContainer={styles.cardItemContainer}
          subTitleContainerStyle={styles.cardSubTitleContainerStyle}
          showIconSubTitle={false}
          showTooltip={showTooltip?.third}
          onTooltipPress={() => onTooltipPress('third')}
          tooltipTitle={t('your_partners')}
          tooltipDescription={t('your_partners_description')}>
          <View style={styles.subTitleContainer}>
            <Icon name='check-circle' size={20} color={BASE_COLORS.gunmetalColor} />
            <Paragraph h5 title={t('select_all_businesses')} style={styles.subTitle} />
          </View>
        </UserCard>
      )}
    </View>
  );
};

export default ProfileBlock;
