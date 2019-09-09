import {
    LOCAL_STORAGE_USER_KEY,
    UNAUTHORISED_STATE_CODES
} from '../../constants/app';
import {
    history,
    dispatchAction
} from '../../store';
import PATHS from '../../routes/routes-path';
import errorActions from '../actions/error';


/**
 * Function to handle response returned by apis.
 *
 * @param response: Response object returned from api calls.
 */
// TODO: Do proper error handling when user is implemented
const handleResponse = response => response.text().then((text) => {
    if (response.status === 404) {
        dispatchAction(errorActions.setPageNotFoundError());
    }
    if (response.status >= 500) {
        dispatchAction(errorActions.set500Error());
    }
    const data = text && JSON.parse(text);
    if (UNAUTHORISED_STATE_CODES.indexOf(response.status) > -1) {
        localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
        history.push(PATHS.loginPage);
    }
    if (!response.ok) {
        // const error = (data && (data.message || data.non_field_errors)) || response.statusText;
        const error = (data && data.data) || data || response.statusText;
        return Promise.reject(error);
    }

    return data;
});

const handleError = (error) => {
    dispatchAction(errorActions.set500Error());
    throw error;
};

/**
 * Function to make api call with Authorization header.
 *
 * @param url: URL to which api call will be made
 * @param method: Method type for api call
 * @param data: Data which will be sent in call.
 * @param params: Query params to be passed with url
 */
const makeApiCall = (url, params = {}, method = 'GET', data) => {
    let user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
    user = user ? JSON.parse(user) : {};
    if (!user) {
        history.push(PATHS.loginPage);
    }
    const requestOptions = {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${user.token}`,
        },
    };
    if (data) {
        requestOptions.body = data;
    }
    url = new URL(url);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
    return fetch(url, requestOptions).then(handleResponse, handleError);
};

const baseService = {
    handleResponse,
    makeApiCall,
    handleError,
    // makeAuthorisedApiCall,
};

export default baseService;