import actionTypes from '../../constants/action-types';

export default {
    setLanguage: lang => ({
        type: actionTypes.LANG,
        payload: lang,
    }),
};
