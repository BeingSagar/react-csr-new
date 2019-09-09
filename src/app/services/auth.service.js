import { HmacSHA512 } from 'crypto-js';

import baseService from './base.service';
import URLS from '../../constants/api-urls';
import { SECRET_KEY } from '../../constants/app';

/**
 * Service to make api call and login using given credentials.
 *
 * @param username: Username of user trying to log in
 * @param rawPassword: Password of user trying to log in
 */
function login(username, rawPassword) {
    const password = rawPassword;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    };

    return fetch(URLS.loginUrl, requestOptions)
        .then(baseService.handleResponse, baseService.handleError);
}

/**
 * Service to log user out and mark his token invalid.
 */
function logout() {
    return baseService.makeApiCall(URLS.logoutUrl);
}

export const authService = {
    login,
    logout,
};
