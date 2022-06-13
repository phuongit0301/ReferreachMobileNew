import {Text, View} from 'react-native';
import React from 'react';

interface Props {
    inputDynamic: 
}

const Criteria = ({
    inputDynamic
}) => {
  return (
    <View>
    {inputDynamic.items.length > 0 &&
      inputDynamic.items.map((item, index) => (
        <InputIconValidate
          label={`${t('criteria')} ${index + 1}`}
          inputStyleWrapper={styles.inputDynamicContainer}
          labelStyle={styles.labelStyle}
          selectionColor={BASE_COLORS.blackColor}
          placeholderTextColor={BASE_COLORS.grayColor}
          placeholder={`${t('criteria')} ${index + 1}`}
          errors={errors}
          control={control}
          name={CREATE_ASK_FIELDS[`criteria${index + 1}`]}
          register={register}
          showIcon={true}
          isIconImage={true}
          uri={IMAGES.iconSubtract}
          imageStyleContainer={styles.iconContainer}
          styleContainer={GlobalStyles.mb5}
          imageStyle={styles.iconSubtract}
          onIconClick={() => onRemoveInput(index)}
          errorStyle={GlobalStyles.mt0}
          key={`edit-ask-criteria-${index + 1}`}
        />
      ))}
    <TouchableOpacity onPress={onAddInput}>
      <Paragraph textForestGreen2Color bold600 title='+ Add New Criteria' style={styles.btnAdd} />
    </TouchableOpacity>
  </View>
  );
};

export default Criteria;
