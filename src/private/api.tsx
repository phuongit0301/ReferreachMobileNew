export const ROOT_MOCK_URL = 'https://5dc0bb82-26c4-4071-ba82-fc6052b8c9ca.mock.pstmn.io';
export const MOCK_USER_INFO_URL = `${ROOT_MOCK_URL}/mock/users/current`;
export const MOCK_LIST_ASK_URL = `${ROOT_MOCK_URL}/mock/users/current`;
export const MOCK_CREATE_ASK_URL = `${ROOT_MOCK_URL}/asks/currentuser`;

// export const ROOT_URL = 'https://investor-api.referreach.com/api';
export const ROOT_URL = 'https://dev-api-ls.referreach.com/v1';
export const ROOT_API_URL = 'https://dev-api-ls.referreach.com/api/v1';
export const LOGIN_URL = `${ROOT_URL}/auth/sign_in`;
export const INVITATION_URL = (invitationId: string) => `${ROOT_API_URL}/invitations/code/${invitationId}/details`;
export const GET_INVITATION_URL = `${ROOT_API_URL}/invitations`;
export const REGISTER_URL = `${ROOT_URL}/auth/`;
export const VERIFY_ACCOUNT_URL = `${ROOT_API_URL}/users/verify_email`;
export const RENEW_VERIFICATION_CODE_URL = `${ROOT_API_URL}/users/send_confirmation_token`;
export const USER_INFO_URL = `${ROOT_API_URL}/users/me`;
export const USER_AVATAR_URL = `${ROOT_API_URL}/users/avatar`;
export const INVITE_USER_CONTACT_URL = `${ROOT_API_URL}/invitations/invite_bulk_users/`;
export const USER_IN_APP_STATUS_URL = `${ROOT_API_URL}/users/update_in_app_status`;
export const ASK_LIST_URL = `${ROOT_API_URL}/asks/list`;
export const ASK_DETAILS_URL = (id: number) => `${ROOT_API_URL}/asks/${id}`;
export const GET_ALL_INDUSTRIES_URL = `${ROOT_API_URL}/autocomplete/industry`;
export const GET_ALL_LOCATION = `${ROOT_API_URL}/autocomplete/location`;
export const GET_ALL_JOB = `${ROOT_API_URL}/autocomplete/job`;
export const CREATE_ASK_URL = `${ROOT_API_URL}/asks`;
export const UPDATE_ASK_URL = (id: number) => `${ROOT_API_URL}/asks/${id}`;

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
