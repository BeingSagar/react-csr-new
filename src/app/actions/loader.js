// eslint-disable-next-line import/no-unresolved
import actionTypes from 'AppConstants/action-types';

function show() { return { type: actionTypes.loader.SHOW_LOADER }; }
function hide() { return { type: actionTypes.loader.HIDE_LOADER }; }

export default {
    show,
    hide,
};
