import React from 'react';
import {View, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {AuthHeaderNew, Button, Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {RootNavigatorParamsList} from '~Root/navigation/config';
import styles from './styles';
import {t} from 'i18next';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.PRIVACY_POLICY>;

const PrivacyPolicyScreen: React.FC<Props> = ({navigation}) => {
  const onDecline = () => {
    navigation.navigate(AppRoute.LOGIN);
  };
  const onAccept = () => {
    navigation.navigate(AppRoute.REGISTER, {isWithoutInviteCode: true});
  };

  return (
    <View style={[GlobalStyles.container, styles.container]}>
      <AuthHeaderNew
        showLeft={true}
        onPressLeft={() => navigation.goBack()}
        title='Privacy Policy'
        style={{...GlobalStyles.pb20, ...styles.header}}
      />
      <ScrollView style={[GlobalStyles.container, GlobalStyles.pb20]}>
        <View style={[GlobalStyles.ph15, GlobalStyles.pv10]}>
          <Paragraph
            style={GlobalStyles.mb10}
            title='ReferReach Pte. Ltd. built the ReferReach app as a Free app. This SERVICE is provided by ReferReach Pte. Ltd. at no cost and is intended for use as is.'
          />
          <Paragraph
            style={GlobalStyles.mb10}
            title='This page is used to inform visitors regarding our policies with the collection, use, and disclosure of Personal Information if anyone decided to use our Service.'
          />
          <Paragraph
            style={GlobalStyles.mb10}
            title='If you choose to use our Service, then you agree to the collection and use of information in relation to this policy. The Personal Information that we collect is used for providing and improving the Service. We will not use or share your information with anyone except as described in this Privacy Policy.'
          />
          <Paragraph
            style={GlobalStyles.mb10}
            title='The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which are accessible at ReferReach unless otherwise defined in this Privacy Policy.'
          />
          <Paragraph bold600 style={GlobalStyles.mb10} title='Information Collection and Use' />
          <Paragraph
            style={GlobalStyles.mb10}
            title='For a better experience, while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to Name, email address. The information that we request will be retained by us and used as described in this privacy policy.'
          />
          <Paragraph
            style={GlobalStyles.mb10}
            title='The app does use third-party services that may collect information used to identify you.'
          />
          <Paragraph
            style={GlobalStyles.mb10}
            title='Link to the privacy policy of third-party service providers used by the app'
          />
          <View style={[GlobalStyles.mb10, GlobalStyles.flexColumn]}>
            <View style={GlobalStyles.flexRow}>
              <View style={[GlobalStyles.mr5, styles.dot]} />
              <Paragraph style={GlobalStyles.mb10} title='Google Play Services' />
            </View>
            <View style={GlobalStyles.flexRow}>
              <View style={[GlobalStyles.mr5, styles.dot]} />
              <Paragraph style={GlobalStyles.mb10} title='Google Analytics for Firebase' />
            </View>
            <View style={GlobalStyles.flexRow}>
              <View style={[GlobalStyles.mr5, styles.dot]} />
              <Paragraph style={GlobalStyles.mb10} title='Flurry Analytics' />
            </View>
          </View>
          <Paragraph bold600 style={GlobalStyles.mb10} title='Log Data' />
          <Paragraph
            style={GlobalStyles.mb10}
            title='We want to inform you that whenever you use our Service, in a case of an error in the app we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.'
          />
          <Paragraph bold600 style={GlobalStyles.mb10} title='Cookies' />
          <Paragraph
            style={GlobalStyles.mb10}
            title="Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory."
          />
          <Paragraph
            style={GlobalStyles.mb10}
            title='This Service does not use these “cookies” explicitly. However, the app may use third-party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this Service.'
          />
          <Paragraph bold600 style={GlobalStyles.mb10} title='Service Providers' />
          <Paragraph
            style={GlobalStyles.mb10}
            title='We may employ third-party companies and individuals due to the following reasons:'
          />
          <View style={[GlobalStyles.mb10, GlobalStyles.flexColumn]}>
            <View style={GlobalStyles.flexRow}>
              <View style={[GlobalStyles.mr5, styles.dot]} />
              <Paragraph style={GlobalStyles.mb10} title='To facilitate our Service;' />
            </View>
            <View style={GlobalStyles.flexRow}>
              <View style={[GlobalStyles.mr5, styles.dot]} />
              <Paragraph style={GlobalStyles.mb10} title='To provide the Service on our behalf;' />
            </View>
            <View style={GlobalStyles.flexRow}>
              <View style={[GlobalStyles.mr5, styles.dot]} />
              <Paragraph style={GlobalStyles.mb10} title='To perform Service-related services; or' />
            </View>
            <View style={GlobalStyles.flexRow}>
              <View style={[GlobalStyles.mr5, styles.dot]} />
              <Paragraph style={GlobalStyles.mb10} title='To assist us in analyzing how our Service is used.' />
            </View>
          </View>
          <Paragraph
            style={GlobalStyles.mb10}
            title='We want to inform users of this Service that these third parties have access to their Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.'
          />
          <Paragraph bold600 style={GlobalStyles.mb10} title='Security' />
          <Paragraph
            style={GlobalStyles.mb10}
            title='We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.'
          />
          <Paragraph bold600 style={GlobalStyles.mb10} title='Links to Other Sites' />
          <Paragraph
            style={GlobalStyles.mb10}
            title='This Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.'
          />
          <Paragraph bold600 style={GlobalStyles.mb10} title='Children’s Privacy' />
          <Paragraph
            style={GlobalStyles.mb10}
            title='These Services do not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13 years of age. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do the necessary actions.'
          />
          <Paragraph bold600 style={GlobalStyles.mb10} title='Changes to This Privacy Policy' />
          <Paragraph
            style={GlobalStyles.mb10}
            title='We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.'
          />
          <Paragraph style={GlobalStyles.mb10} title='This policy is effective as of 2022-06-28' />
          <Paragraph bold600 style={GlobalStyles.mb10} title='Contact Us' />
          <Paragraph
            style={GlobalStyles.mb10}
            title='If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us at robin@referreach.com.'
          />
        </View>
      </ScrollView>
      <View style={[GlobalStyles.pv30, GlobalStyles.flexRow, GlobalStyles.itemCenter, styles.groupButton]}>
        <Button
          title={t('i_decline')}
          h3
          textCenter
          containerStyle={{...GlobalStyles.buttonContainerStyle, ...GlobalStyles.mr10, ...styles.buttonContainerStyle}}
          textStyle={styles.h3BoldDefault}
          onPress={onDecline}
        />
        <Button
          title={t('i_accept')}
          h3
          textCenter
          containerStyle={{...GlobalStyles.buttonContainerStyle, ...styles.buttonMainContainerStyle}}
          textStyle={styles.h3BoldMainDefault}
          onPress={onAccept}
        />
      </View>
    </View>
  );
};

export default PrivacyPolicyScreen;
