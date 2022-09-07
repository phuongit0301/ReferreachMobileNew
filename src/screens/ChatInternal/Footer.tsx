import {View} from 'react-native';
import React from 'react';
import {t} from 'i18next';
import {Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import {ASK_STATUS_ENUM} from '~Root/utils';
import styles from './styles';

interface Props {
  chatContext: any;
}

const Footer: React.FC<Props> = ({chatContext}) => {
  if (chatContext?.attributes?.status === ASK_STATUS_ENUM.EXPIRED) {
    return (
      <View style={[GlobalStyles.alignCenter, GlobalStyles.flexRow]}>
        <View style={styles.lineThroughContainer} />
        <Paragraph textDarkGrayColor bold p textCenter title={t('ask_has_expired')} style={GlobalStyles.ph10} />
        <View style={styles.lineThroughContainer} />
      </View>
    );
  }

  if (chatContext?.attributes?.status === ASK_STATUS_ENUM.CLOSED) {
    return (
      <View style={[GlobalStyles.alignCenter, GlobalStyles.flexRow]}>
        <View style={styles.lineThroughContainer} />
        <Paragraph textDarkGrayColor bold p textCenter title={t('ask_has_ended')} style={GlobalStyles.ph10} />
        <View style={styles.lineThroughContainer} />
      </View>
    );
  }

  return null;
};

export default Footer;
