import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {Trans} from 'react-i18next';

import {ModalDialogCommon, UserReferBlockItems} from '~Root/components';
import {IFeedInfoState} from '~Root/services/feed/types';
import {IUserState} from '~Root/services/user/types';
import {GlobalStyles} from '~Root/config';
import styles from './styles';

interface Props {
  userState: IUserState;
  visibleModal: boolean;
  isDefault: boolean;
  textSearch: string;
  dataTrustNetwork: any;
  onInputChange: (text: string) => void;
  onSelect: (item: IFeedInfoState) => void;
  onVisibleModal: () => void;
}

const ModalDialogRefer: React.FC<Props> = ({
  userState,
  visibleModal = false,
  isDefault = false,
  textSearch = '',
  dataTrustNetwork,
  onVisibleModal = () => {},
  onSelect = () => {},
  onInputChange = () => {},
}) => {
  return (
    <ModalDialogCommon
      isVisible={visibleModal}
      onHideModal={onVisibleModal}
      isDefault={isDefault}
      styleContainer={GlobalStyles.pb0}
      styleModal={GlobalStyles.styleModalSecond}
      styleModalContainer={GlobalStyles.styleModalContainer}>
      <View style={GlobalStyles.pv20}>
        <View style={[GlobalStyles.modalHeader, styles.modalHeader]}>
          <Trans
            i18nKey='you_like_to'
            values={{name: userState?.profile?.user?.user_profile?.first_name}}
            parent={Text}
            components={{
              highlight: <Text style={[GlobalStyles.p, GlobalStyles.textTealBlueHighlight]} />,
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput placeholder='Search' value={textSearch} style={styles.input} onChangeText={onInputChange} />
        </View>
        {dataTrustNetwork && <UserReferBlockItems data={dataTrustNetwork} onProfile={onSelect} />}
      </View>
    </ModalDialogCommon>
  );
};

export default ModalDialogRefer;
