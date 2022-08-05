import {View} from 'react-native';
import React from 'react';
import {t} from 'i18next';
import LinearGradient from 'react-native-linear-gradient';
import {Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {ASK_STATUS_ENUM} from '~Root/utils';
import styles from './styles';

interface Props {
  chatContext: any;
}

const Header: React.FC<Props> = ({chatContext}) => {
  if (chatContext?.attributes?.status === ASK_STATUS_ENUM.EXPIRED) {
    return (
      <LinearGradient
        colors={[BASE_COLORS.forestGreenColor, BASE_COLORS.forestGreenColor]}
        style={[GlobalStyles.center, styles.askEnd]}>
        <View style={[GlobalStyles.pv5]}>
          <Paragraph p textCenter textWhite bold700 title={t('ask_expired_1')} />
        </View>
      </LinearGradient>
    );
  }

  if (chatContext?.attributes?.status === ASK_STATUS_ENUM.CLOSED) {
    return (
      <LinearGradient
        colors={[BASE_COLORS.forestGreenColor, BASE_COLORS.forestGreenColor]}
        style={[GlobalStyles.center, styles.askEnd]}>
        <View style={[GlobalStyles.pv5]}>
          <Paragraph p textCenter textWhite bold700 title={t('ask_ended')} />
        </View>
      </LinearGradient>
    );
  }

  return null;
};

export default Header;
