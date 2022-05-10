import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {SubmitHandler} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';

import {RootNavigatorParamsList} from '~Root/navigation/config';
import {Button, ModalDialog, ProfileBlock, ProfileTemplateScreen} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import styles from './styles';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {IIndustryState} from '~Root/services/industry/types';
import {IGlobalState} from '~Root/types';
import {
  deleteIndustry,
  filterIndustry,
  getAllIndustries,
  hideModal,
  setIndustrySelected,
  showModal,
} from '~Root/services/industry/actions';
import {IUserState} from '~Root/services/user/types';
import {deleteUserIndustry, setUserIndustry} from '~Root/services/user/actions';

// type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.PROFILE>;

const ProfileSecondScreen = ({navigation}: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [showTooltip, setShowTooltip] = useState({
    first: false,
    second: false,
    third: false,
  });
  const [textSearch, setTextSearch] = useState('');

  const industryState: IIndustryState = useSelector((state: IGlobalState) => state.industryState);
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);

  useEffect(() => {
    if (textSearch !== '') {
      dispatch(filterIndustry(textSearch));
    }
  }, [textSearch]);

  const onSubmit: SubmitHandler<any> = (credentials: any) => {
    if (credentials.first_name && credentials.last_name) {
      console.log(1312323);
    }
  };

  const onInputChange = useCallback((text: string) => {
    setTextSearch(text);
  }, []);

  const onSelect = (item: any) => {
    let data: any = [item];
    if (industryState?.industrySelected?.length > 0) {
      data = [...data, ...industryState?.industrySelected];
    }
    dispatch(setIndustrySelected(data));
  };

  const onRemove = (index: number) => {
    dispatch(deleteIndustry(index));
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onSave = () => {
    const items: string[] = [];
    if (industryState?.industrySelected.length) {
      industryState?.industrySelected.forEach((x: string) => {
        items.push(x?.toLowerCase());
      });
    }

    switch (industryState?.target) {
      case 1:
        dispatch(
          setUserIndustry({
            ...userState?.userInfo,
            industries: {
              myself: industryState?.industrySelected,
              client: userState?.userInfo?.industries?.client,
              partner: userState?.userInfo?.industries?.partner,
            },
            industriesUpdate: {
              myself: items,
              client: userState?.userInfo?.industries?.client as string[],
              partner: userState?.userInfo?.industries?.partner as string[],
            },
          }),
        );
        break;
      case 2:
        dispatch(
          setUserIndustry({
            ...userState?.userInfo,
            industries: {
              client: industryState?.industrySelected,
              myself: userState?.userInfo?.industries?.myself,
              partner: userState?.userInfo?.industries?.partner,
            },
            industriesUpdate: {
              client: items,
              myself: userState?.userInfo?.industries?.myself as string[],
              partner: userState?.userInfo?.industries?.partner as string[],
            },
          }),
        );
        break;
      case 3:
        dispatch(
          setUserIndustry({
            ...userState?.userInfo,
            industries: {
              partner: industryState?.industrySelected,
              client: userState?.userInfo?.industries?.client,
              myself: userState?.userInfo?.industries?.myself,
            },
            industriesUpdate: {
              partner: items,
              client: userState?.userInfo?.industries?.client as string[],
              myself: userState?.userInfo?.industries?.myself as string[],
            },
          }),
        );
        break;
      default:
        break;
    }
    dispatch(hideModal({title: '', target: null}));
    dispatch(setIndustrySelected(null));
  };

  // target = 1 (Your Industry), 2 (You sell to), 3 (yours partners)
  const handleModal = ({title = `${t('your_industry')}`, target = 1}) => {
    dispatch(showLoading());
    dispatch(
      getAllIndustries(() => {
        dispatch(hideLoading());
        dispatch(showModal({title, target}));
      }),
    );
  };

  const onHideModal = () => {
    dispatch(hideModal({title: ''}));
  };

  const onDelete = ({index, target}: {index: number; target: string}) => {
    dispatch(deleteUserIndustry({index, target}));
  };

  const onTooltipPress = (target: string) => {
    setShowTooltip({...showTooltip, [target]: !(showTooltip as any)[target]});
  };

  const onAdd = (item: any) => {
    let data: any = [item];
    if (industryState?.industrySelected?.length > 0) {
      data = [...data, ...industryState?.industrySelected];
    }
    dispatch(setIndustrySelected(data));
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={[GlobalStyles.container]}>
      <ProfileTemplateScreen isBackButton={true} onBack={onBack} isRightButton={true} onToggleDrawer={onToggleDrawer}>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30, GlobalStyles.p15]}>
          <View style={[GlobalStyles.container, GlobalStyles.mb15]}>
            <ProfileBlock
              {...userState?.userInfo?.industries}
              onDelete={onDelete}
              handleModal={handleModal}
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
        {industryState.showModal && (
          <ModalDialog
            isVisible={industryState.showModal}
            dataSelected={industryState?.industrySelected}
            title={industryState?.title}
            data={industryState?.industry}
            onSelect={onSelect}
            onClose={onRemove}
            onSave={onSave}
            onHideModal={onHideModal}
            onInputChange={onInputChange}
            textSearch={textSearch}
            onAdd={onAdd}
          />
        )}
      </ProfileTemplateScreen>
    </View>
  );
};

export default ProfileSecondScreen;
