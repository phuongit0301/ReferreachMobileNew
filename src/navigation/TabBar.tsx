import React, {useState} from 'react';
import {View, TouchableOpacity, Dimensions, Animated} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {BASE_COLORS} from '~Root/config';
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
          let iconName: string;

          if (options.tabBarLabel !== undefined) {
            label = options.tabBarLabel;
          } else {
            label = options.title !== undefined ? options.title : route.name;
          }

          switch (label) {
            case AppRoute.HOME:
              iconName = 'user-circle';
              break;
            case AppRoute.CHAT:
              iconName = 'comment-alt';
              break;
            case AppRoute.AIR_FEED:
              iconName = 'fire';
              break;
            default:
              iconName = 'home';
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

          // const onLongPress = () => {
          //   navigation.emit({
          //     type: 'tabLongPress',
          //     target: route.key,
          //   });
          // };

          return (
            <TouchableOpacity
              accessibilityRole='button'
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              // onLongPress={onLongPress}
              style={styles.tabArea}
              key={index}>
              <Icon
                name={iconName}
                size={20}
                color={`${isFocused ? BASE_COLORS.primary : BASE_COLORS.greyColor}`}
                style={styles.mt10}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default TabBar;
