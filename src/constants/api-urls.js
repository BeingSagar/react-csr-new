const API_ROOT = process.env.API_ROOT;

const URLS = {
    // Authentication urls
    loginUrl: `${API_ROOT}/accounts/login/`,
    assignCaseUrl(climId, apiRoot = API_ROOT) {
        return `${apiRoot}/claims/claims/${climId}/assign/`;
    },
    updateStatusUrl(climId, apiRoot = API_ROOT) {
        return `${apiRoot}/claims/claims/${climId}/update-status/`;
    },
    addCommentUrl(climId, apiRoot = API_ROOT) {
        return `${apiRoot}/claims/claims/${climId}/add-comment/`;
    },
};

export default URLS;
