import React, {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {Button, ModalDialog, ProfileBlock, ProfileTemplateScreen} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import styles from './styles';
import {hideLoading, showLoading} from '~Root/services/loading/actions';
import {IIndustry, IIndustrySave, IIndustryState} from '~Root/services/industry/types';
import {IGlobalState} from '~Root/types';
import {
  deleteIndustry,
  getAllIndustries,
  hideModal,
  setIndustrySelected,
  showModal,
} from '~Root/services/industry/actions';
import {IUserState} from '~Root/services/user/types';
import {deleteUserIndustry, setUserIndustry, updateUserProfileRequest} from '~Root/services/user/actions';
import IndustryAPI from '~Root/services/industry/apis';

// type Props = NativeStackScreenProps<RootNavigatorParamsList, AppRoute.PROFILE>;

const ProfileSecondScreen = ({navigation, route}: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [showTooltip, setShowTooltip] = useState({
    first: false,
    second: false,
    third: false,
  });
  const [textSearch, setTextSearch] = useState('');
  const [loading, setLoading] = useState(false);

  const industryState: IIndustryState = useSelector((state: IGlobalState) => state.industryState);
  const userState: IUserState = useSelector((state: IGlobalState) => state.userState);

  useEffect(() => {
    if (textSearch !== '') {
      dispatch(
        getAllIndustries({textSearch, target: industryState?.target ?? 1}, () => {
          console.log(12321);
        }),
      );
    }
  }, [textSearch]);

  const onSubmit = () => {
    const temp = userState?.userInfo?.self_industries
      ? userState?.userInfo?.self_industries.map(item =>
          typeof item === 'object' ? item?.name ?? item?.attributes?.display_value : item,
        )
      : [];
    const temp1 = userState?.userInfo?.self_industries
      ? userState?.userInfo?.partner_industries.map(item =>
          typeof item === 'object' ? item?.name ?? item?.attributes?.display_value : item,
        )
      : [];
    const temp2 = userState?.userInfo?.self_industries
      ? userState?.userInfo?.sell_industries.map(item =>
          typeof item === 'object' ? item?.name ?? item?.attributes?.display_value : item,
        )
      : [];

    dispatch(showLoading());
    dispatch(
      updateUserProfileRequest(
        {
          self_industry_list: temp,
          partner_industry_list: temp1,
          sell_industry_list: temp2,
          ...route?.params,
        },
        response => {
          dispatch(hideLoading());
          if (response.success) {
            navigation.navigate(AppRoute.PROFILE_COMPLETE);
          }
        },
      ),
    );
  };

  const onInputChange = useCallback((text: string) => {
    setTextSearch(text);
  }, []);

  const onSelect = (item: any) => {
    let data: any = [item];
    if (industryState?.industry_selected?.length > 0) {
      data = [...data, ...industryState?.industry_selected];
    }
    dispatch(setIndustrySelected(data));
  };

  const onRemove = (index: number) => {
    dispatch(deleteIndustry(index));
  };

  const onBack = () => {
    navigation.goBack();
  };

  const onSave = async () => {
    // const items: string[] = [];
    // if (industryState?.industry_selected.length) {
    //   industryState?.industry_selected.forEach((x: IIndustry | IIndustrySave) => {
    //     items.push(x?.attributes?.display_value?.toLowerCase());
    //   });
    // }
    const items: any = await IndustryAPI.filterDataIndustry({
      target: industryState?.target ?? 1,
      industries: industryState?.industry_selected,
      userInfo: userState?.userInfo,
    });

    console.log('items========>', items);
    switch (industryState?.target) {
      case 1:
        dispatch(
          setUserIndustry({
            ...userState?.userInfo,
            self_industries: [...userState?.userInfo?.self_industries, ...items],
            partner_industries: userState?.userInfo?.partner_industries,
            sell_industries: userState?.userInfo?.sell_industries,
          }),
        );
        break;
      case 2:
        dispatch(
          setUserIndustry({
            ...userState?.userInfo,
            self_industries: userState?.userInfo?.self_industries,
            partner_industries: userState?.userInfo?.partner_industries,
            sell_industries: [...userState?.userInfo?.sell_industries, ...items],
          }),
        );
        break;
      case 3:
        dispatch(
          setUserIndustry({
            ...userState?.userInfo,
            self_industries: userState?.userInfo?.self_industries,
            partner_industries: [...userState?.userInfo?.partner_industries, ...items],
            sell_industries: userState?.userInfo?.sell_industries,
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
    setLoading(true);
    dispatch(
      getAllIndustries({textSearch: '', target}, () => {
        setLoading(false);
        dispatch(showModal({title, target}));
      }),
    );
  };

  const onHideModal = () => {
    setTextSearch('');
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
    if (industryState?.industry_selected?.length > 0) {
      data = [...data, ...industryState?.industry_selected];
    }
    dispatch(setIndustrySelected(data));
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  return (
    <View style={[GlobalStyles.container]} key='profile-second'>
      <ProfileTemplateScreen isBackButton={true} onBack={onBack} isRightButton={true} onToggleDrawer={onToggleDrawer}>
        <View style={[GlobalStyles.flexColumn, GlobalStyles.mb30, GlobalStyles.p15]}>
          <View style={[GlobalStyles.container, GlobalStyles.mb15]}>
            <ProfileBlock
              selfIndustries={userState?.userInfo?.self_industries}
              partnerIndustries={userState?.userInfo?.partner_industries}
              sellIndustries={userState?.userInfo?.sell_industries}
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
              disabled={
                userState?.userInfo?.self_industries.length === 0 ||
                userState?.userInfo?.partner_industries.length === 0 ||
                userState?.userInfo?.sell_industries.length === 0
              }
            />
          </View>
        </View>
        {industryState.showModal && !loading && (
          <ModalDialog
            isVisible={industryState.showModal}
            dataSelected={industryState?.industry_selected}
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
