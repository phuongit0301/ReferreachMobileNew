import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import {t} from 'i18next';

import {Avatar, Paragraph} from '~Root/components';
import {GlobalStyles, IMAGES} from '~Root/config';
import {IGlobalState} from '~Root/types';

import styles, {sliderWidth, itemWidth} from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppRoute} from '~Root/navigation/AppRoute';
import {ChatNavigatorParamsList} from '~Root/navigation/config';

export const ENTRIES1 = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration:
      'https://s3-alpha-sig.figma.com/img/6bcc/03c0/f77728833aa404f1655dc8a71d134556?Expires=1659916800&Signature=HI-OCBQN3AOr7FPtDFzUrzqrc0Uh6rSBymEqZw1nFa6CYyytf-RmNa1wYJQIrPA0PjuXjNDIHVagmoRPxFeBruuf2eM4oLPUF4IcL-RKVZO2BU~JvRNuyfpiTiZPNVYUeDITsP3kp4rGjzcH6dvll-z8cVSDjnyMmQWrhHUvQadpomI0NQToqauUqZ3sEQ02p-txOVUUkJkudUNztZskAWpSVE9ulxdDSX96ZAfW0ujrzza7cdTKzukxlUN3jD9i~OuMh7TRNZZtsp2f9DgBioed3JMHf8muyBQ40HUklPYmQ6OaLPqTgfMwt1NbD-41z-N-daPc-Tw77Hmy0BHy-g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration:
      'https://s3-alpha-sig.figma.com/img/6bcc/03c0/f77728833aa404f1655dc8a71d134556?Expires=1659916800&Signature=HI-OCBQN3AOr7FPtDFzUrzqrc0Uh6rSBymEqZw1nFa6CYyytf-RmNa1wYJQIrPA0PjuXjNDIHVagmoRPxFeBruuf2eM4oLPUF4IcL-RKVZO2BU~JvRNuyfpiTiZPNVYUeDITsP3kp4rGjzcH6dvll-z8cVSDjnyMmQWrhHUvQadpomI0NQToqauUqZ3sEQ02p-txOVUUkJkudUNztZskAWpSVE9ulxdDSX96ZAfW0ujrzza7cdTKzukxlUN3jD9i~OuMh7TRNZZtsp2f9DgBioed3JMHf8muyBQ40HUklPYmQ6OaLPqTgfMwt1NbD-41z-N-daPc-Tw77Hmy0BHy-g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
    illustration:
      'https://s3-alpha-sig.figma.com/img/6bcc/03c0/f77728833aa404f1655dc8a71d134556?Expires=1659916800&Signature=HI-OCBQN3AOr7FPtDFzUrzqrc0Uh6rSBymEqZw1nFa6CYyytf-RmNa1wYJQIrPA0PjuXjNDIHVagmoRPxFeBruuf2eM4oLPUF4IcL-RKVZO2BU~JvRNuyfpiTiZPNVYUeDITsP3kp4rGjzcH6dvll-z8cVSDjnyMmQWrhHUvQadpomI0NQToqauUqZ3sEQ02p-txOVUUkJkudUNztZskAWpSVE9ulxdDSX96ZAfW0ujrzza7cdTKzukxlUN3jD9i~OuMh7TRNZZtsp2f9DgBioed3JMHf8muyBQ40HUklPYmQ6OaLPqTgfMwt1NbD-41z-N-daPc-Tw77Hmy0BHy-g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    illustration:
      'https://s3-alpha-sig.figma.com/img/6bcc/03c0/f77728833aa404f1655dc8a71d134556?Expires=1659916800&Signature=HI-OCBQN3AOr7FPtDFzUrzqrc0Uh6rSBymEqZw1nFa6CYyytf-RmNa1wYJQIrPA0PjuXjNDIHVagmoRPxFeBruuf2eM4oLPUF4IcL-RKVZO2BU~JvRNuyfpiTiZPNVYUeDITsP3kp4rGjzcH6dvll-z8cVSDjnyMmQWrhHUvQadpomI0NQToqauUqZ3sEQ02p-txOVUUkJkudUNztZskAWpSVE9ulxdDSX96ZAfW0ujrzza7cdTKzukxlUN3jD9i~OuMh7TRNZZtsp2f9DgBioed3JMHf8muyBQ40HUklPYmQ6OaLPqTgfMwt1NbD-41z-N-daPc-Tw77Hmy0BHy-g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration:
      'https://s3-alpha-sig.figma.com/img/6bcc/03c0/f77728833aa404f1655dc8a71d134556?Expires=1659916800&Signature=HI-OCBQN3AOr7FPtDFzUrzqrc0Uh6rSBymEqZw1nFa6CYyytf-RmNa1wYJQIrPA0PjuXjNDIHVagmoRPxFeBruuf2eM4oLPUF4IcL-RKVZO2BU~JvRNuyfpiTiZPNVYUeDITsP3kp4rGjzcH6dvll-z8cVSDjnyMmQWrhHUvQadpomI0NQToqauUqZ3sEQ02p-txOVUUkJkudUNztZskAWpSVE9ulxdDSX96ZAfW0ujrzza7cdTKzukxlUN3jD9i~OuMh7TRNZZtsp2f9DgBioed3JMHf8muyBQ40HUklPYmQ6OaLPqTgfMwt1NbD-41z-N-daPc-Tw77Hmy0BHy-g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  },
  {
    title: 'Middle Earth, Germany',
    subtitle: 'Lorem ipsum dolor sit amet',
    illustration:
      'https://s3-alpha-sig.figma.com/img/6bcc/03c0/f77728833aa404f1655dc8a71d134556?Expires=1659916800&Signature=HI-OCBQN3AOr7FPtDFzUrzqrc0Uh6rSBymEqZw1nFa6CYyytf-RmNa1wYJQIrPA0PjuXjNDIHVagmoRPxFeBruuf2eM4oLPUF4IcL-RKVZO2BU~JvRNuyfpiTiZPNVYUeDITsP3kp4rGjzcH6dvll-z8cVSDjnyMmQWrhHUvQadpomI0NQToqauUqZ3sEQ02p-txOVUUkJkudUNztZskAWpSVE9ulxdDSX96ZAfW0ujrzza7cdTKzukxlUN3jD9i~OuMh7TRNZZtsp2f9DgBioed3JMHf8muyBQ40HUklPYmQ6OaLPqTgfMwt1NbD-41z-N-daPc-Tw77Hmy0BHy-g__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA',
  },
];

