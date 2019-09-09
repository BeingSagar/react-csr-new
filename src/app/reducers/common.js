import actionTypes from '../../constants/action-types';
import { LOCAL_STORAGE_COMMON_DATA_KEY } from '../../constants/app';

let data = localStorage.getItem(LOCAL_STORAGE_COMMON_DATA_KEY);
data = data ? JSON.parse(data) : {};

const initialState = {
    isFetchingCommonData: false, data, errorPage: { showErrorPage: false, is500: false },
};
/**
 * Function which defines next state of common static data and loader status based on current action.
 *
 * @param state: state of common reducer
 * @param action: Currently dispatched action
 * @returns {*}: Next state of common reducer
 */
export default function commonReducer(state = initialState, action) {
    switch (action.type) {
    case actionTypes.common.COMMON_DATA_REQUEST:
        return {
            ...state,
            isFetchingCommonData: action.request,
        };
    case actionTypes.common.COMMON_DATA_SUCCESS:
        return {
            ...state,
            isFetchingCommonData: false,
            data: action.data,
        };
    case actionTypes.common.SHOW_500_ERROR:
        return {
            ...state,
            errorPage: {
                showErrorPage: true,
                is500: true,
            },
        };
    case actionTypes.common.SHOW_PAGE_NOT_FOUND_ERROR:
        return {
            ...state,
            errorPage: {
                showErrorPage: true,
                is500: false,
            },
        };
    case actionTypes.common.CLEAR_ERROR:
        return {
            ...state,
            errorPage: {
                showErrorPage: false,
                is500: false,
            },
        };
    default:
        return state;
    }
}
