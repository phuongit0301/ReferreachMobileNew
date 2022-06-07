import React from 'react';
import {View, ScrollView, TouchableOpacity, Platform, KeyboardAvoidingView, TextInput, AppState} from 'react-native';

import {AppRoute} from '~Root/navigation/AppRoute';
import {Avatar, HeaderNormalBlue, Loading, Paragraph} from '~Root/components';
import {CREATE_ASK_FIELDS, GlobalStyles, IMAGES} from '~Root/config';

import styles from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {IGlobalState} from '~Root/types';
import FastImage from 'react-native-fast-image';
import moment from 'moment';
import {createAsk} from '~Root/services/ask/actions';
import {hideLoading, showLoading} from '~Root/services/loading/actions';

const AskPreviewScreen = ({navigation, userInfo, dataStep1, dataStep2, dataStep3, onSuccess}: any) => {
  const dispatch = useDispatch();
  const loadingState = useSelector((state: IGlobalState) => state?.loadingState);

  const onProfile = () => {
    navigation.navigate(AppRoute.MAIN_NAVIGATOR);
  };

  const onPublish = () => {
    const formData = new FormData();
    if (dataStep1.greeting) {
      formData.append(CREATE_ASK_FIELDS.greeting, dataStep1.greeting);
    }
    if (dataStep1.demographic) {
      formData.append(CREATE_ASK_FIELDS.demographic, dataStep1.demographic);
    }
    if (dataStep1.user_role) {
      formData.append(CREATE_ASK_FIELDS.userRole, dataStep1.user_role);
    }
    if (dataStep1.business_requirement) {
      formData.append(CREATE_ASK_FIELDS.businessRequirement, dataStep1.business_requirement);
    }
    if (dataStep1.business_detail) {
      formData.append(CREATE_ASK_FIELDS.businessDetail, dataStep1.business_detail);
    }
    if (dataStep2.deadline) {
      formData.append(CREATE_ASK_FIELDS.deadline, moment(dataStep2.deadline).format('DD/MM/YYYY'));
    }
    if (dataStep2.location) {
      formData.append('ask_location_attributes[text]', dataStep2.location);
    }
    if (dataStep2.criteria1) {
      formData.append('criterium_attributes[][text]', dataStep2.criteria1);
    }
    if (dataStep2.criteria2) {
      formData.append('criterium_attributes[][text]', dataStep2.criteria2);
    }
    if (dataStep2.criteria3) {
      formData.append('criterium_attributes[][text]', dataStep2.criteria3);
    }
    if (dataStep2.criteria4) {
      formData.append('criterium_attributes[][text]', dataStep2.criteria4);
    }
    if (dataStep2.criteria5) {
      formData.append('criterium_attributes[][text]', dataStep2.criteria5);
    }

    if (dataStep3.filesUpload?.length) {
      for (const file of dataStep3.filesUpload) {
        formData.append('documents_attributes[][file]', {
          name: file.name,
          type: file.type,
          uri: Platform.OS === 'android' ? file.uri : file.uri.replace('file://', ''),
        });
      }
    }

    dispatch(showLoading());
    dispatch(
      createAsk(formData, (response: any) => {
        dispatch(hideLoading());
        if (response.success) {
          onSuccess();
        }
      }),
    );
    // if (dataStep1.details) {
    //   formData.append('details', dataStep1.business_detail);
    // }
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <HeaderNormalBlue isBackButton={false}>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.ph10]}>
          <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]}>
            <Avatar
              userAvatar={userInfo?.avatar_metadata}
              userInfo={userInfo}
              onProfile={onProfile}
              styleAvatar={styles.styleAvatar}
            />
            <View style={[GlobalStyles.flexColumn, GlobalStyles.ph15, GlobalStyles.mt10, styles.userProfile]}>
              <Paragraph textWhite h5 bold600 title={`${userInfo?.first_name} ${userInfo?.last_name}`} />
              <Paragraph textWhite title={`${userInfo?.title ?? ''}`} numberOfLines={1} ellipsizeMode='tail' />
            </View>
          </View>
          {/* <Paragraph textWhite title={`${userInfo?.introductions ?? ''}`} style={GlobalStyles.ph5} /> */}
          <View style={[GlobalStyles.flexRow, GlobalStyles.flexWrap]}>
            <Paragraph textWhite title={`${dataStep1?.greeting} `} />
            <Paragraph textWhite title={`${dataStep1?.demographic} `} />
            <Paragraph textWhite bold600 title={`${dataStep1?.business_requirement} `} />
            <Paragraph textWhite title={`${dataStep1?.business_detail} `} />
          </View>
        </View>
      </HeaderNormalBlue>
      <View style={[GlobalStyles.container, styles.container]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={GlobalStyles.container}
          keyboardVerticalOffset={80}>
          <View style={[GlobalStyles.mb20, GlobalStyles.container]}>
            <ScrollView>
              <View style={[GlobalStyles.flexColumn, GlobalStyles.mt10, GlobalStyles.ph15]}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.mb10]}>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mr15]}>
                    <FastImage source={IMAGES.iconCalendarBlue} resizeMode='cover' style={[styles.icon]} />
                    <Paragraph title={`By ${moment(dataStep2?.deadline).format('DD/MM/YYYY')}`} />
                  </View>
                  <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                    <FastImage source={IMAGES.iconGlobeEarth} resizeMode='cover' style={styles.icon} />
                    <Paragraph
                      numberOfLines={1}
                      ellipsizeMode='tail'
                      textBlack
                      title={dataStep2?.location}
                      style={styles.width}
                    />
                  </View>
                </View>
                <View style={[GlobalStyles.flexRow, GlobalStyles.mb30]}>
                  <View style={[GlobalStyles.flexColumn, GlobalStyles.container]}>
                    {dataStep2?.criteria1 !== '' && (
                      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                        <FastImage source={IMAGES.iconCircleCheck} resizeMode='cover' style={styles.iconCircle} />
                        <Paragraph title={dataStep2?.criteria1} />
                      </View>
                    )}
                    {!!dataStep2?.criteria2 && (
                      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                        <FastImage source={IMAGES.iconCircleCheck} resizeMode='cover' style={styles.iconCircle} />
                        <Paragraph title={dataStep2?.criteria2} />
                      </View>
                    )}
                    {!!dataStep2?.criteria3 && (
                      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                        <FastImage source={IMAGES.iconCircleCheck} resizeMode='cover' style={styles.iconCircle} />
                        <Paragraph title={dataStep2?.criteria3} />
                      </View>
                    )}
                    {!!dataStep2?.criteria4 && (
                      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                        <FastImage source={IMAGES.iconCircleCheck} resizeMode='cover' style={styles.iconCircle} />
                        <Paragraph title={dataStep2?.criteria4} />
                      </View>
                    )}
                    {!!dataStep2?.criteria5 && (
                      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                        <FastImage source={IMAGES.iconCircleCheck} resizeMode='cover' style={styles.iconCircle} />
                        <Paragraph title={dataStep2?.criteria5} />
                      </View>
                    )}
                  </View>
                  <View>
                    {dataStep3.filesUpload?.length > 0 &&
                      dataStep3.filesUpload.map((item, index) =>
                        item?.type === 'application/pdf' ? (
                          <FastImage
                            source={IMAGES.iconPdfBlue}
                            resizeMode='cover'
                            style={styles.icon}
                            key={`image-${index}`}
                          />
                        ) : (
                          <FastImage
                            key={`image-${index}`}
                            source={IMAGES.iconXlsBlue}
                            resizeMode='cover'
                            style={[GlobalStyles.mb15, styles.icon]}
                          />
                        ),
                      )}
                  </View>
                </View>
                <TouchableOpacity style={styles.btnContainer} onPress={onPublish}>
                  <FastImage source={IMAGES.iconPublish} resizeMode='contain' style={styles.iconPublish} />
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
      {loadingState?.loading && <Loading />}
    </View>
  );
};

export default AskPreviewScreen;
