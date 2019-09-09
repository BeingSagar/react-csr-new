import actionTypes from '../../constants/action-types';
import { LOCAL_STORAGE_USER_KEY } from '../../constants/app';

let user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
user = user === undefined ? {} : JSON.parse(user);

const initialState = { error: null, user, isAuthenticating: false };
/**
 * Function which defines next state of login form based on current action.
 *
 * @param state: state of Login form
 * @param action: Currently dispatched action
 * @returns {*}: Next state of Login form
 */
export default function authenticationReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.auth.LOGIN_REQUEST:
        return {
            ...state,
            isAuthenticating: true,
        };
    case actionTypes.auth.LOGIN_SUCCESS:
        return {
            ...state,
            user: action.user,
            isAuthenticating: false,
        };
    case actionTypes.auth.LOGIN_FAILURE:
        return {
            ...state,
            error: action.error,
            isAuthenticating: false,
        };
    case actionTypes.auth.CLEAR_USER:
        return {
            ...state,
            error: null,
            user: {},
        };
    default:
        return state;
    }
}
