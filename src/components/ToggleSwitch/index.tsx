import React, {useState} from 'react';
import {View, Switch} from 'react-native';

import styles from './styles';

interface Props {
  onSwitch?: (bool: boolean) => void;
}

const ToggleSwitch: React.FC<Props> = ({onSwitch = () => {}}) => {
  const [switchOn, setSwitchOn] = useState(false);

  const onToggleSwitch = () => {
    onSwitch(!switchOn);
    setSwitchOn(!switchOn);
  };

  return (
    <View style={styles.container}>
      <Switch value={switchOn} onValueChange={onToggleSwitch} />
    </View>
  );
};

export default ToggleSwitch;
