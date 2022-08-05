import React, {useState} from 'react';
import {View, TouchableOpacity, TextInput, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import Carousel from 'react-native-snap-carousel';
import {useSelector} from 'react-redux';
import {t} from 'i18next';

import {Avatar, Paragraph, UserCard} from '~Root/components';
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
          <View style={[GlobalStyles.pt15, GlobalStyles.mb10, styles.slideInnerContainer]}>
            <View style={[GlobalStyles.alignCenter, GlobalStyles.ph15, GlobalStyles.container]}>
              <View style={styles.shadow} />
              <View style={[GlobalStyles.mb5, GlobalStyles.alignEnd, GlobalStyles.flexRow, styles.imageContainer]}>
                <FastImage source={{uri: item?.illustration}} style={styles.image} />
                <FastImage source={IMAGES.iconProtect17x20} resizeMode='cover' style={styles.iconProtect} />
              </View>
              <Paragraph h5 title='Liam Mater' style={[GlobalStyles.mb5, styles.name]} />
              <Paragraph h6 title='Business Developer' style={[GlobalStyles.mb10, styles.position]} />
              <UserCard
                data={[
                  {id: 1, name: 'Utilities'},
                  {id: 2, name: 'Cyber Securities'},
                ]}
                title={'Endorse Liam’s industry domains'}
                titleStyle={styles.titleStyle}
                styleHeaderContainer={GlobalStyles.alignCenter}
                onPress={() => {}}
                containerStyle={styles.buttonContainer}
                textStyle={styles.buttonTextStyle}
                styleContainer={styles.cardItemContainer}
                showIconSubTitle={true}
                iconSubName='globe'
                showTooltip={false}
                showSubTitle={false}
                showButton={false}
                showRequired={false}
                onTooltipPress={() => {}}
                tooltipTitle={t('your_industry')}
                tooltipDescription={t('your_industry_description')}
                styleTag={styles.styleTag}
                tagText={styles.tagText}
              />
              <Paragraph
                textCenter
                h6
                textJetColor
                title='Please rate this response to your Ask'
                style={[GlobalStyles.mb5, styles.text]}
              />
              <View
                style={[
                  GlobalStyles.flexRow,
                  GlobalStyles.ph10,
                  GlobalStyles.pv5,
                  GlobalStyles.mb5,
                  styles.rateContainer,
                ]}>
                {[1, 2, 3, 4, 5].map(x => (
                  <TouchableOpacity style={GlobalStyles.mr5}>
                    <FastImage source={IMAGES.starRate} resizeMode='contain' style={styles.starRate} />
                  </TouchableOpacity>
                ))}
              </View>
              <Paragraph textDarkGrayColor title={`*${t('rating_private')}`} style={styles.text1} />
            </View>
            <View style={[styles.userListContainer]}>
              <Paragraph h6 bold500 title={t('introducers')} style={[GlobalStyles.ph10, GlobalStyles.pv5]} />
              <ScrollView style={[GlobalStyles.container]} horizontal showsHorizontalScrollIndicator={false}>
                {chatState?.listMatches.map((item, index) => {
                  return (
                    <TouchableOpacity
                      key={`chat-kudos-${item.id}-${index}`}
                      style={[GlobalStyles.flexColumn, GlobalStyles.alignCenter, GlobalStyles.ml10]}>
                      <Avatar
                        styleAvatar={{...GlobalStyles.mr3, ...GlobalStyles.mb5, ...styles.avatar}}
                        styleContainerGradient={{...GlobalStyles.mr3, ...GlobalStyles.mb5, ...styles.avatar}}
                        textStyle={{...GlobalStyles.p, ...GlobalStyles.textBoldNormal}}
                        userInfo={{
                          avatar_url: item?.attributes?.avatar_metadata?.avatar_url,
                          avatar_lat: item?.attributes?.avatar_metadata?.avatar_lat,
                          avatar_lng: item?.attributes?.avatar_metadata?.avatar_lng,
                          first_name: item?.attributes?.first_name,
                          last_name: item?.attributes?.last_name,
                        }}
                      />
                      <View style={GlobalStyles.flexColumn}>
                        <Paragraph title='First Name' style={styles.text3} />
                        <Paragraph title='Last Name' style={styles.text3} />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <TouchableOpacity style={[GlobalStyles.p5]} onPress={() => navigation.navigate(AppRoute.CHAT_KUDOS_SUCCESS)}>
            <View style={[GlobalStyles.p10, styles.btn]}>
              <Paragraph h5 bold600 textWhite textCenter title={t('send_kudos')} />
            </View>
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
