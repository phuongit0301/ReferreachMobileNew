import React from 'react';
import {View, ScrollView, KeyboardAvoidingView, Dimensions, TouchableOpacity, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import {ChatNavigatorParamsList} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Loading, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import styles from './styles';
import Slide from './Slide';

const height = Dimensions.get('window').height;

type Props = NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT_KUDOS>;

const ChatKudosScreen = ({navigation, route}: Props) => {
  const onDone = () => {
    navigation.navigate(AppRoute.LOGIN);
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={[GlobalStyles.container]}>
      <LinearGradient
        colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.cyanCornflowerBlueColor]}
        style={[GlobalStyles.container, GlobalStyles.flexColumn, {height: height}]}>
        <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left']}>
          <KeyboardAvoidingView style={GlobalStyles.container}>
            <ScrollView
              style={[GlobalStyles.container, styles.scrollView]}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <TouchableOpacity onPress={onBack} style={[GlobalStyles.ml15, GlobalStyles.mb5, Platform.OS === 'android' && GlobalStyles.mt15]}>
                <FastImage source={IMAGES.iconBackWhite} style={styles.iconBack} />
              </TouchableOpacity>
              <View style={GlobalStyles.alignCenter}>
                <Paragraph h5 textWhite bold700 title='You are ending your Ask!' style={GlobalStyles.mb5} />
                <View style={[GlobalStyles.ph50, GlobalStyles.mb10]}>
                  <Paragraph
                    textWhite
                    textCenter
                    bold500
                    title='Swipe left or right to choose the responder to give kudos to'
                    style={styles.description}
                  />
                </View>
                <Slide navigation={navigation} route={route} />
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </SafeAreaView>
        <Loading />
      </LinearGradient>
    </View>
  );
};

export default ChatKudosScreen;
