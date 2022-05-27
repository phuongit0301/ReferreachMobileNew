import React from 'react';
import {TouchableOpacity, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {AvatarGradient, Paragraph} from '~Root/components';
import {sideBarRoutes} from '~Root/utils';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';
import {logout} from '~Root/services/auth/actions';
import {IUserState} from '~Root/services/user/types';
import {IGlobalState} from '~Root/types';
import {AppRoute} from './AppRoute';

const Drawer = ({props, navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);

  const onLogout = () => {
    console.log(1231231312);
    dispatch(logout());
  };

  return (
    <LinearGradient
      colors={[BASE_COLORS.bdazzledBlueColor, BASE_COLORS.metallicBlueColor]}
      style={[GlobalStyles.container, GlobalStyles.ph30, GlobalStyles.pv15]}>
      <SafeAreaView style={GlobalStyles.container}>
        <View style={GlobalStyles.container}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.mb30]}>
            <View style={[GlobalStyles.container, GlobalStyles.justifyStart]}>
              <FastImage source={IMAGES.logoDrawer} resizeMode='contain' style={GlobalStyles.logoDrawer} />
            </View>
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <FastImage source={IMAGES.iconCloseWhite} resizeMode='contain' style={styles.iconClose} />
            </TouchableOpacity>
          </View>
          <View style={[styles.content]}>
            <TouchableOpacity
              style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}
              onPress={() => navigation.navigate(AppRoute.MAIN_NAVIGATOR)}>
              {userState.userInfo?.avatar ? (
                <FastImage
                  source={{uri: userState.userInfo?.avatar}}
                  style={[GlobalStyles.avatar, GlobalStyles.mr10, styles.avatarBorder]}
                />
              ) : (
                <AvatarGradient
                  title={`${userState?.userInfo?.first_name?.charAt(0)}${userState?.userInfo?.last_name?.charAt(0)}`}
                  color1={BASE_COLORS.oxleyColor}
                  color2={BASE_COLORS.oxleyColor}
                  stylesContainer={GlobalStyles.mb15}
                />
              )}
              <View style={GlobalStyles.flexColumn}>
                <Paragraph
                  h5
                  textWhite
                  bold600
                  title={`${userState?.userInfo?.first_name ?? ''} ${userState?.userInfo?.last_name ?? ''}`}
                  style={GlobalStyles.mb5}
                />
                {userState?.userInfo?.email && <Paragraph textWhite title={userState?.userInfo?.email} />}
              </View>
            </TouchableOpacity>
            <FlatList
              style={[GlobalStyles.container, GlobalStyles.mt30]}
              scrollEventThrottle={1}
              showsVerticalScrollIndicator={true}
              data={sideBarRoutes}
              numColumns={1}
              key={'sidebar'}
              keyExtractor={(item, index) => `sidebar-${index}`}
              renderItem={({item, index}: {item: any; index: number}) => (
                <TouchableOpacity onPress={() => navigation.navigate(item?.name)} style={GlobalStyles.mb20}>
                  <View style={[GlobalStyles.container, GlobalStyles.alignCenter, GlobalStyles.flexRow]}>
                    <View style={[GlobalStyles.justifyCenter, styles.iconListContainer]}>{item?.imageUrl()}</View>
                    <Paragraph h4 textWhite title={item?.title} style={GlobalStyles.ml10} />
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          <View style={GlobalStyles.flexColumn}>
            <TouchableOpacity onPress={onLogout} style={GlobalStyles.flexRow}>
              <FastImage
                source={IMAGES.iconLogout}
                resizeMode='contain'
                style={[GlobalStyles.mr10, styles.iconLogout]}
              />
              <Paragraph h4 textWhite title={t('logout')} />
            </TouchableOpacity>
            <Paragraph textWhite title='v1.1.0' style={GlobalStyles.mt20} />
            <Paragraph textWhite title='ReferReach Pte Ltd' style={GlobalStyles.mt10} />
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Drawer;
