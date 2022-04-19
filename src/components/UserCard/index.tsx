import React from 'react';
import {View, ViewStyle, TextStyle, TouchableOpacity} from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {Paragraph, Icon, Button, CheckBox} from '~Root/components';
import {adjust} from '~Root/utils';
import styles from './styles';
interface Props {
  showIcon?: boolean;
  styleContainer?: ViewStyle;
  showTitle?: boolean;
  title: string;
  titleStyle?: ViewStyle;
  showSubTitle?: boolean;
  subTitle?: string;
  subTitleStyle?: TextStyle;
  subTitleContainerStyle?: ViewStyle;
  showButton?: boolean;
  showIconSubTitle?: boolean;
  iconSubName?: string;
  iconSubSize?: number;
  iconSubColor?: string;
  buttonTitle?: string;
  iconName?: string;
  buttonType?: string;
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
  showCheckbox?: boolean;
}

const UserCard: React.FC<Props> = ({
  showIcon = true,
  styleContainer = {},
  showTitle = true,
  title = 'Unknown',
  titleStyle = {},
  showSubTitle = true,
  subTitle = 'visible to public',
  subTitleStyle = {},
  subTitleContainerStyle = {},
  showButton = true,
  showIconSubTitle = true,
  iconSubName = 'home',
  iconSubSize = 14,
  iconSubColor = BASE_COLORS.gunmetalColor,
  buttonTitle = 'Add',
  iconName = 'plus',
  buttonType = 'outlined',
  iconSize = 14,
  iconColor = BASE_COLORS.gunmetalColor,
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
  children,
}) => {
  return (
    <View style={[GlobalStyles.flexColumn, styles.listContainer, styleContainer]}>
      {showTitle && (
        <View style={GlobalStyles.flexRow}>
          <Paragraph h5 bold title={title} style={[titleStyle, styles.title]} />
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
              <Ionicons name='help-circle' color={BASE_COLORS.davysGreyColor} size={adjust(22)} />
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
      {showButton && (
        <Button
          title={buttonTitle}
          isIconRight={true}
          onPress={onPress}
          type={buttonType}
          containerStyle={containerStyle}
          textStyle={textStyle}>
          {showIcon && <Icon name={iconName} size={iconSize} color={iconColor} enableRTL={true} />}
        </Button>
      )}
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
