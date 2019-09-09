import { push, replace, goBack } from 'connected-react-router';

import actionTypes from 'AppConstants/action-types';
import { LOCAL_STORAGE_COMMON_DATA_KEY, REFRESH_COMMON_DATA_TIME } from 'AppConstants/app';
import claimService from 'AppServices/claim.service';

/**
 * Action to set the common data that is used across multiple pages
 * @param data: Data that is supposed to be used across multiple apps
 */
const setCommonData = data => ({ type: actionTypes.common.COMMON_DATA_SUCCESS, data });

/**
 * Action to set the request for fetching common Data
 * @param {bool} request: request flag
 */
const commonDataRequest = (request) => ({ type: actionTypes.common.COMMON_DATA_REQUEST, request });

/**
 * Action to fetch common data from local storage if it has not reached the expiry date
 *  else fetch the data from the api and set it in local storage and redux store
 */
const getCommonData = () => (dispatch) => {
    let commonData = localStorage.getItem(LOCAL_STORAGE_COMMON_DATA_KEY);
    if (commonData) {
        commonData = JSON.parse(commonData);
    }
    if (!commonData || (commonData.expiryTime && commonData.expiryTime <= new Date())) {
        dispatch(commonDataRequest(true));
        claimService.getStaticClaimData().then(
            (data) => {
                const commonLocalData = data;
                let expiryTime = new Date();
                expiryTime = expiryTime.setDate(expiryTime.getDate() + REFRESH_COMMON_DATA_TIME);
                commonLocalData.expiryTime = expiryTime;
                dispatch(setCommonData(commonLocalData));
                localStorage.setItem(LOCAL_STORAGE_COMMON_DATA_KEY, JSON.stringify(commonLocalData));
            },
            () => {
                dispatch(commonDataRequest(false));
            },
        );
    }
};

/**
 * Action to redirect to a provided URL
 * @param url: URL to be pushed
 * @param state state to be pushed
 */
const redirectAction = (url, state) => (dispatch) => {
    dispatch(push(url, state));
};

/**
 * Action to reset the current url object in the history
 * @param url: URL to be replaced
 * @param state: state to be replaced
 */
const replaceAction = (url, state) => (dispatch) => {
    dispatch(replace(url, state));
};

/**
 * Action to go back to the previous page
 */
const goBackAction = () => (dispatch) => {
    dispatch(goBack());
};

const commonActions = {
    setCommonData,
    getCommonData,
    redirectAction,
    replaceAction,
    goBackAction,
    commonDataRequest,
};

export default commonActions;
