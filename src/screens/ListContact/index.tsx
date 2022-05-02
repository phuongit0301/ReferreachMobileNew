import React, {useState, useEffect} from 'react';
import {View, FlatList, PermissionsAndroid, Platform, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Contacts from 'react-native-contacts';
import {useDispatch, useSelector} from 'react-redux';

import {RootNavigatorParamsList} from '~Root/navigation/config';

import {AppRoute} from '~Root/navigation/AppRoute';
import {Paragraph, HeaderSmallBlue, Icon, Button} from '~Root/components';
import {IGlobalState} from '~Root/types';
import {setContact} from '~Root/services/contact/actions';
import {IActionSetContact, RowItem} from '~Root/services/contact/types';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import {adjust} from '~Root/utils';
import styles from './styles';

type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.LIST_CONTACT>;
interface IDataContacts {
  ids: string[];
  data: any[];
}

const ListContactScreen = ({navigation}: Props) => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const [dataContacts, setDataContacts] = useState<IDataContacts>({
    ids: [],
    data: [],
  });
  const dispatch = useDispatch();
  const {contacts} = useSelector((state: IGlobalState) => state.contactState);

  const onBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    setLoading(true);
    if (Platform.OS === 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'This app would like to view your contacts.',
        buttonPositive: 'Please accept bare mortal',
      })
        .then(() => {
          loadContacts();
        })
        .catch(() => console.log('Not have permission'));
    } else {
      loadContacts();
    }
  }, []);

  const loadContacts = () => {
    Contacts.getAll()
      .then((response: IActionSetContact['payload']) => {
        dispatch(
          setContact(response, () => {
            console.log(123);
          }),
        );
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });

    Contacts.checkPermission().catch(() => console.log('Error'));
  };

  const onSelect = (item: RowItem) => {
    const index = dataContacts.ids.indexOf(item.id);
    if (index > -1) {
      dataContacts.ids.splice(index);
      dataContacts.data.splice(index);
    } else {
      dataContacts.ids.push(item.id);
      dataContacts.data.push(item);
    }
    setDataContacts({...dataContacts});
  };

  const renderItem = ({item}: {item: RowItem}) => {
    return dataContacts.ids.includes(item.id) ? (
      <TouchableOpacity
        style={[GlobalStyles.mh20, GlobalStyles.pv12, GlobalStyles.flexRow, GlobalStyles.alignCenter]}
        onPress={() => onSelect(item)}>
        <Icon name='check' color={BASE_COLORS.steelBlueColor} size={adjust(12)} style={GlobalStyles.mr5} />
        <Paragraph h5 textSteelBlueColor title={item?.name} />
      </TouchableOpacity>
    ) : (
      <TouchableOpacity style={[GlobalStyles.mh20, GlobalStyles.pv12]} onPress={() => onSelect(item)}>
        <Paragraph h5 textBlack title={item?.name} />
      </TouchableOpacity>
    );
  };

  const onSendInvites = () => {
    navigation.navigate(AppRoute.SEND_INVITES);
  };

  if (loading) {
    return null;
  }

  return (
    <View style={GlobalStyles.containerWhite}>
      <HeaderSmallBlue
        iconBackUrl={IMAGES.iconBackWhite}
        iconStyle={GlobalStyles.iconBackWhiteStyle}
        onBack={onBack}
        isBackButton={true}
      />

      <SafeAreaView style={GlobalStyles.container} edges={['right', 'left']}>
        <View style={GlobalStyles.container}>
          <Paragraph h5 textCenter title='Here are the friends you can invite via email' style={GlobalStyles.p25} />
          <FlatList
            data={contacts}
            renderItem={renderItem}
            ItemSeparatorComponent={() => <View style={styles.border} />}
            keyExtractor={(item, index) => `listContact-${index}`}
          />
          <View style={styles.alphabetContainer}>
            {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((item: string, index: number) => (
              <Paragraph title={item} key={`alphabet-${item}-${index}`} />
            ))}
          </View>
        </View>
        <View style={styles.buttonContainerStyle}>
          <Button
            title={t('send_invites')}
            onPress={onSendInvites}
            h4
            textCenter
            containerStyle={{
              ...GlobalStyles.buttonContainerStyle,
              ...styles.buttonStyle,
            }}
            textStyle={styles.textPrimary}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ListContactScreen;
