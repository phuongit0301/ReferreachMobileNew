import React, {useRef} from 'react';
import {Animated, View} from 'react-native';
import {useTranslation} from 'react-i18next';

import {GlobalStyles} from '~Root/config';
import {Button} from '~Root/components';
import {ISliderListProps} from '~Root/types';
import DotIndicator from './DotIndicator';
import NextItemButton from './NextItemButton';
import SkipButton from './SkipButton';
import styles from './styles';

const Pagination: React.FC<ISliderListProps> = ({
  style,
  data,
  currentIndex,
  setCurrentIndex,
  scrollX,
  onPress = () => {},
}) => {
  const {t} = useTranslation();
  const safeData = data ?? [];
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const safeScrollX = scrollX ?? useRef(new Animated.Value(0)).current;
  const safeCurrentIndex = currentIndex ?? 0;

  return (
    <View style={[GlobalStyles.flexColumn, styles.paginationContainer, style]}>
      <View style={[GlobalStyles.flexRow, GlobalStyles.mb30, GlobalStyles.alignCenter]}>
        <View style={styles.hide} />
        <DotIndicator data={safeData} scrollX={safeScrollX} currentIndex={safeCurrentIndex} />
        <SkipButton visible={safeCurrentIndex + 1 === data?.length} onPress={onPress} />
      </View>
      {safeCurrentIndex + 1 === data?.length ? (
        <Button
          title={t('get_started')}
          h4
          textCenter
          containerStyle={{
            ...GlobalStyles.fullWidth,
            ...GlobalStyles.buttonContainerStyle,
            ...styles.buttonContainerStyle,
          }}
          textStyle={styles.textPrimary}
          onPress={onPress}
        />
      ) : (
        <NextItemButton
          data={safeData}
          percentage={Math.round((safeCurrentIndex + 1) * (100 / safeData.length))}
          setCurrentIndex={setCurrentIndex!}
          currentIndex={safeCurrentIndex}
        />
      )}
    </View>
  );
};

export default Pagination;
