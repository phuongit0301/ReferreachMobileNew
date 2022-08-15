import React from 'react';
import {Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import styles from './styles';

interface Props {
  isIntroducer: boolean;
  introducee: any;
  introducer: any;
  asker: any;
  message: any;
}

const HeaderMessage: React.FC<Props> = ({isIntroducer = false, data, introducee, introducer, asker, message}) => {
  if (+message?.entry.userReceive === +asker?.id) {
    return (
      <Paragraph
        textJetColor
        bold600
        numberOfLines={1}
        ellipsizeMode='tail'
        title={`${asker?.attributes?.first_name} ${asker?.attributes?.last_name}`}
        style={[GlobalStyles.mr5, styles.fontSmall]}
      />
    );
  }

  if (+message?.entry.userReceive === +introducee?.id) {
    return (
      <Paragraph
        textJetColor
        bold600
        numberOfLines={1}
        ellipsizeMode='tail'
        title={`${introducee?.attributes?.first_name} ${introducee?.attributes?.last_name}`}
        style={[GlobalStyles.mr5, styles.fontSmall]}
      />
    );
  }

  return (
    <Paragraph
      textJetColor
      bold600
      numberOfLines={1}
      ellipsizeMode='tail'
      title={`${introducer?.attributes?.first_name} ${introducer?.attributes?.last_name}`}
      style={[GlobalStyles.mr5, styles.fontSmall]}
    />
  );
};

export default HeaderMessage;
