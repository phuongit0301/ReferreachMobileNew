import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {Button, Paragraph, ProfileTemplateScreen, Icon, Category} from '~Root/components';
import {IActionUpdateUserInAppStatusSuccess, IUserState} from '~Root/services/user/types';
import {updateUserInAppStatus} from '~Root/services/user/actions';
import {hideLoading} from '~Root/services/loading/actions';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {IN_APP_STATUS_ENUM} from '~Root/utils/common';
import {IGlobalState} from '~Root/types';
import {adjust} from '~Root/utils';
import styles from './styles';

// type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.PROFILE>;

const ProfileCompleteScreen = ({navigation, route}: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);

  const onBack = () => {
    navigation.goBack();
  };

  const onToggleDrawer = () => {
    navigation?.toggleDrawer();
  };

  const onNext = () => {
    // Check if user have status onboard_completed then navigate to another screen
    if (userState?.userInfo?.in_app_status === IN_APP_STATUS_ENUM.ONBOARD_COMPLETED) {
      navigation.navigate(AppRoute.BOTTOM_TAB);
      return false;
    }

    dispatch(
      updateUserInAppStatus(
        {in_app_status: IN_APP_STATUS_ENUM.ONBOARD_COMPLETED},
        (response: IActionUpdateUserInAppStatusSuccess['payload']) => {
          dispatch(hideLoading());
          if (response.success) {
            navigation.navigate(AppRoute.BOTTOM_TAB);
          }
        },
      ),
    );
  };

  return (
    <View style={[GlobalStyles.container]} key={'profile-complete'}>
      <ProfileTemplateScreen isBackButton={true} onBack={onBack} isRightButton={true} onToggleDrawer={onToggleDrawer}>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30, GlobalStyles.p15]}>
          <View style={[GlobalStyles.container, GlobalStyles.mb15]}>
            <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb10]}>
              <Paragraph
                textSteelBlueColor
                h5
                bold600
                title={`${userState?.userInfo?.first_name} ${userState?.userInfo?.last_name}`}
                style={[GlobalStyles.container]}
              />
              <TouchableOpacity style={GlobalStyles.iconEdit} onPress={onNext}>
                <Icon name='pencil-alt' size={adjust(8)} color={BASE_COLORS.whiteColor} />
              </TouchableOpacity>
            </View>
            <Paragraph
              textSteelBlueColor
              bold600
              title={`${userState?.userInfo?.title ?? ''}`}
              style={[GlobalStyles.alignCenter, GlobalStyles.container, GlobalStyles.mb10]}
            />
            <Paragraph
              textBlack
              title={`${userState?.userInfo?.introductions ?? ''}`}
              style={[GlobalStyles.alignCenter, GlobalStyles.container]}
            />
            <View>
              <View style={[GlobalStyles.mt15, GlobalStyles.flexColumn]}>
                <Paragraph h5 style={[styles.labelStyle]} title={`${t('your_industry')}*`} />
                <View style={[GlobalStyles.flexRow, styles.tagContainer]}>
                  {userState?.userInfo?.self_industries.length > 0 &&
                    userState?.userInfo?.self_industries.map((item: any, index: number) =>
                      typeof item === 'object' ? (
                        <Category
                          styleTag={styles.styleTag}
                          key={`self-industries-${index}`}
                          itemKey={`${index}`}
                          name={item?.name}
                          showButton={false}
                        />
                      ) : (
                        <Category
                          styleTag={styles.styleTag}
                          key={`self-industries-${index}`}
                          itemKey={`${index}`}
                          name={item}
                          showButton={false}
                        />
                      ),
                    )}
                </View>
              </View>
              <View style={[GlobalStyles.mt15, GlobalStyles.flexColumn]}>
                <Paragraph h5 style={[styles.labelStyle]} title={`${t('you_sell_to')}*`} />
                <View style={[GlobalStyles.flexRow, styles.tagContainer]}>
                  {userState?.userInfo?.sell_industries.length > 0 &&
                    userState?.userInfo?.sell_industries.map((item: any, index: number) =>
                      typeof item === 'object' ? (
                        <Category
                          styleTag={styles.styleTag}
                          key={`sell-to-${index}`}
                          itemKey={`${index}`}
                          name={item?.name}
                          showButton={false}
                        />
                      ) : (
                        <Category
                          styleTag={styles.styleTag}
                          key={`sell-to-${index}`}
                          itemKey={`${index}`}
                          name={item}
                          showButton={false}
                        />
                      ),
                    )}
                </View>
              </View>
              <View style={[GlobalStyles.mt15, GlobalStyles.flexColumn]}>
                <Paragraph h5 style={[styles.labelStyle]} title={`${t('your_partners')}*`} />
                <View style={[GlobalStyles.flexRow, styles.tagContainer]}>
                  {userState?.userInfo?.partner_industries.length > 0 &&
                    userState?.userInfo?.partner_industries.map((item: any, index: number) =>
                      typeof item === 'object' ? (
                        <Category
                          styleTag={styles.styleTag}
                          key={`partners-${index}`}
                          itemKey={`${index}`}
                          name={item?.name}
                          showButton={false}
                        />
                      ) : (
                        <Category
                          styleTag={styles.styleTag}
                          key={`partners-${index}`}
                          itemKey={`${index}`}
                          name={item}
                          showButton={false}
                        />
                      ),
                    )}
                </View>
              </View>
            </View>
          </View>
          <View>
            <Button
              title={t('next')}
              h5
              textCenter
              onPress={onNext}
              containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
              textStyle={styles.h3BoldDefault}
              disabled={
                userState?.userInfo?.self_industries.length === 0 ||
                userState?.userInfo?.partner_industries.length === 0 ||
                userState?.userInfo?.sell_industries.length === 0
              }
            />
          </View>
        </View>
      </ProfileTemplateScreen>
    </View>
  );
};

export default ProfileCompleteScreen;
