import React, {useCallback, useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import DocumentPicker, {DocumentPickerResponse} from 'react-native-document-picker';
import Modal from 'react-native-modal';

import {AppRoute} from '~Root/navigation/AppRoute';
import {HeaderSmallBlueWithBG, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles, IMAGES} from '~Root/config';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';
import styles from './styles';
import Svg, {Path} from 'react-native-svg';
import {setDataCreateAsk3} from '~Root/services/ask/actions';
import {useDispatch, useSelector} from 'react-redux';
import AskPreviewScreen from '../AskPreview';
import {IGlobalState} from '~Root/types';

const PAGINATION = [1, 2, 3];

const AskThreeScreen = ({navigation}: any) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const askState = useSelector((state: IGlobalState) => state.askState);
  const userState = useSelector((state: IGlobalState) => state.userState);

  const [currentPage, setPage] = useState(3);
  const [showTooltip, setShowTooltip] = useState(true);
  const [visiblePreview, setVisiblePreview] = useState(false);
  const [titleTooltip, setTitleTooltip] = useState(
    'You can upload any additional info to give more context. Or you can tap Preview to proceed.',
  );
  const [textDescription, setTextDescription] = useState('');
  const [filesUpload, setFilesUpload] = useState<DocumentPickerResponse[]>([]);

  const onBack = () => {
    navigation.goBack();
  };

  const onToggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const onTooltipPress = () => {
    setShowTooltip(!showTooltip);
  };

  const onPage = (number: number) => {
    if (number === 1) {
      navigation.goBack();
    }
  };

  const onInputChange = (text: string) => {
    setTextDescription(text);
  };

  const onSelect = async () => {
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.xlsx,
          DocumentPicker.types.xls,
        ],
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      console.log('filesUpload1111 : ' + filesUpload);

      setFilesUpload([...filesUpload, ...res]);
      // Setting the state to show single file attributes
    } catch (err) {
      // Handling any exception (If any)
      if (!DocumentPicker.isCancel(err)) {
        console.log('Unknown Error: ' + JSON.stringify(err));
      }
    }
  };

  const removeFile = (index: number) => {
    setFilesUpload([...filesUpload.filter((_, i) => index !== i)]);
  };

  const onNext = (credentials: any) => {
    dispatch(
      setDataCreateAsk3({
        additional_detail: textDescription,
        filesUpload,
      }),
    );
    setVisiblePreview(true);
  };

  const dismissModalHandler = () => {
    setVisiblePreview(false);
  };

  const onSuccess = () => {
    setVisiblePreview(false);
    navigation.navigate(AppRoute.ASK_PUBLISH);
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={GlobalStyles.container}
          keyboardVerticalOffset={80}>
          <View style={[GlobalStyles.mb20, GlobalStyles.container]}>
            <ScrollView>
              <View style={[GlobalStyles.flexColumn, GlobalStyles.mt10]}>
                <View style={[GlobalStyles.flexRow, GlobalStyles.justifyCenter]}>
                  {PAGINATION.map(item => {
                    return (
                      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter]} key={`pagination-3-${item}`}>
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
                <View style={[GlobalStyles.container, GlobalStyles.mh15, GlobalStyles.mt20]}>
                  <Paragraph bold600 textSteelBlue2Color textCenter title='Optional Details ' />
                  {filesUpload?.length > 0 &&
                    filesUpload.map((item, index) => (
                      <View style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb15]}>
                        <FastImage source={IMAGES.iconUploadDone} resizeMode='cover' style={styles.iconUploadDone} />
                        <Paragraph numberOfLines={1} ellipsizeMode='tail' textSteelBlue2Color title={item?.name} style={[GlobalStyles.mr5, {width: '60%'}]} />
                        <TouchableOpacity onPress={() => removeFile(index)}>
                          <FastImage source={IMAGES.iconTrash} resizeMode='cover' style={styles.iconTrash} />
                        </TouchableOpacity>
                      </View>
                    ))}
                  <TouchableOpacity
                    style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.mb20]}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onPress={onSelect}>
                    <FastImage source={IMAGES.iconUploadDone} resizeMode='cover' style={styles.iconUploadDone} />
                    <View style={[GlobalStyles.flexColumn]}>
                      <Paragraph
                        h5
                        textSpanishGray2Color
                        title='Upload additional documents'
                        style={GlobalStyles.mb5}
                      />
                      <Paragraph
                        textSpanishGray2Color
                        title='(pdf, jpg, gif, png, 2 MB max)'
                        style={[GlobalStyles.mb5, styles.fileType]}
                      />
                      <Paragraph
                        textSpanishGray2Color
                        title='Please do not share sensitive files'
                        style={[GlobalStyles.mr5, styles.fontSmall]}
                      />
                    </View>
                  </TouchableOpacity>
                  <View style={[GlobalStyles.flexColumn]}>
                    <Paragraph textSteelBlue2Color title='Additional details' style={GlobalStyles.mr5} />
                    <View style={[GlobalStyles.mb5, styles.inputAreaContainer]}>
                      <TextInput
                        value={textDescription}
                        style={styles.inputArea}
                        onChangeText={onInputChange}
                        maxLength={130}
                        multiline
                      />
                    </View>
                    <Paragraph
                      textGraniteGrayColor
                      textRight
                      title={`${textDescription.length}/130`}
                      style={styles.fontSmall}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
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
              <TouchableOpacity style={styles.iconCatContainer} onPress={onNext}>
                <FastImage source={IMAGES.iconCatPreview} resizeMode='cover' style={styles.iconCatNext} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      {visiblePreview && (
        <Modal isVisible={true} onBackdropPress={dismissModalHandler}>
          <View style={{height: '60%', borderRadius: 30, overflow: 'hidden'}}>
            <AskPreviewScreen
              navigation={navigation}
              userInfo={userState?.userInfo}
              dataStep1={askState?.dataStep1}
              dataStep2={askState?.dataStep2}
              dataStep3={askState?.dataStep3}
              onSuccess={onSuccess}
            />
          </View>
        </Modal>
      )}
    </View>
  );
};

export default AskThreeScreen;
