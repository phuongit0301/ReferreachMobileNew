import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import SelectDropdown from 'react-native-select-dropdown';
import {useSelector} from 'react-redux';
import Svg, {Path} from 'react-native-svg';

import {BottomTabParams} from '~Root/navigation/config';
import {AppRoute} from '~Root/navigation/AppRoute';
import {Category, HeaderSmallBlueWithBG, Paragraph, Tags} from '~Root/components';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import {IGlobalState} from '~Root/types';
import styles from './styles';
import {adjust} from '~Root/utils';

type Props = NativeStackScreenProps<BottomTabParams, AppRoute.AIR_FEED>;

const PAGINATION = [1, 2, 3];
const DEFAULT_FORM_STATE = {
  greeting: false,
  role: false,
  position: true,
  description: false,
  details: false,
  positionSuggestion: false,
};

const DEFAULT_TITLE =
  'Hi there! This is where you can start to create an Ask and send it to your network. \n\n You can long press on me to access the tutorial and speech-to-text Ask creation.';

const AskScreen = ({navigation}: any) => {
  const {t} = useTranslation();
  const [currentPage, setPage] = useState(1);
  const [showForm, setShowForm] = useState(DEFAULT_FORM_STATE);
  const [showTooltip, setShowTooltip] = useState(true);
  const [textPosition, setTextPosition] = useState('');
  const [textGreeting, setTextGreeting] = useState('');
  const [textDescription, setTextDescription] = useState('');
  const [textGreetingDefault, setTextGreetingDefault] = useState('Hi, ');
  const [titleTooltip, setTitleTooltip] = useState(DEFAULT_TITLE);
  const askState = useSelector((state: IGlobalState) => state.askState);

  const onBack = () => {
    navigation.goBack();
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onPage = (number: number) => {
    console.log(number);
  };

  const onShowGreeting = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      greeting: true,
    });
    setTitleTooltip('You can personalize your greeting');
  };

  const onShowPosition = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      position: true,
    });
  };

  const onShowDescription = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      ...showForm,
      description: true,
    });
  };

  const onHideAll = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
    });
  };

  const onTooltipPress = () => {
    setShowTooltip(!showTooltip);
  };

  const onInputGreetingChange = (text: string) => {
    setTextGreeting(text);
  };

  const onInputPositionChange = (text: string) => {
    setTextPosition(text);
  };

  const onInputDescriptionChange = (text: string) => {
    setTextDescription(text);
  };

  const renderItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        onPress={() => setTextGreetingDefault(item)}
        style={[GlobalStyles.mh10, GlobalStyles.ph10, GlobalStyles.pv5, GlobalStyles.mb10, styles.btnGreetings]}>
        <Paragraph p textSteelBlue2Color bold600 title={item} />
      </TouchableOpacity>
    );
  };

  const renderPositionItem = ({item}: {item: any}) => {
    return (
      <TouchableOpacity
        onPress={() => setTextPosition(item)}
        style={[GlobalStyles.mh10, GlobalStyles.ph10, GlobalStyles.pv5, GlobalStyles.mb10, styles.btnGreetings]}>
        <Paragraph p textSteelBlue2Color bold600 title={item} />
      </TouchableOpacity>
    );
  };

  const onEndPosition = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      position: false,
    });
  };

  const onEndDescription = () => {
    setShowForm({
      ...DEFAULT_FORM_STATE,
      description: false,
    });
  };

  const onShowPositionSuggestion = () => {
    setShowForm({
      ...showForm,
      positionSuggestion: true,
    });
  };

  return (
    <View style={[GlobalStyles.container]}>
      <HeaderSmallBlueWithBG
        title={t('create_ask')}
        isBackButton={true}
        onBack={onBack}
        isRightButton={true}
        onRightPress={onToggleDrawer}
      />
      <View style={[GlobalStyles.container, styles.container, styles.contentContainer]}>
        <View style={[GlobalStyles.mb20, GlobalStyles.container]}>
          <ScrollView>
            <View style={[GlobalStyles.flexColumn, GlobalStyles.mt10]}>
              <View style={[GlobalStyles.flexRow, GlobalStyles.justifyCenter]}>
                {PAGINATION.map(item => {
                  return (
                    <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]}>
                      {currentPage === item ? (
                        <LinearGradient
                          colors={[BASE_COLORS.steelBlue2Color, BASE_COLORS.cyanCornflowerBlueColor]}
                          style={[styles.btnActive, GlobalStyles.center, GlobalStyles.m5]}>
                          <Paragraph bold600 textWhite title={`${item}`} />
                        </LinearGradient>
                      ) : (
                        <TouchableOpacity
                          onPress={() => onPage(item)}
                          style={[styles.btn, GlobalStyles.center, GlobalStyles.m5]}>
                          <Paragraph bold600 textWhite title={`${item}`} />
                        </TouchableOpacity>
                      )}
                      {item < PAGINATION.length && (
                        <FastImage source={IMAGES.dotPagination} resizeMode='cover' style={styles.dotPagination} />
                      )}
                    </View>
                  );
                })}
              </View>
              <View style={[GlobalStyles.ph15, GlobalStyles.mt15, GlobalStyles.flexRow, GlobalStyles.flexWrap]}>
                {showForm?.greeting ? (
                  <View style={styles.inputDynamicContainer}>
                    <TextInput
                      value={textGreeting}
                      style={styles.input}
                      onChangeText={onInputGreetingChange}
                      onEndEditing={onHideAll}
                      maxLength={28}
                    />
                  </View>
                ) : (
                  <Category
                    styleTag={styles.styleTag}
                    tagText={styles.tagText}
                    key={`greeting`}
                    name={`${textGreetingDefault} ${textGreeting}`}
                    showButton={true}
                    onPress={onShowGreeting}
                    uri={IMAGES.iconCloseBlue}
                  />
                )}
                <Category
                  styleTag={styles.styleTag}
                  tagText={styles.tagText}
                  key={`role`}
                  name={'as a business developer '}
                  showButton={true}
                  onPress={onShowGreeting}
                  uri={IMAGES.iconCloseBlue}
                />
                <View style={[GlobalStyles.flexRow, GlobalStyles.flexWrap]}>
                  <SelectDropdown
                    data={askState?.dataPositionDropDown}
                    defaultValueByIndex={0}
                    onSelect={(selectedItem, index) => {
                      console.log(selectedItem, index);
                    }}
                    dropdownStyle={[styles.styleDropDown]}
                    buttonStyle={[styles.styleButton, GlobalStyles.ml5, GlobalStyles.mb5]}
                    buttonTextStyle={styles.buttonTextStyle}
                    buttonTextAfterSelection={(selectedItem, index) => {
                      // text represented after item is selected
                      // if data array is an array of objects then return selectedItem.property to render after item is selected
                      return selectedItem;
                    }}
                    rowTextForSelection={(item, index) => {
                      // text represented for each item in dropdown
                      // if data array is an array of objects then return item.property to represent item in dropdown
                      return item;
                    }}
                    renderDropdownIcon={() => (
                      <FastImage source={IMAGES.iconDropDown} resizeMode='cover' style={styles.iconDropDown} />
                    )}
                  />
                  {(!textPosition || showForm?.position) ? (
                    <View style={styles.inputContainer}>
                      <TextInput
                        placeholder='what'
                        value={textPosition}
                        style={styles.input}
                        onChangeText={onInputPositionChange}
                        onEndEditing={onEndPosition}
                        onFocus={onShowPositionSuggestion}
                        editable={!!textGreeting}
                      />
                    </View>
                  ) : (
                    <Category
                      styleTag={styles.styleTag}
                      tagText={styles.tagText}
                      key={`position`}
                      name={`${textPosition}`}
                      showButton={true}
                      onPress={onShowPosition}
                      uri={IMAGES.iconCloseBlue}
                    />
                  )}
                </View>
                {!!textPosition &&
                  ((!textDescription || showForm?.description) ? (
                    <View style={styles.inputAreaContainer}>
                      <TextInput
                        placeholder='to...(elaborate on your Ask)'
                        value={textDescription}
                        style={styles.inputArea}
                        onChangeText={onInputDescriptionChange}
                        onEndEditing={onEndDescription}
                        multiline
                      />
                    </View>
                  ) : (
                    <Category
                      styleTag={styles.styleTag}
                      tagText={styles.tagText}
                      key={`description`}
                      name={`${textDescription}`}
                      showButton={true}
                      onPress={onShowDescription}
                      uri={IMAGES.iconCloseBlue}
                    />
                  ))}
              </View>
            </View>
          </ScrollView>
        </View>
        {showForm?.greeting && (
          <View style={[GlobalStyles.mh20, GlobalStyles.container, GlobalStyles.pv15, styles.borderTop]}>
            <FlatList
              contentContainerStyle={[GlobalStyles.flexRow, GlobalStyles.flexWrap, GlobalStyles.container]}
              style={[GlobalStyles.flexRow, GlobalStyles.flexWrap]}
              data={askState?.dataGreetingSuggest}
              renderItem={renderItem}
              keyExtractor={(item, index) => `greeting-suggest-${index}`}
              keyboardShouldPersistTaps='handled'
            />
          </View>
        )}
        {showForm?.positionSuggestion && (
          <View style={[GlobalStyles.mh20, GlobalStyles.container, GlobalStyles.pv15, styles.borderTop]}>
            <FlatList
              contentContainerStyle={[GlobalStyles.flexRow, GlobalStyles.flexWrap, GlobalStyles.container]}
              style={[GlobalStyles.flexRow, GlobalStyles.flexWrap]}
              data={askState?.dataPositionSuggest}
              renderItem={renderPositionItem}
              keyExtractor={(item, index) => `position-suggest-${index}`}
              keyboardShouldPersistTaps='handled'
            />
          </View>
        )}
        <View style={GlobalStyles.container}>
          {showTooltip && (
            <View style={styles.tooltipContentStyle}>
              <View style={GlobalStyles.flexColumn}>
                <View style={[GlobalStyles.mb10, GlobalStyles.flexRow, styles.tooltipCloseBtnContainer]}>
                  <TouchableOpacity onPress={onTooltipPress}>
                    <FastImage
                      source={IMAGES.iconCloseCircleWhite}
                      resizeMode='cover'
                      style={styles.iconCloseCircleWhite}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.iconTriangle}>
                  <Svg width='19' height='13' viewBox='0 0 19 13' fill='none'>
                    <Path d='M19 13H0L7.308 0 19 13z' fill='#fff' />
                  </Svg>
                </View>
                <Paragraph style={styles.textSmall} title={titleTooltip} />
              </View>
            </View>
          )}
          <TouchableOpacity style={styles.iconCatContainer} onPress={onTooltipPress}>
            <FastImage source={IMAGES.iconCat} resizeMode='cover' style={styles.iconCat} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default AskScreen;
