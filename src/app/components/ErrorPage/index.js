import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Images from '../../../constants/images';
import PATHS from '../../../routes/routes-path';

class ErrorPage extends React.Component {
    componentWillUnmount() {
        // Reseting flag which shows error page
        this.props.clearError();
    }

    render() {
        const { is500 } = this.props;

        return (
            <div className="detail-container">
                <h1 className="error-page__heading">Ooops...</h1>
                <div className="error-page__box">
                    <div className="error-page__content">
                        <img
                            className="error-page__image"
                            src={is500 ? Images.Page500 : Images.Page404}
                            alt=""
                        />
                        <div className="error-page__info-heading">We&apos;re sorry!</div>
                        <div className="error-page__info-message">
                            {
                                is500 ?
                                    'We seem to be having technical difficulties at the moment.' :
                                    'The page you have requested is either missing or temporarily broken.'
                            }
                        </div>
                        <Link className="error-page__info-button" to={PATHS.loginPage}>
                            Return to Dashboard
                        </Link>
                    </div>
                </div>
            </div>

        );
    }
}

ErrorPage.defaultProps = {
    is500: false,
};

ErrorPage.propTypes = {
    is500: PropTypes.bool,
    clearError: PropTypes.func.isRequired,
};

export default ErrorPage;
