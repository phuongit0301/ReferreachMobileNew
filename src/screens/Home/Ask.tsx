import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tooltip from 'react-native-walkthrough-tooltip';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {IMyAsk} from '~Root/services/ask/types';
import {Button, ListItems, Paragraph, Icon} from '~Root/components';
import styles from './styles';
import {adjust} from '~Root/utils';

interface IAsk {
  askState: IMyAsk[];
  showTooltip: boolean;
  onPress: () => void;
  onTooltipPress: () => void;
  onItemClick: (item: IMyAsk) => void;
}
interface Props {
  contentProps: IAsk;
  tabLabel?: number;
}

const Ask: React.FC<Props> = ({
  contentProps: {askState, showTooltip = false, onPress, onTooltipPress, onItemClick},
}) => {
  const {t} = useTranslation();

  return (
    <View style={styles.askContainer}>
      <View style={styles.askHeader}>
        <Paragraph h5 title={t('your_asks')} style={styles.titleBlue} />
        <Tooltip
          isVisible={showTooltip}
          backgroundColor='transparent'
          contentStyle={styles.tooltipContentStyle}
          tooltipStyle={styles.tooltipStyle}
          content={
            <View style={GlobalStyles.flexColumn}>
              <View style={[GlobalStyles.mb10, GlobalStyles.flexRow]}>
                <Paragraph h4 textWhite title={t('your_asks')} />
                <TouchableOpacity style={styles.tooltipCloseBtn} onPress={onTooltipPress}>
                  <Icon name='times' color={BASE_COLORS.morningBlueColor} size={adjust(12)} />
                </TouchableOpacity>
              </View>
              <Paragraph p title={t('ask_easy_way')} style={[GlobalStyles.mb10, styles.tooltipTextColor]} />
              <Paragraph p title={t('click_introduction')} style={styles.tooltipTextColor} />
            </View>
          }
          placement='bottom'>
          <TouchableOpacity onPress={onTooltipPress}>
            <Ionicons name='help-circle' color={BASE_COLORS.davysGreyColor} size={adjust(22)} />
          </TouchableOpacity>
        </Tooltip>
        <View style={styles.editButton}>
          <TouchableOpacity>
            <Icon name='pencil-alt' color={BASE_COLORS.davysGreyColor} size={16} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={GlobalStyles.flexColumn}>
        <ListItems data={askState} onItemClick={onItemClick} />
      </View>
      <View style={styles.mainButtonContainer}>
        <Button
          bordered
          title={t('create_ask')}
          onPress={onPress}
          containerStyle={styles.mainButtonArea}
          textStyle={styles.textStyle}
          textWhite
        />
      </View>
    </View>
  );
};
export default Ask;
