import React from 'react';

import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import authActions from '../../../actions/authentication';
import LoginForm from '../../../scenes/Accounts/Login';
import BaseLayout from '../../../../layouts/BaseLayout';

const LoginPage = (props) => {
    console.log("XYZ 1 In login scenes");
    const {
        error, checkAuthentication, validateUsername, isAuthenticating,
    } = props;

    return (
        <BaseLayout>
            <LoginForm
                error={error}
                checkAuthentication={checkAuthentication}
                validateUsername={validateUsername}
                isAuthenticating={isAuthenticating}
            />
        </BaseLayout>
    );
};

const mapStateToProps = state => ({
    error: state.authenticationReducer.error,
    isAuthenticating: state.authenticationReducer.isAuthenticating,
});

const mapDispatchToProps = dispatch => ({
    /**
     * Function to make api call and get user info using login credentials.
     *
     * @param username Username of user trying to log in
     * @param password Password of user trying to log in
     */
    checkAuthentication: (username, password) => {
        dispatch(authActions.checkAuthentication(username, password));
    },
    /**
     * Function to validate given username is proper email or not.
     *
     * @param username Username of user trying to log in
     */
    validateUsername: (username) => {
        dispatch(authActions.validateUsername(username));
    },
});

LoginPage.defaultProps = {
    error: null,
    isAuthenticating: false,
};

LoginPage.propTypes = {
    checkAuthentication: PropTypes.func.isRequired,
    validateUsername: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    isAuthenticating: PropTypes.bool,
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
