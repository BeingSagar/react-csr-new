import { push } from 'connected-react-router';

import actionTypes from '../../constants/action-types';
import { authService } from '../services/auth.service';
import PATHS from '../../routes/routes-path';
import { LOCAL_STORAGE_USER_KEY } from '../../constants/app';
import { isEmail } from '../utils/validators';
import errorMessages from '../../constants/messages';

/**
 * Set isAuthenticating True in case of request
 */
const loginRequest = () => ({ type: actionTypes.auth.LOGIN_REQUEST });

/**
 * Set the user data as well isAuthenticating False
 * @param user: user data
 */
const loginSuccess = user => ({ type: actionTypes.auth.LOGIN_SUCCESS, user });

/**
 * Set the error in case of auth failiure
 * @param error: error
 */
const loginFailure = error => ({ type: actionTypes.auth.LOGIN_FAILURE, error });

/**
 * clear the user data and error
 */
const clearUser = () => ({ type: actionTypes.auth.CLEAR_USER });

/**
 * Action to make api call and get user info using login credentials.
 *
 * @param username Username of user trying to log in
 * @param password Password of user trying to log in
 */
const checkAuthentication = (username, password) => (dispatch) => {
    dispatch(loginRequest());
    authService.login(username, password)
        .then(
            (user) => {
                dispatch(loginSuccess(user));
                localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));
                dispatch(push(PATHS.claimListPage));
            },
            (error) => {
                dispatch(loginFailure((error && (error.message || error.non_field_errors))));
            },
        );
};

/**
 * Action to validate given username is proper email or not.
 *
 * @param username Username of user trying to log in
 */
const validateUsername = username => (dispatch) => {
    if (!isEmail(username)) {
        dispatch(loginFailure(errorMessages.INVALID_USERNAME));
    } else {
        dispatch(loginFailure(''));
    }
};

/**
 * Action to logout user and clear user data
 */
const logout = () => (dispatch) => {
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    dispatch(clearUser());
    dispatch(push(PATHS.loginPage));
};

const authActions = {
    logout,
    checkAuthentication,
    validateUsername,
    clearUser,
    loginFailure,
    loginRequest,
    loginSuccess,
};

export default authActions;
