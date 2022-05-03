import React, { useState } from 'react';
import {ScrollView, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm, SubmitHandler} from 'react-hook-form';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {
  Button,
  HeaderSmallTransparent,
  Icon,
  InputValidateControl,
  Paragraph,
  ProfileBlock,
  ProfileTemplateScreen,
} from '~Root/components';
import {BASE_COLORS, GlobalStyles, PROFILE_FIELDS} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import styles from './styles';
import {adjust} from '~Root/utils';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.PROFILE>;

const ProfileSecondScreen = ({navigation}: Props) => {
  const {t} = useTranslation();

  const [showTooltip, setShowTooltip] = useState({
    first: false,
    second: false,
    third: false,
  });

  const onSubmit: SubmitHandler<any> = (credentials: any) => {
    if (credentials.first_name && credentials.last_name) {
      console.log(1312323);
    }
  };

  const onBack = () => {
    navigation.goBack();
  };

  const handleIndustry = () => {
    console.log(1231232);
  };

  const onTooltipPress = (target: string) => {
    setShowTooltip({...showTooltip, [target]: !(showTooltip as any)[target]});
  };

  return (
    <View style={[GlobalStyles.container]}>
      <ProfileTemplateScreen onBack={onBack}>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30, GlobalStyles.p15]}>
          <View style={[GlobalStyles.container, GlobalStyles.mb15]}>
            <ProfileBlock
              industries={['abc']}
              clients={[]}
              partners={[]}
              onDelete={handleIndustry}
              handleIndustry={handleIndustry}
              showTooltip={showTooltip}
              onTooltipPress={onTooltipPress}
            />
          </View>
          <View>
            <Button
              title={t('save')}
              h5
              textCenter
              onPress={onSubmit}
              containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonContainerStyle}}
              textStyle={styles.h3BoldDefault}
            />
          </View>
        </View>
      </ProfileTemplateScreen>
    </View>
  );
};

export default ProfileSecondScreen;
