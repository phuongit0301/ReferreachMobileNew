export enum LOGIN_KEYS {
  email = 'email',
  password = 'password',
}

export const LOGIN_FIELDS = {
  email: 'email',
  password: 'password',
};

export enum REGISTER_KEYS {
  first_name = 'first_name',
  last_name = 'last_name',
  email = 'email',
  password = 'password',
  password_confirmation = 'password_confirmation',
}

export const REGISTER_FIELDS = {
  first_name: 'first_name',
  last_name: 'last_name',
  email: 'email',
  password: 'password',
  password_confirmation: 'password_confirmation',
};

export enum RESET_PASSWORD_KEYS {
  password = 'password',
  confirm_password = 'confirm_password',
}

export const RESET_PASSWORD_FIELDS = {
  password: 'password',
  confirm_password: 'confirm_password',
};

export enum INVITE_CODE_KEYS {
  inviteCode = 'invite_code',
}

export const INVITE_CODE_FIELDS = {
  inviteCode: 'invite_code',
};

export enum INVITE_CONTACT_KEYS {
  name = 'name',
  email = 'email',
}

export const INVITE_CONTACT_FIELDS = {
  name: 'name',
  email: 'email',
};

export const TRUST_NETWORK_FIELDS = {
  inviteCode: 'invite_code',
};

export enum CREATE_ASK_KEYS {
  greeting = 'greeting',
  userRole = 'user_role',
  demographic = 'demographic',
  businessRequirement = 'business_requirement',
  businessDetail = 'business_requirement',
  location = 'location',
  deadline = 'deadline',
  criteria1 = 'criteria1',
  criteria2 = 'criteria2',
  criteria3 = 'criteria3',
  criteria4 = 'criteria4',
  criteria5 = 'criteria5',
  additiondalDetail = 'additional_detail',
}

export const CREATE_ASK_FIELDS = {
  greeting: 'greeting',
  userRole: 'user_role',
  businessDetail: 'business_detail',
  demographic: 'demographic',
  businessRequirement: 'business_requirement',
  location: 'location',
  deadline: 'deadline',
  criteria: 'criteria',
  criteria0: 'criteria0',
  criteria1: 'criteria1',
  criteria2: 'criteria2',
  criteria3: 'criteria3',
  criteria4: 'criteria4',
  criteria5: 'criteria5',
  additiondalDetail: 'additional_detail',
};

export enum PROFILE_KEYS {
  first_name = 'first_name',
  last_name = 'last_name',
  title = 'title',
  pitch = 'pitch',
}

export const PROFILE_FIELDS = {
  first_name: 'first_name',
  last_name: 'last_name',
  title: 'title',
  pitch: 'pitch',
};

export const TABS = {
  ask: 'ask',
  trustNetwork: 'trustNetwork',
};

export const FEED_BACK_FIELDS = {
  responderFeedback: 'responderFeedback',
  introducerFeedback: 'introducerFeedback',
};

export const MESSAGE_FIELDS = {
  individualMessage: 'message_for_asker',
  individualJoint: 'message_for_introducee',
};

export enum MESSAGE_KEYS {
  individualMessage = 'message_for_asker',
  individualJoint = 'message_for_introducee',
}

export const REPORT_FIELDS = {
  report: 'report',
};
