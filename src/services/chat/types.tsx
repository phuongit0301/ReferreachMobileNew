export interface IListMatches {
  id: string;
  name: string;
  image: string;
}

export interface IPeopleToAsk {
  id: string;
  name: string;
  image: string;
  title: string;
  description?: string;
  status: string;
  count: number;
  hour: string;
}

export enum STATUS_ENUM {
  NEW_INTRO = 'New Intro',
  INTRO_UPDATE = 'Intro Update',
  ASK_ENDED = 'Ask Ended',
  FEEDBACK = 'Feedback',
}
export interface IChatState {
  errors: any;
  loading: boolean;
  success: boolean;
  listMatches: IListMatches[];
  peopleToAsks: any[];
  callback?: any;
}
