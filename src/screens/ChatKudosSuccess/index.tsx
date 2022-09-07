import React from 'react';
import {View, ScrollView, KeyboardAvoidingView, Dimensions, TouchableOpacity} from 'react-native';
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

const height = Dimensions.get('window').height;

type Props = NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT_KUDOS>;

const ChatKudosSuccessScreen = ({navigation}: Props) => {
  const {t} = useTranslation();

  const onDone = () => {
    navigation.navigate(AppRoute.CHAT_NAVIGATOR);
  };

  return (
    <View style={[GlobalStyles.container]}>
      <LinearGradient
        colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.cyanCornflowerBlueColor]}
        style={[GlobalStyles.container, GlobalStyles.flexColumn, {height: height}]}>
        <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left']}>
          <FastImage source={IMAGES.kudosHandBg} style={styles.iconHand} />
          <View style={GlobalStyles.alignCenter}>
            <Paragraph h2 textWhite bold700 textCenter title={t('kudos_success')} style={GlobalStyles.mb30} />
            <View style={[GlobalStyles.ph15, GlobalStyles.mb50]}>
              <Paragraph
                h5
                textWhite
                textCenter
                bold400
                title='Congratulations for the successfully Ask. Pour yourself a glass of wine, sit back and maybe think of the next Ask you can create?'
                style={styles.description}
              />
            </View>
            <TouchableOpacity style={[GlobalStyles.p10, styles.btn]} onPress={onDone}>
              <Paragraph h5 bold600 textWhite textCenter title={t('ok')} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <Loading />
      </LinearGradient>
    </View>
  );
};

export default ChatKudosSuccessScreen;
