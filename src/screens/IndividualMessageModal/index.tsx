import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import FastImage from 'react-native-fast-image';
import * as yup from 'yup';

import {HeaderSmallTransparent, Loading, Paragraph, ToggleSwitch} from '~Root/components';
import {PubNubContextProvider} from '~Root/hooks/usePubnubHook';
import {AppRoute} from '~Root/navigation/AppRoute';
import {MESSAGE_FIELDS} from '~Root/config/fields';
import {GlobalStyles, IMAGES} from '~Root/config';
import {IGlobalState} from '~Root/types';
import Form from './Form';
import styles from './styles';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.INDIVIDUAL_MESSAGE_MODAL>;

const schema = yup.object().shape({
  [MESSAGE_FIELDS.individualMessage]: yup.string().required('Field is a required').max(200),
  [MESSAGE_FIELDS.individualJoint]: yup.string().required('Field is a required').max(200),
});

const schema1 = yup.object().shape({
  [MESSAGE_FIELDS.individualMessage]: yup.string().required('Field is a required').max(200),
});

const IndividualMessageModalScreen: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const feedState = useSelector((state: IGlobalState) => state.feedState);
  const [isSwitch, setSwitch] = useState(false);

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onSwitch = async (bool: boolean) => {
    setSwitch(bool);
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <PubNubContextProvider>
      <View style={[GlobalStyles.container]}>
        <FastImage source={IMAGES.chatBg} style={GlobalStyles.bgContainer} resizeMode='contain' />
        <HeaderSmallTransparent
          isBackButton={true}
          onBack={onBack}
          title={t('message')}
          isRightButton={true}
          onRightPress={onToggleDrawer}
          containerHeaderStyle={{...GlobalStyles.bgWhite, ...GlobalStyles.pb15, ...GlobalStyles.pt50}}
        />
        <ScrollView>
          <View style={[GlobalStyles.container, styles.container]}>
            <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb15]}>
              <FastImage source={IMAGES.iconQuestion} style={[GlobalStyles.mr5, styles.iconQuestion]} />
              <Paragraph p textSpanishGrayColor title={t('message_individual')} style={styles.textStyle} />
            </View>
            <View
              style={[
                GlobalStyles.pv5,
                GlobalStyles.ph10,
                GlobalStyles.flexRow,
                GlobalStyles.mb20,
                GlobalStyles.alignCenter,
                styles.toggleContainer,
              ]}>
              <Paragraph textDarkGrayColor title={t('send_joint_message')} style={GlobalStyles.container} />
              <ToggleSwitch onSwitch={onSwitch} />
            </View>
            <Form
              feedState={feedState}
              isSwitch={isSwitch}
              schema={isSwitch ? schema1 : schema}
              navigation={navigation}
            />
          </View>
        </ScrollView>
        <Loading />
      </View>
    </PubNubContextProvider>
  );
};

export default IndividualMessageModalScreen;
