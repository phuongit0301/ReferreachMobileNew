import React from 'react';
import {View, TouchableOpacity, ViewStyle, Image, TextStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Paragraph from '~Root/components/Paragraph';

import {GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';

export interface Props {
  style?: ViewStyle;
  styleLeft?: ViewStyle;
  styleTitleContainer?: ViewStyle;
  styleTitle?: TextStyle;
  showLeft?: boolean;
  title?: string;
  onPressLeft?: () => void;
}

const AuthHeaderNew: React.FC<Props> = ({
  style = {},
  styleLeft = {},
  styleTitleContainer = {},
  styleTitle = {},
  showLeft = true,
  title = 'Home',
  onPressLeft = () => {},
}) => {
  return (
    <SafeAreaView style={[styles.widthFull, GlobalStyles.pt10]} edges={['top', 'left', 'right']}>
      <View style={[GlobalStyles.flexRow, style]}>
        {showLeft && (
          <TouchableOpacity style={[styles.iconBackContainer, styleLeft]} onPress={onPressLeft}>
            <Image source={IMAGES.iconBackGreen} resizeMode={'contain'} />
          </TouchableOpacity>
        )}
        <View style={[GlobalStyles.container, GlobalStyles.center, styleTitleContainer]}>
          <Paragraph title={title} style={[styles.title, styleTitle]} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthHeaderNew;
