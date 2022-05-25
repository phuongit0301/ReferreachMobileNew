import React from 'react';
import {TouchableOpacity, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {useTranslation} from 'react-i18next';
import {useDispatch} from 'react-redux';

import {Paragraph} from '~Root/components';
import {sideBarRoutes} from '~Root/utils';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';
import {logout} from '~Root/services/auth/actions';

const Drawer = ({props, navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

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
            <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
              <FastImage
                source={{
                  uri: 'https://s3-alpha-sig.figma.com/img/5ec2/169b/c65b3c8a62c20bab414be37031f55fb1?Expires=1652659200&Signature=O7iXEZgTzjmEJDI-0di2orJyz48YJA4NHiQXZCFMIgXsxqC1wqeAQO-ZYK3sL4QF0~RFqYw-xk3UetfEt1Jpw36v19pywORmr8f04lTL2aMisr5CR8-6mbYUAa5HVkxmh79hdFJGiXJF8sNDaSxXnt4g53gFob0jcdBmj6T2ZeWuymMnPNrqlCVpO4hBVe6C1M8g8er1O7v9MinUhC48XSnyHMnzdjSbyp4ATnetL4p55yLZtCqrJtW1or-Sm5pO4xf~PG32BVhkqmXVhlREuFLJpUhWl~-1iVds7r1f8poCTJGil2dUaDKk22vcKXQHju5ZhtLHUoP0LH1lX1n~Ag__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
                }}
                style={[GlobalStyles.avatar, GlobalStyles.mr10, styles.avatarBorder]}
              />
              <View style={GlobalStyles.flexColumn}>
                <Paragraph h5 textWhite bold600 title='Kelly Choo' style={GlobalStyles.mb5} />
                <Paragraph textWhite title='kelly.choo@referreach.com' />
              </View>
            </View>
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
