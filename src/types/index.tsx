import {Animated, ViewStyle} from 'react-native';
import {Source} from 'react-native-fast-image';

import {ILoadingState} from '~Root/services/loading/types';
import {ILoginState} from '~Root/services/login/types';
import {IAuthState} from '~Root/services/auth/types';
import {IUserState} from '~Root/services/user/types';
import {IContactState} from '~Root/services/contact/types';
import {IIndustryState} from '~Root/services/industry/types';
import {IRegisterState} from '~Root/services/register/types';
import {IAskState} from '~Root/services/ask/types';
import {IAskDetailsState} from '~Root/services/askDetails/types';
import {INetworkConnectionListState} from '~Root/services/network/types';
import {IChatState} from '~Root/services/chat/types';
import {IFeedItemsState} from '~Root/services/feed/types';

// Global state
export interface IGlobalState {
  loadingState: ILoadingState;
  loginState: ILoginState;
  authState: IAuthState;
  userState: IUserState;
  contactState: IContactState;
  industryState: IIndustryState;
  registerState: IRegisterState;
  askState: IAskState;
  askDetailState: IAskDetailsState;
  networkState: INetworkConnectionListState;
  chatState: IChatState;
  feedState: IFeedItemsState;
}

// Interface for async call steps
export interface IAsyncCall {
  REQUESTED: string;
  SUCCESS: string;
  FAILURE: string;
}

export interface ISetAsyncCall {
  SET: string;
}

export interface IOnAsyncCall {
  ON: string;
}
export interface IModalAsyncCall {
  SHOW: string;
  HIDE: string;
}

export interface IWaitingAsyncCall {
  SHOW: string;
  HIDE: string;
}

export interface ISliderDataSource {
  id: string;
  title: string;
  description: string;
  image: Source;
}

export interface ISliderListProps {
  style?: ViewStyle;
  scrollX?: Animated.Value;
  data?: ISliderDataSource[];
  currentIndex?: number;
  onPress?: () => void;
  setCurrentIndex?: (newIndex: number) => void;
}
