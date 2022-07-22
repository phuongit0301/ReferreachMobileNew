import React, {useState} from 'react';
import {View, TouchableOpacity, Dimensions, Animated} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Paragraph} from '~Root/components';

import {GlobalStyles, IMAGES} from '~Root/config';
import {AppRoute} from './AppRoute';

import styles from './styles';

const TabBar = ({state, descriptors, navigation}: any) => {
  const totalWidth = Dimensions.get('window').width;
  const tabWidth = totalWidth / state.routes.length;
  const [translateValue] = useState(new Animated.Value(0));

  return (
    <View style={[styles.tabContainer, {width: totalWidth}]}>
      <View style={styles.tabBarRow}>
        <Animated.View
          style={[
            styles.slider,
            {
              transform: [{translateX: translateValue}],
              width: tabWidth - 20,
            },
          ]}
        />
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];

          let label;
          let iconName: any;
          let title;
          let isCreateAsk = false;

          if (options.tabBarLabel !== undefined) {
            label = options.tabBarLabel;
          } else {
            label = options.title !== undefined ? options.title : route.name;
          }

          const isFocused = state.index === index;

          switch (label) {
            case AppRoute.YOUR_ASK:
              iconName = isFocused ? (
                <FastImage source={IMAGES.iconYourAskActive} resizeMode='cover' style={styles.iconYourAsk} />
              ) : (
                <FastImage source={IMAGES.iconYourAsk} resizeMode='cover' style={styles.iconYourAsk} />
              );
              title = 'Your Ask';
              break;
            case AppRoute.AIR_FEED_NAVIGATOR:
              iconName = isFocused ? (
                <FastImage source={IMAGES.iconAIRFeedActive} resizeMode='cover' style={styles.iconAirFeed} />
              ) : (
                <FastImage source={IMAGES.iconAIRFeed} resizeMode='cover' style={styles.iconAirFeed} />
              );
              title = 'Air Feed';
              break;
            case AppRoute.ASK:
            case AppRoute.MAIN_NAVIGATOR:
              iconName = <FastImage source={IMAGES.iconAsk} resizeMode='cover' style={styles.iconAsk} />;
              title = 'Ask';
              isCreateAsk = true;
              break;
            case AppRoute.TRUST_NETWORK:
              iconName = isFocused ? (
                <FastImage source={IMAGES.iconTrustNetworkActive} resizeMode='cover' style={styles.iconTrustNetWork} />
              ) : (
                <FastImage source={IMAGES.iconTrustNetwork} resizeMode='cover' style={styles.iconTrustNetWork} />
              );
              title = 'Trust';
              break;
            case AppRoute.CHAT_NAVIGATOR:
              iconName = isFocused ? (
                <FastImage source={IMAGES.iconChatActive} resizeMode='cover' style={styles.iconChat} />
              ) : (
                <FastImage source={IMAGES.iconChat} resizeMode='cover' style={styles.iconChat} />
              );
              title = 'Chat';
              break;
            default:
              iconName = isFocused ? (
                <FastImage source={IMAGES.iconYourAskActive} resizeMode='cover' style={styles.iconYourAsk} />
              ) : (
                <FastImage source={IMAGES.iconYourAsk} resizeMode='cover' style={styles.iconYourAsk} />
              );
              title = 'Your Ask';
              break;
          }

          const onPress = () => {
            Animated.spring(translateValue, {
              toValue: index * tabWidth,
              velocity: 10,
              useNativeDriver: true,
            }).start();
            if (!isFocused) {
              route?.name === AppRoute.MAIN_NAVIGATOR
                ? navigation.navigate(AppRoute.ASK_NAVIGATOR)
                : navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole='button'
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabArea}
              key={index}>
              <View style={styles.iconContainer}>
                {isCreateAsk ? (
                  <View style={[GlobalStyles.pv5, GlobalStyles.ph10, styles.iconActive]}>{iconName}</View>
                ) : isFocused ? (
                  <View style={[GlobalStyles.pv5, GlobalStyles.ph10, styles.iconActiveBackground]}>{iconName}</View>
                ) : (
                  <View style={[GlobalStyles.pv5, GlobalStyles.ph10, styles.icons]}>{iconName}</View>
                )}
              </View>
              {isFocused ? (
                <Paragraph textSteelBlue2Color bold600 title={title} style={GlobalStyles.mt3} />
              ) : (
                <Paragraph textSilverChaliceColor bold600 title={title} style={GlobalStyles.mt3} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
