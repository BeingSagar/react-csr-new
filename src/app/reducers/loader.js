/* eslint indent: 0 *///
// eslint-disable-next-line import/no-unresolved
import actionTypes from '../../constants/action-types';

const initialState = { showLoader: false };

/**
 * Function which defines next state of loader component
 *
 * @param state: state of Loader component
 * @param action: Currently dispatched action
 * @returns {*}: Next state of Loader
 */
export default function loaderReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.loader.SHOW_LOADER:
            return {
                showLoader: true,
            };
        case actionTypes.loader.HIDE_LOADER:
            return {
                showLoader: false,
            };
        default:
            return state;
    }
}
