import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, TextInput, TouchableOpacity, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';

import {BASE_COLORS, CREATE_ASK_FIELDS, GlobalStyles} from '~Root/config';
import {getLocation, setLocation} from '~Root/services/ask/actions';
import {Paragraph} from '~Root/components';
import styles from './styles';
import {IGlobalState} from '~Root/types';
import {IAskLocationState} from '~Root/services/ask/types';

interface Props {
  register?: any;
  setValue?: any;
  data?: IAskLocationState['data'];
  visibleLocation?: boolean;
}

const Location: React.FC<Props> = ({register, setValue, visibleLocation = false, data}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const askState = useSelector((state: IGlobalState) => state.askState);

  const [locationState, setLocationState] = useState({
    visible: false,
    keyword: '',
  });

  useEffect(() => {
    if (data) {
      setLocationState({...locationState, keyword: data?.text ?? ''});
      setValue(CREATE_ASK_FIELDS.location, data?.text);
    }
  }, [data]);

  const onSearch = useCallback(
    text => {
      setLocationState({
        ...locationState,
        keyword: text,
      });
      dispatch(
        getLocation(text, () => {
          setLocationState({
            ...locationState,
            visible: true,
          });
        }),
      );
    },
    [dispatch, locationState?.keyword],
  );

  const onSelectLocation = (text: string) => {
    dispatch(setLocation(null));
    setValue(CREATE_ASK_FIELDS.location, text);
    setLocationState({
      visible: true,
      keyword: text,
    });
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

  return (
    <View>
      <TextInput
        {...register(CREATE_ASK_FIELDS.location)}
        value={locationState?.keyword}
        placeholder={`${t('location')}*`}
        onChangeText={onSearch}
        selectionColor={BASE_COLORS.blackColor}
        placeholderTextColor={BASE_COLORS.grayColor}
        style={[GlobalStyles.ph10, GlobalStyles.mb10, styles.inputDynamicContainer]}
      />
      {locationState?.visible && askState?.dataLocationSuggest && askState?.dataLocationSuggest?.length > 0 && (
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
  );
};

export default Location;
