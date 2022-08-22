import React from 'react';
import {View, ViewStyle, TextStyle, TouchableOpacity} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {IIndustry, IIndustrySave} from '~Root/services/industry/types';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Paragraph, Icon, Button, CheckBox, Category} from '~Root/components';
import {adjust} from '~Root/utils';
import styles from './styles';
interface Props {
  data: IIndustry[] | IIndustrySave[];
  showIcon?: boolean;
  styleContainer?: ViewStyle;
  styleHeaderContainer?: ViewStyle;
  showTitle?: boolean;
  title: string;
  titleStyle?: TextStyle;
  showSubTitle?: boolean;
  showNoData?: boolean;
  subTitle?: string;
  subTitleStyle?: TextStyle;
  subTitleContainerStyle?: ViewStyle;
  noDataMessage?: string;
  noDataStyle?: TextStyle;
  noDataStyleContainer?: ViewStyle;
  showButton?: boolean;
  showIconSubTitle?: boolean;
  iconSubName?: string;
  iconSubSize?: number;
  iconSubColor?: string;
  buttonTitle?: string;
  iconName?: string;
  iconSize?: number;
  iconColor?: string;
  onPress: () => void;
  showTooltip: boolean;
  onTooltipPress: () => void;
  onCheckBoxChange?: (isChecked: boolean, target: any) => void;
  isChecked?: boolean;
  showRequired?: boolean;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  textRequiredStyle?: TextStyle;
  checkboxTitle?: string;
  tooltipTitle?: string;
  tooltipDescription?: string;
  required?: boolean;
  showCheckbox?: boolean;
  onDelete?: ({index, target}: {index: number; target: string}) => void;
  dataTarget?: string;
  styleTag?: ViewStyle;
  tagText?: TextStyle;
}

const UserCard: React.FC<Props> = ({
  data = [],
  showIcon = true,
  styleContainer = {},
  styleHeaderContainer = {},
  showTitle = true,
  title = 'Unknown',
  titleStyle = {},
  showSubTitle = true,
  showNoData = false,
  subTitle = 'visible to public',
  subTitleStyle = {},
  subTitleContainerStyle = {},
  noDataMessage = 'No Data',
  noDataStyle = {},
  noDataStyleContainer = {},
  showButton = true,
  showIconSubTitle = true,
  iconSubName = 'home',
  iconSubSize = 14,
  iconSubColor = BASE_COLORS.gunmetalColor,
  buttonTitle = 'Add',
  iconName = 'plus',
  iconSize = 12,
  iconColor = BASE_COLORS.darkGrayColor,
  onPress = () => {},
  showRequired = false,
  containerStyle = {},
  textStyle = {},
  textRequiredStyle = {},
  showTooltip = false,
  onTooltipPress = () => {},
  onCheckBoxChange = () => {},
  isChecked = false,
  checkboxTitle = '',
  tooltipTitle = '',
  tooltipDescription = '',
  showCheckbox = false,
  required = true,
  onDelete = () => {},
  dataTarget = '',
  styleTag = {},
  tagText = {},
  children,
}) => {
  return (
    <View style={[GlobalStyles.flexColumn, styles.listContainer, styleContainer]}>
      {showTitle && (
        <View style={[GlobalStyles.flexRow, styleHeaderContainer]}>
          <Paragraph
            p
            bold600
            textSteelBlue2Color
            title={`${title}${required ? '*' : ''}`}
            style={[styles.title, titleStyle]}
          />
          <Tooltip
            isVisible={showTooltip}
            backgroundColor='transparent'
            contentStyle={styles.tooltipContentStyle}
            tooltipStyle={styles.tooltipStyle}
            content={
              <View style={GlobalStyles.flexColumn}>
                <View style={[GlobalStyles.mb10, GlobalStyles.flexRow]}>
                  <TouchableOpacity style={styles.tooltipCloseBtn} onPress={onTooltipPress}>
                    <Icon name='times' color={BASE_COLORS.morningBlueColor} size={adjust(12)} />
                  </TouchableOpacity>
                </View>
                <Paragraph p title={tooltipTitle} style={[GlobalStyles.mb10, styles.tooltipTitleColor]} />
                <Paragraph p title={tooltipDescription} style={styles.tooltipTextColor} />
              </View>
            }
            placement='bottom'>
            <TouchableOpacity onPress={onTooltipPress}>
              <Ionicons name='help-circle' color={BASE_COLORS.silverChaliceColor} size={adjust(22)} />
            </TouchableOpacity>
          </Tooltip>
        </View>
      )}
      {showSubTitle && (
        <View style={[styles.subTitleContainer, subTitleContainerStyle]}>
          {showIconSubTitle && <Icon name={iconSubName} size={iconSubSize} color={iconSubColor} enableRTL={true} />}
          <Paragraph p title={subTitle} style={subTitleStyle} />
        </View>
      )}
      <View style={[GlobalStyles.mt10, GlobalStyles.flexRow, styles.tagContainer]}>
        {data.length > 0 &&
          data.map((item: IIndustry | IIndustrySave, index: number) =>
            typeof item === 'object' ? (
              <Category
                styleTag={styleTag}
                tagText={tagText}
                key={`selected-target-${dataTarget}-${index}`}
                itemKey={`${index}`}
                name={item?.name ?? item?.attributes?.display_value}
                showButton={showButton}
                onPress={() => onDelete({index, target: dataTarget})}
              />
            ) : (
              <Category
                styleTag={styleTag}
                tagText={tagText}
                key={`selected-target-${dataTarget}-${index}`}
                itemKey={`${index}`}
                name={item}
                showButton={showButton}
                onPress={() => onDelete({index, target: dataTarget})}
              />
            ),
          )}
        {showNoData && (
          <View style={noDataStyleContainer}>
            <Paragraph p title={noDataMessage} style={noDataStyle} />
          </View>
        )}
        {showButton && (
          <Button
            title={buttonTitle}
            isIconRight={true}
            onPress={onPress}
            containerStyle={containerStyle}
            textStyle={textStyle}>
            {showIcon && <Icon name={iconName} size={iconSize} color={iconColor} enableRTL={true} />}
          </Button>
        )}
      </View>
      {showCheckbox && (
        <CheckBox
          isChecked={isChecked}
          item='second'
          text={checkboxTitle}
          style={styles.checkbox}
          onChange={onCheckBoxChange}
          textStyle={GlobalStyles.ml5}
        />
      )}
      {showRequired && <Paragraph p title='* required' style={[styles.textRequiredStyle, textRequiredStyle]} />}
      {children}
    </View>
  );
};

export default UserCard;
