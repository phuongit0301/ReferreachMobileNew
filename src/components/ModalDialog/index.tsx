import React from 'react';
import {View, TouchableOpacity, TextInput, FlatList} from 'react-native';
import Modal from 'react-native-modal';

import {ButtonSecond, Icon, Category, Paragraph} from '~Root/components';
import {BASE_COLORS, GlobalStyles} from '~Root/config';
import {IIndustry, IIndustrySave} from '~Root/services/industry/types';

import styles from './styles';

interface Props {
  isVisible: boolean;
  onSelect: (item: IIndustry | IIndustrySave) => void;
  onClose: (index: number) => void;
  onSave: () => void;
  onInputChange: (text: string) => void;
  onHideModal: () => void;
  onAdd: (item: IIndustry | IIndustrySave) => void;
  data?: IIndustry[] | IIndustrySave[];
  dataSelected?: IIndustry[] | IIndustrySave[];
  textSearch?: string;
  title?: string;
}

const ModalDialog: React.FC<Props> = ({
  isVisible,
  onSelect,
  onClose,
  onSave,
  onInputChange,
  onHideModal,
  onAdd,
  data = [],
  dataSelected,
  textSearch,
  title,
}) => {
  const renderItem = ({item, index}: {item: IIndustry | IIndustrySave; index: number}) => {
    return typeof item === 'object' ? (
      <View key={`item-${index}`} style={styles.itemContainer}>
        <TouchableOpacity onPress={() => onSelect(item)} style={styles.item}>
          <Paragraph h5 textBlack title={item?.attributes?.display_value} />
        </TouchableOpacity>
      </View>
    ) : (
      <View key={`item-${index}`} style={styles.itemContainer}>
        <TouchableOpacity onPress={() => onSelect(item)} style={styles.item}>
          <Paragraph h5 textBlack title={item} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        onBackdropPress={onHideModal}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        useNativeDriver={true}
        hideModalContentWhileAnimating={true}>
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
            keyExtractor={(item, index) => `grid-${index}`}
            renderItem={renderItem}
          />
          <View style={styles.btnAddContainer}>
            <TouchableOpacity
              style={styles.btnAdd}
              onPress={() => textSearch && onAdd(textSearch)}
              disabled={textSearch === ''}>
              <Icon name='plus' size={12} color={BASE_COLORS.gunmetalColor} style={GlobalStyles.mr10} />
              <Paragraph h5 title={`Add as ${textSearch ?? ''} new industry`} style={styles.textBtnAdd} />
            </TouchableOpacity>
          </View>
          <View style={styles.selectedContainer}>
            {dataSelected && dataSelected?.length > 0 && (
              <View style={styles.tagContainer}>
                {dataSelected.map((item: IIndustry | IIndustrySave, index: number) =>
                  typeof item === 'object' ? (
                    <Category
                      key={`selected-${index}`}
                      itemKey={item?.id}
                      name={item?.name ?? item?.attributes?.display_value}
                      showButton={true}
                      onPress={() => onClose(index)}
                    />
                  ) : (
                    <Category
                      key={`selected-${index}`}
                      itemKey={`${index}`}
                      name={item}
                      showButton={true}
                      onPress={() => onClose(index)}
                    />
                  ),
                )}
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

export default ModalDialog;