type Props = NativeStackScreenProps<ChatNavigatorParamsList, AppRoute.CHAT_KUDOS_SUCCESS>;

const Slide: React.FC<Props> = ({navigation}) => {
  const [sliderActive, setSliderActive] = useState(1);
  const [text, setText] = useState('');
  const scrollAnim = new Animated.Value(0);
  const chatState = useSelector((state: IGlobalState) => state.chatState);

  //   const image = () => {
  //     const {
  //       data: {illustration},
  //       parallax,
  //       parallaxProps,
  //       even,
  //     } = this.props;

  //     return parallax ? (
  //       <ParallaxImage
  //         source={{uri: illustration}}
  //         containerStyle={[styles.imageContainer, even ? styles.imageContainerEven : {}]}
  //         style={styles.image}
  //         parallaxFactor={0.35}
  //         showSpinner={true}
  //         spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
  //         {...parallaxProps}
  //       />
  //     ) : (
  //       <Image source={{uri: illustration}} style={styles.image} />
  //     );
  //   };

  const onChangeText = (text: string) => {
    setText(text);
  };

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <ScrollView style={[GlobalStyles.container, GlobalStyles.scrollViewFullScreen, GlobalStyles.mb30]}>
        <View style={[GlobalStyles.alignCenter, GlobalStyles.flexColumn]}>
          <View style={[GlobalStyles.ph15, GlobalStyles.alignCenter, GlobalStyles.pv25, styles.slideInnerContainer]}>
            <View style={styles.shadow} />
            <View style={[GlobalStyles.mb15, styles.imageContainer]}>
              <FastImage source={{uri: item?.illustration}} style={styles.image} />
            </View>
            <Paragraph bold600 title='Liam Mater' style={GlobalStyles.mb5} />
            <Paragraph title='Business Developer' style={GlobalStyles.mb10} />
            <TextInput
              style={[GlobalStyles.ph10, GlobalStyles.pt5, GlobalStyles.pb5, GlobalStyles.mb30, styles.inputArea]}
              onChangeText={onChangeText}
              value={text}
              multiline
            />
            <View style={[GlobalStyles.flexRow, GlobalStyles.p10, GlobalStyles.mb5, styles.rateContainer]}>
              {[1, 2, 3, 4, 5].map(x => (
                <TouchableOpacity style={GlobalStyles.mr5}>
                  <FastImage source={IMAGES.handRate} resizeMode='contain' style={styles.handRate} />
                </TouchableOpacity>
              ))}
            </View>
            <Paragraph h6 textDarkGrayColor title={t('rating_private')} />
          </View>
          <View style={styles.border} />
          <View style={[GlobalStyles.container, GlobalStyles.p10, GlobalStyles.mb15, styles.userListContainer]}>
            <ScrollView style={[GlobalStyles.container]} horizontal showsHorizontalScrollIndicator={false}>
              {chatState?.listMatches.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={`chat-kudos-${item.id}-${index}`}
                    style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.ml10]}>
                    <Avatar
                      styleAvatar={{...GlobalStyles.mr3, ...styles.avatar}}
                      styleContainerGradient={{...GlobalStyles.mr3, ...styles.avatar}}
                      textStyle={{...GlobalStyles.p, ...GlobalStyles.textBoldNormal}}
                      userInfo={{
                        avatar_url: item?.attributes?.avatar_metadata?.avatar_url,
                        avatar_lat: item?.attributes?.avatar_metadata?.avatar_lat,
                        avatar_lng: item?.attributes?.avatar_metadata?.avatar_lng,
                        first_name: item?.attributes?.first_name,
                        last_name: item?.attributes?.last_name,
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
          <Paragraph p textWhite textCenter title={t('sending_kudos')} style={GlobalStyles.mb15} />
          <TouchableOpacity
            style={[GlobalStyles.p10, styles.btn]}
            onPress={() => navigation.navigate(AppRoute.CHAT_KUDOS_SUCCESS)}>
            <Paragraph h5 bold600 textWhite textCenter title={t('send_kudos')} />
          </TouchableOpacity>
          {/* <Animated.FlatList
            style={[GlobalStyles.container, {height: 200}]}
            contentContainerStyle={[GlobalStyles.mt30, {width: '100%'}]}
            scrollEventThrottle={1}
            horizontal={true}
            onScroll={Animated.event(
              [
                {
                  nativeEvent: {
                    contentOffset: {
                      y: scrollAnim,
                    },
                  },
                },
              ],
              {useNativeDriver: true},
            )}
            showsHorizontalScrollIndicator={false}
            data={chatState?.listMatches}
            key={'chat-kudos-list'}
            keyExtractor={(item, index) => `chat-kudos-${item.id}-${index}`}
            // ListFooterComponent={() => (
            //   <TouchableOpacity style={[GlobalStyles.p10]}>
            //     <FastImage source={IMAGES.iconSearchBlack} resizeMode='cover' />
            //   </TouchableOpacity>
            // )}
            renderItem={({item}: {item: any}) => (
              <TouchableOpacity
                style={[GlobalStyles.flexRow, GlobalStyles.alignCenter, GlobalStyles.ml10]}>
                <Avatar
                  styleAvatar={{...GlobalStyles.mr3, ...styles.avatar}}
                  styleContainerGradient={{...GlobalStyles.mr3, ...styles.avatar}}
                  textStyle={{...GlobalStyles.p, ...GlobalStyles.textBoldNormal}}
                  userInfo={{
                    avatar_url: item?.attributes?.avatar_metadata?.avatar_url,
                    avatar_lat: item?.attributes?.avatar_metadata?.avatar_lat,
                    avatar_lng: item?.attributes?.avatar_metadata?.avatar_lng,
                    first_name: item?.attributes?.first_name,
                    last_name: item?.attributes?.last_name,
                  }}
                />
              </TouchableOpacity>
            )}
          /> */}
        </View>
      </ScrollView>
    );
  };
  return (
    <Carousel
      data={ENTRIES1}
      renderItem={renderItem}
      sliderWidth={sliderWidth}
      itemWidth={itemWidth}
      hasParallaxImages={true}
      firstItem={sliderActive}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
      loop={true}
      loopClonesPerSide={2}
      autoplay={false}
      onSnapToItem={index => setSliderActive(index)}
    />
  );
};

export default Slide;
