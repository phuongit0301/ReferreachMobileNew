import {FlatList, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Paragraph} from '~Root/components';
import {GlobalStyles} from '~Root/config';
import styles from './styles';

interface Props {
  data?: string[];
  setText: (item: string) => void;
  textDefault?: string;
}

const AskGreeting: React.FC<Props> = ({data, setText, textDefault = ''}) => {
  const renderItem = ({item}: {item: string}) => {
    return (
      <TouchableOpacity
        onPress={() => setText(item)}
        style={[GlobalStyles.mh10, GlobalStyles.ph10, GlobalStyles.pv5, GlobalStyles.mb10, textDefault === item ? styles.btnGreetingsSelected : styles.btnGreetings]}>
        <Paragraph p textSteelBlue2Color bold600 title={item} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[GlobalStyles.mh20, GlobalStyles.container, GlobalStyles.pv15, styles.borderTop]}>
      <FlatList
        contentContainerStyle={[GlobalStyles.flexRow, GlobalStyles.flexWrap, GlobalStyles.container]}
        style={[GlobalStyles.flexRow, GlobalStyles.flexWrap]}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `greeting-suggest-${index}`}
        keyboardShouldPersistTaps='handled'
      />
    </View>
  );
};

export default AskGreeting;
