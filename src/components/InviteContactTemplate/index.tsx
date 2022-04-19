import React from 'react';
import {View, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import styles from './styles';

import {HeaderSmallBlue} from '~Root/components';
import {GlobalStyles} from '~Root/config';

interface Props {
  title: string;
  isBackButton: boolean;
  children?: React.ReactNode;
  onBack?: () => void;
}

const InviteContactTemplateScreen: React.FC<Props> = ({
  title = '',
  isBackButton = true,
  children,
  onBack = () => {},
}) => {
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderSmallBlue onBack={onBack} isBackButton={isBackButton} title={title} />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <KeyboardAvoidingView
          style={GlobalStyles.keyboard}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={offsetKeyboard}>
          <ScrollView
            style={[GlobalStyles.scrollViewWhite, styles.scrollView]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            horizontal
            contentContainerStyle={[GlobalStyles.container, GlobalStyles.flexColumn]}>
            {children}
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default InviteContactTemplateScreen;
