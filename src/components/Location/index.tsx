import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, TouchableWithoutFeedback, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {BASE_COLORS, CREATE_ASK_FIELDS, GlobalStyles} from '~Root/config';
import {getLocation, setLocation} from '~Root/services/ask/actions';
import {InputIconValidate, Paragraph} from '~Root/components';
import styles from './styles';
import {IGlobalState} from '~Root/types';
import {IAskLocationState} from '~Root/services/ask/types';

interface Props {
  register?: any;
  trigger?: any;
  errors?: any;
  control?: any;
  watch?: any;
  setValue?: any;
  onSubmitEditing?: (key: string) => void;
  data?: IAskLocationState['data'];
}

const Location: React.FC<Props> = ({
  register,
  trigger,
  setValue,
  data,
  errors,
  control,
  watch,
  onSubmitEditing = () => {},
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const askState = useSelector((state: IGlobalState) => state.askState);
  const [isSelectedLocation, setSelectedLocation] = useState(false);

  const [textLocation, setTextLocation] = useState('');

  const watchLocation = watch(CREATE_ASK_FIELDS.location);

  useEffect(() => {
    if (data) {
      console.log('data======>', data);
      dispatch(setLocation(null));
      setSelectedLocation(true);
      setTextLocation(data?.text);
      setValue(CREATE_ASK_FIELDS.location, data?.text);
    }
  }, [data]);

  useEffect(() => {
    if (textLocation !== '') {
      if (textLocation !== watchLocation) {
        setSelectedLocation(false);
        dispatch(
          getLocation(watchLocation, (response: any) => {
            console.log(response);
          }),
        );
      }
    }
  }, [watchLocation, textLocation]);

  const onSelectLocation = async (text: string) => {
    dispatch(setLocation(null));
    setValue(CREATE_ASK_FIELDS.location, text);
    setSelectedLocation(true);
    setTextLocation(text);
    await trigger(CREATE_ASK_FIELDS.location);
    onSubmitEditing(CREATE_ASK_FIELDS.location);
  };

  const renderLocationItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity onPress={() => onSelectLocation(item?.attributes?.display_value)}>
        <View style={[GlobalStyles.mh10, GlobalStyles.ph10, GlobalStyles.pv10, styles.item]}>
          <Paragraph p textBlack bold600 title={item?.attributes?.display_value} />
        </View>
      </TouchableOpacity>
    );
  };

  const onEndEditingLocation = useCallback(async () => {
    console.log(textLocation);
    console.log(watchLocation);
    console.log(isSelectedLocation);
    // if (!isSelectedLocation && textLocation !== watchLocation?.trim()) {
    //   dispatch(setLocation(null));
    //   setValue(CREATE_ASK_FIELDS.location, '');
    //   // await trigger(CREATE_ASK_FIELDS.location);
    // }

    // if (textLocation !== watchLocation?.trim()) {
    //   setSelectedLocation(false);
    // }
  }, [textLocation, watchLocation, isSelectedLocation]);

  return (
    <TouchableWithoutFeedback onPress={console.log(3333333333)}>
      <View style={{flex: 1}}>
        <InputIconValidate
          label={`${t('location')}*`}
          inputStyleWrapper={styles.inputDynamicContainer}
          selectionColor={BASE_COLORS.blackColor}
          placeholderTextColor={BASE_COLORS.grayColor}
          placeholder='Select Your Location'
          errors={errors}
          control={control}
          name={CREATE_ASK_FIELDS.location}
          register={register}
          // onEndEditing={onEndEditingLocation}
          errorStyle={GlobalStyles.mt0}
        />
        {askState?.dataLocationSuggest && askState?.dataLocationSuggest?.length > 0 && (
          <View style={[GlobalStyles.container, GlobalStyles.pv15, styles.locationArea]}>
            <FlatList
              contentContainerStyle={[GlobalStyles.flexRow, GlobalStyles.flexWrap, GlobalStyles.container]}
              style={[GlobalStyles.flexRow, GlobalStyles.flexWrap]}
              data={askState?.dataLocationSuggest}
              renderItem={renderLocationItem}
              keyExtractor={(_item, index) => `location-suggest-${index}`}
              ItemSeparatorComponent={() => <View style={styles.borderBottom} />}
              keyboardShouldPersistTaps='handled'
              numColumns={1}
              nestedScrollEnabled={true}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Location;
