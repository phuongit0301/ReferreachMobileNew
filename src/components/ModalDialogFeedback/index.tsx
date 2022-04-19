import React from 'react';
import {View, TouchableOpacity, TextInput, FlatList} from 'react-native';
import Modal from 'react-native-modal';

import {ButtonSecond, Icon, Category, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';

import styles from './styles';

interface Props {
  isVisible: boolean;
  onSelect: (item: string) => void;
  onRemove: (index: number) => void;
  onSave: () => void;
  onInputChange: (text: string) => void;
  onHideModal: () => void;
  onAdd: (item: string) => void;
  data?: any;
  dataSelected?: string[];
  textSearch?: string;
  title?: string;
}

const ModalDialogFeedback: React.FC<Props> = ({
  isVisible,
  onSelect,
  onRemove,
  onSave,
  onInputChange,
  onHideModal,
  onAdd,
  data = [],
  dataSelected,
  textSearch,
  title,
}) => {
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onHideModal}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}
        style={styles.modalContainer}>
        <View style={[styles.container, styles.modal]}>
          <Paragraph h5 bold style={styles.title} title={title} />
          <View style={styles.inputContainer}>
            <Icon name='search' color={BASE_COLORS.oxleyColor} size={20} style={styles.iconSearch} />
            <TextInput placeholder='Search' value={textSearch} style={styles.input} onChangeText={onInputChange} />
          </View>
          <FlatList
            style={styles.listItemContainer}
            contentContainerStyle={styles.listContainer}
            nestedScrollEnabled={true}
            scrollEventThrottle={1}
            showsVerticalScrollIndicator={true}
            data={data}
            numColumns={1}
            key={'grid'}
            keyExtractor={(item, index) => `grid-feedback-${index}`}
            renderItem={({item, index}: {item: any; index: number}) => (
              <View style={styles.itemContainer}>
                <TouchableOpacity
                  onPress={() => onSelect(item)}
                  style={styles.item}
                  disabled={dataSelected && dataSelected.length > 4}>
                  <Paragraph h5 textBlack title={item} />
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.btnAddContainer}>
            <TouchableOpacity
              style={styles.btnAdd}
              onPress={() => textSearch && onAdd(textSearch)}
              disabled={textSearch === '' || (dataSelected && dataSelected.length > 4)}>
              <Icon name='plus' size={12} color={BASE_COLORS.gunmetalColor} style={GlobalStyles.mr10} />
              <Paragraph h5 title={`Add as ${textSearch ?? ''} new tag`} style={styles.textBtnAdd} />
            </TouchableOpacity>
          </View>
          <View style={styles.selectedContainer}>
            {dataSelected && dataSelected.length > 0 && (
              <View style={styles.tagContainer}>
                {dataSelected.map((item: any, index: number) => (
                  <Category
                    key={`selected-${index}`}
                    itemKey={`tag-selected-${index}`}
                    name={item}
                    showButton={true}
                    onPress={() => onRemove(index)}
                  />
                ))}
              </View>
            )}
            <ButtonSecond
              title='Done'
              buttonContainerStyle={styles.btnDone}
              titleStyle={styles.titleStyle}
              onPress={onSave}
              showIcon={false}
              disabled={!((dataSelected && dataSelected.length > 0) || textSearch)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ModalDialogFeedback;
