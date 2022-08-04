import React from 'react';
import {TouchableOpacity, View} from 'react-native';

import {Paragraph} from '~Root/components';

import styles from './styles';

const TabBar = ({tabs, style, goToPage, activeTab}: any) => {
  return (
    <View style={[styles.tabs, style]}>
      {tabs.map((tab: number, i: number) => {
        return (
          <TouchableOpacity
            key={tab}
            onPress={() => goToPage(i)}
            style={[styles.tab, activeTab === i && styles.tabActive]}>
            <Paragraph title={`${tab}`} style={[styles.tabIcon, activeTab === i && styles.tabIconActive]} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;
