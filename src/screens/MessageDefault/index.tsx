import React, {useState} from 'react';
import {View, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SafeAreaView} from 'react-native-safe-area-context';

import {MainNavigatorParamsList, TabNavigatorParamsList} from '~Root/navigation/config';
import {GlobalStyles, IMAGES} from '~Root/config';
import {HeaderSmallTransparent} from '~Root/components';
import styles from './styles';

import {AppRoute} from '~Root/navigation/AppRoute';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {CompositeScreenProps} from '@react-navigation/native';
import {t} from 'i18next';
import FastImage from 'react-native-fast-image';

type Props = CompositeScreenProps<
  NativeStackScreenProps<MainNavigatorParamsList, AppRoute.CHAT>,
  DrawerScreenProps<TabNavigatorParamsList>
>;

const MessageDefaultScreen = ({navigation}: Props) => {
  const [textSearch, setTextSearch] = useState('');

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onInputChange = (text: string) => {
    setTextSearch(text);
  };

  return (
    <View style={[GlobalStyles.container, GlobalStyles.flexColumn]}>
      <SafeAreaView style={GlobalStyles.container} edges={['top', 'right', 'left']}>
        <HeaderSmallTransparent title={t('message')} isRightButton={true} onRightPress={onToggleDrawer} />
        <View style={[GlobalStyles.flexColumn, GlobalStyles.container, styles.container]}>
          <View style={[GlobalStyles.inputContainer, GlobalStyles.ph15, GlobalStyles.m15]}>
            <TextInput
              placeholder='Search for chat'
              value={textSearch}
              style={styles.input}
              onChangeText={onInputChange}
            />
            <FastImage source={IMAGES.iconSearch} style={styles.iconSearch} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default MessageDefaultScreen;
