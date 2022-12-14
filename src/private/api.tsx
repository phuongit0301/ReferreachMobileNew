export const ROOT_MOCK_URL = 'https://5dc0bb82-26c4-4071-ba82-fc6052b8c9ca.mock.pstmn.io';
export const MOCK_USER_INFO_URL = `${ROOT_MOCK_URL}/mock/users/current`;
export const MOCK_LIST_ASK_URL = `${ROOT_MOCK_URL}/mock/users/current`;
export const MOCK_CREATE_ASK_URL = `${ROOT_MOCK_URL}/asks/currentuser`;

export const DEEP_LINK_URL = 'https://app.referreach.com';
export const ROOT_URL = 'https://dev-api-ls.referreach.com/v1';
export const ROOT_API_URL = 'https://dev-api-ls.referreach.com/api/v1';
export const LOGIN_URL = `${ROOT_URL}/auth/sign_in`;
export const INVITATION_URL = (invitationId: string) => `${ROOT_API_URL}/invitations/code/${invitationId}/details`;
export const GET_INVITATION_URL = `${ROOT_API_URL}/invitations`;
export const REJECT_INVITATION_URL = (invitationCode: string) =>
  `${ROOT_API_URL}/invitations/process_reject?invitation_code=${invitationCode}`;
export const REGISTER_URL = `${ROOT_URL}/auth/`;
export const VERIFY_ACCOUNT_URL = `${ROOT_API_URL}/users/verify_email`;
export const RENEW_VERIFICATION_CODE_URL = `${ROOT_API_URL}/users/send_confirmation_token`;
export const USER_INFO_URL = `${ROOT_API_URL}/users/me`;
export const USER_AVATAR_URL = `${ROOT_API_URL}/users/avatar`;
export const INVITE_USER_CONTACT_URL = `${ROOT_API_URL}/invitations/invite_bulk_users/`;
export const USER_IN_APP_STATUS_URL = `${ROOT_API_URL}/users/update_in_app_status`;
export const ASK_LIST_URL = `${ROOT_API_URL}/asks/list`;
export const ASK_RESPONDER_URL = (id: string) => `${ROOT_API_URL}/asks/${id}/responders`;
export const ASK_DETAILS_URL = (id: number) => `${ROOT_API_URL}/asks/${id}`;
export const GET_ALL_INDUSTRIES_URL = `${ROOT_API_URL}/autocomplete/industry`;
export const GET_ALL_LOCATION = `${ROOT_API_URL}/autocomplete/location`;
export const GET_ALL_JOB = `${ROOT_API_URL}/autocomplete/job`;
export const CREATE_ASK_URL = `${ROOT_API_URL}/asks`;
export const GET_ASK_DETAILS_URL = (id: number) => `${ROOT_API_URL}/asks/${id}`;
export const UPDATE_ASK_URL = (id: number) => `${ROOT_API_URL}/asks/${id}`;
export const NETWORK_CONNECTION_LIST_URL = `${ROOT_API_URL}/network_connections/list`;
export const REMOVE_NETWORK_CONNECTION_URL = (id: string) => `${ROOT_API_URL}/network_connections/${id}`;
export const FEED_ITEMS_LIST_URL = (page: number) => `${ROOT_API_URL}/feed_items?page=${page}`;
export const SUGGEST_INTRODUCTIONS_LIST_URL = `${ROOT_API_URL}/network_connections/suggest_introductions`;
export const SET_FEED_ITEM_READ_URL = (id: number) => `${ROOT_API_URL}/feed_items/${id}/read`;
export const GET_PUBLIC_PROFILE_URL = (id: number) => `${ROOT_API_URL}/users/${id}/details`;
export const FORGOT_PASSWORD_URL = `${ROOT_API_URL}/reset_passwords/send_request`;
export const CREATE_INTRODUCTION_URL = `${ROOT_API_URL}/introductions`;
export const CHAT_CONTEXT_URL = (contextId: string) => `${ROOT_API_URL}/chat_contexts/${contextId}`;
export const CHAT_PERSONAL_URL = `${ROOT_API_URL}/chat_feeds/personal_list`;
export const CHAT_FEED_URL = `${ROOT_API_URL}/chat_feeds/ask_list`;
export const USER_CHAT_LIST_URL = `${ROOT_API_URL}/chat_feeds/suggest_users_chat_list`;
export const GET_CRENDENTIAL_URL = `${ROOT_API_URL}/pubnubs/credentials`;
export const ON_PIN_URL = (pinnableId: string) => `${ROOT_API_URL}/chat_feeds/${pinnableId}/pin`;
export const ON_UN_PIN_URL = (pinnableId: string) => `${ROOT_API_URL}/chat_feeds/${pinnableId}/unpin`;
export const ON_UPDATE_EXTEND_DEADLINE_URL = (askId: string, dateTime: string) =>
  `${ROOT_API_URL}/asks/${askId}/extend_deadline?new_deadline=${dateTime}`;
export const ON_CHAT_ONE_ON_ONE_URL = `${ROOT_API_URL}/chat_contexts/ooo`;
export const ON_UPDATE_CHAT_CONTEXT_URL = (chatContextId: string) => `${ROOT_API_URL}/chat_contexts/${chatContextId}`;
export const ON_END_ASK_URL = (askId: string) => `${ROOT_API_URL}/asks/${askId}/close_ask`;
export const ON_SEND_KUDOS_URL = (askId: string) => `${ROOT_API_URL}/asks/${askId}/end_ask`;
export const GET_MASS_INVITATION_LIST_URL = `${ROOT_API_URL}/mass_invitation_codes/list`;
export const ON_MASS_INVITATION_URL = `${ROOT_API_URL}/mass_invitation_codes`;

export const ASK_TEMPLATE_URL = `${ROOT_API_URL}/ask-template`;
export const CREATE_ASK_TEMPLATE_URL = (id: string) => `${ROOT_API_URL}/ask-template/${id}/submissions`;
export const UPDATE_ASK_TEMPLATE_URL = (id: string) => `${ROOT_API_URL}/asks/${id}`;
export const GET_ASK_LINK_URL = (id: string) => `${ROOT_API_URL}/asks/public_links/${id}`;
export const MATCHES_URL = `${ROOT_API_URL}/matches/currentuser`;
// export const ASK_TEMPLATE_SUBMISSIONS_URL = `${ROOT_API_URL}/ask-template-submission`;
export const ASK_TEMPLATE_SUBMISSIONS_URL = `${ROOT_API_URL}/asks/my`;
export const ASK_TRUST_NETWORK_URL = `${ROOT_API_URL}/trust-network`;
// export const ASK_TEMPLATE_BY_REF_ID_URL = (id: string) => `${ROOT_API_URL}/ask-template-submission/reference_id/${id}`;
export const ASK_TEMPLATE_BY_REF_ID_URL = (id: string) => `${ROOT_API_URL}/asks/${id}`;
export const GET_ALL_ASK_URL = `${ROOT_API_URL}/asks`;
export const GET_TAGS_URL = `${ROOT_API_URL}/tags`;
export const GET_ASK_INTRODUCER_URL = (id: number) => `${ROOT_API_URL}/asks/${id}/introducers`;
export const GET_ASK_RESPONDER_URL = (id: number) => `${ROOT_API_URL}/asks/${id}/responders`;
export const CREATE_FEEDBACK_URL = `${ROOT_API_URL}/feedbacks`;
export const MAKE_INTRODUCTIONS_URL = (id: number) => `${ROOT_API_URL}/asks/${id}/introductions`;
