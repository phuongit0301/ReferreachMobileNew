import React, {useState} from 'react';
import {View, TouchableOpacity, Dimensions, Animated, Image} from 'react-native';
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

          if (options.tabBarLabel !== undefined) {
            label = options.tabBarLabel;
          } else {
            label = options.title !== undefined ? options.title : route.name;
          }

          switch (label) {
            case AppRoute.YOUR_ASK:
              iconName = <Image source={IMAGES.iconYourAsk} resizeMode='cover' style={styles.iconYourAsk} />;
              title = 'Your Ask';
              break;
            case AppRoute.AIR_FEED:
              iconName = <Image source={IMAGES.iconAIRFeed} resizeMode='cover' style={styles.iconAirFeed} />;
              title = 'Air Feed';
              break;
            case AppRoute.ASK:
            case AppRoute.MAIN_NAVIGATOR:
              iconName = <Image source={IMAGES.iconAsk} resizeMode='cover' style={styles.iconAsk} />;
              title = 'Ask';
              break;
            case AppRoute.TRUST_NETWORK:
              iconName = <Image source={IMAGES.iconTrustNetwork} resizeMode='cover' style={styles.iconTrustNetWork} />;
              title = 'Trust';
              break;
            case AppRoute.CHAT:
              iconName = <Image source={IMAGES.iconChat} resizeMode='cover' style={styles.iconChat} />;
              title = 'Chat';
              break;
            default:
              iconName = <Image source={IMAGES.iconYourAsk} resizeMode='cover' style={styles.iconYourAsk} />;
              title = 'Your Ask';
              break;
          }

          const isFocused = state.index === index;
          const onPress = () => {
            Animated.spring(translateValue, {
              toValue: index * tabWidth,
              velocity: 10,
              useNativeDriver: true,
            }).start();
            if (!isFocused) {
              navigation.navigate(route.name);
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
                {isFocused ? (
                  <View style={[GlobalStyles.pv5, GlobalStyles.ph10, styles.iconActive]}>{iconName}</View>
                ) : (
                  <View style={[GlobalStyles.pv5, GlobalStyles.ph10, styles.icons]}>{iconName}</View>
                )}
              </View>
              <Paragraph textSilverChaliceColor title={title} style={GlobalStyles.mt3} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
