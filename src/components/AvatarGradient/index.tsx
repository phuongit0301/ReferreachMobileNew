import React from 'react';
import {TextStyle, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {BASE_COLORS} from '~Root/config';
import {Paragraph} from '~Root/components';
import styles from './styles';

interface Props {
  title: string;
  color1?: string;
  color2?: string;
  stylesContainer?: ViewStyle;
  textStyle?: TextStyle;
}

const AvatarGradient: React.FC<Props> = ({
  title = 'UN',
  color1 = BASE_COLORS.greyColor,
  color2 = BASE_COLORS.approxIndigoColor,
  stylesContainer = {},
  textStyle = {},
}) => {
  return (
    <LinearGradient colors={[color1, color2]} style={[styles.imageContainer, styles.circleGradient, stylesContainer]}>
      <Paragraph h2 textWhite bold title={title.toUpperCase()} style={textStyle} />
    </LinearGradient>
  );
};

export default AvatarGradient;
