/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import {ActivityIndicator, TouchableOpacity, View, ViewStyle} from 'react-native';
import FastImage, {ImageStyle} from 'react-native-fast-image';

import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {IAvatarMetaData, IUserInfoState} from '~Root/services/user/types';
import {AvatarGradient} from '~Root/components';
import styles from './styles';

interface Props {
  userAvatar?: IAvatarMetaData;
  userInfo?: IUserInfoState;
  styleContainer?: ViewStyle;
  styleAvatar?: ImageStyle;
  characters?: string;
  onProfile: () => void;
}

const Avatar: React.FC<Props> = ({
  userAvatar,
  characters = 'UN',
  styleAvatar = {},
  userInfo,
  onProfile = () => {},
  styleContainer = {},
}) => {
  characters = `${userInfo?.first_name?.charAt(0)}${userInfo?.last_name?.charAt(0)}`;

  return (
    <TouchableOpacity style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, styleContainer]} onPress={onProfile}>
      {userAvatar ? (
        <FastImage
          source={{
            uri: userAvatar?.avatar_url,
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
                  {translateX: userAvatar?.avatar_lat ? +userAvatar?.avatar_lat : 0},
                  {translateY: userAvatar?.avatar_lng ? +userAvatar?.avatar_lng : 0},
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
          stylesContainer={GlobalStyles.mb15}
        />
      )}
    </TouchableOpacity>
  );
};

export default Avatar;
