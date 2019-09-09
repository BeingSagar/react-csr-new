import queryString from 'query-string';

export const addUrlParams = (url, paramDict) => {
    Object.keys(paramDict).forEach(key => {
        if (!paramDict[key]) {
            delete paramDict[key];
        }
    });
    return `${url}?${queryString.stringify(paramDict)}`;
};

export const updateFilterParams = (history, paramDict) => {
    const { location: { pathname } } = history;
    return history.push(addUrlParams(pathname, paramDict));
};

/**
 * Return error message based on the type of errors
 * @param {*} errors
 * @param {*} fieldName
 */
export const getErrorMessage = (errors, fieldName) => {
    if (errors) {
        if (typeof errors === 'object') {
            if (Array.isArray(errors)) {
                return errors.join();
            } else if (errors[fieldName]) {
                return errors[fieldName];
            }
        } else if (typeof errors === 'string') {
            return errors;
        }
    }
    return null;
};
