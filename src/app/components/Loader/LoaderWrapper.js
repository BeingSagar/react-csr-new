import React from 'react';

import PropTypes from 'prop-types';
import LoaderStyles from './LoaderStyles.scss';
import Loader from 'react-loader-spinner'

const LoaderWrapper = (props) => {
    const { showLoader, children, small} = props;
    if (showLoader) {
        return (
            <React.Fragment>
                <div className={`${LoaderStyles['loader-container']}`}>
                <Loader type="Audio"
                        color="#928e8e"
                        height={small ? "" : "100%"}
                        width={small ? "200px" : "100%"}/>
                </div>
            </React.Fragment>
        );
    }
    return (
        <React.Fragment>
            { children }
        </React.Fragment>
    );
};
LoaderWrapper.defaultProps = {
    showLoader: false,
    small: false,
};

LoaderWrapper.propTypes = {
    showLoader: PropTypes.bool,
    small: PropTypes.bool,
    children: PropTypes.any.isRequired,
};

export default LoaderWrapper;
