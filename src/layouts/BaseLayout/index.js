import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import isEmpty from 'lodash/isEmpty';

import Header from '../../app/components/Header';
import Menu from '../../app/components/Menu';
import ErrorPage from '../../app/components/ErrorPage';
import errorActions from '../../app/actions/error';
import authActions from '../../app/actions/authentication';
import { LOCAL_STORAGE_USER_KEY } from '../../constants/app';

const BaseLayout = (props) => {
    const {children, errorPage, clearError, logout, user,} = props;
    const localUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    const isAuthenticated = localUser && !isEmpty(user);
    console.log("XYZ 2 in base layout compo");
    return (
        <div className="d-flex flex-wrap min-vh-100">
            {isAuthenticated && <Header user={user} />}
            <div className={`main-content ${!isAuthenticated && 'm-0 p-0'}`}>
                {
                    isAuthenticated &&
                        <Menu logout={logout} />
                }
                {errorPage && errorPage.showErrorPage ?
                    <ErrorPage clearError={clearError} is500={errorPage.is500} /> : children}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    errorPage: state.commonReducer.errorPage,
    user: state.authenticationReducer.user,
});

const mapDispatchToProps = dispatch => ({
    clearError: () => dispatch(errorActions.clearError()),
    logout: () => dispatch(authActions.logout())
});

BaseLayout.defaultProps = {
    user: undefined,

};

BaseLayout.propTypes = {
    errorPage: PropTypes.object.isRequired,
    clearError: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
    children: PropTypes.any.isRequired,
    user: PropTypes.object,
};


export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);
