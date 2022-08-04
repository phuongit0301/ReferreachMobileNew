/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {ActivityIndicator, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {AvatarGradient} from '~Root/components';

interface Props {
  userInfo?: any;
  styleContainer?: ViewStyle;
  styleAvatar?: ImageStyle;
  styleContainerGradient?: ViewStyle;
  textStyle?: TextStyle;
  characters?: string;
  onProfile?: () => void;
}

const Avatar: React.FC<Props> = ({
  characters = 'UN',
  styleAvatar = {},
  userInfo,
  onProfile = () => {},
  styleContainer = {},
  styleContainerGradient = {},
  textStyle = {},
}) => {
  characters = `${userInfo?.first_name?.charAt(0)}${userInfo?.last_name?.charAt(0)}`;

  return (
    <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, styleContainer]} onPress={onProfile}>
      {userInfo?.avatar_url ? (
        <FastImage
          source={{
            uri: userInfo?.avatar_url,
          }}
          resizeMode='cover'
          onProgress={() => <ActivityIndicator />}
          style={[GlobalStyles.avatar, styleAvatar]}>
          <View
            style={[
              GlobalStyles.avatar,
              styleAvatar,
              {
                transform: [
                  {translateX: userInfo?.avatar_lat ? +userInfo?.avatar_lat : 0},
                  {translateY: userInfo?.avatar_lng ? +userInfo?.avatar_lng : 0},
                ],
              },
            ]}
          />
        </FastImage>
      ) : (
        <AvatarGradient
          title={characters}
          color1={BASE_COLORS.oxleyColor}
          color2={BASE_COLORS.oxleyColor}
          stylesContainer={styleContainerGradient}
          textStyle={textStyle}
        />
      )}
    </TouchableOpacity>
  );
};

export default Avatar;
