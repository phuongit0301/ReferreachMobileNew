import React, {useState} from 'react';
import {View, Switch} from 'react-native';

import styles from './styles';

const ToggleSwitch = () => {
  const [switchOn, setSwitchOn] = useState(false);

  return (
    <View style={styles.container}>
      <Switch value={switchOn} onValueChange={() => setSwitchOn(!switchOn)} />
    </View>
  );
};

export default ToggleSwitch;
