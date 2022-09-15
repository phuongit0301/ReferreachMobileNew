import React from 'react';
import {Text, View} from 'react-native';

import styles from './styles';

interface Props {
  tag: string;
}

const TrustNetworkTag = ({tag}: Props) => {
  if (!tag) return null;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{tag}</Text>
    </View>
  );
};

export default TrustNetworkTag;
