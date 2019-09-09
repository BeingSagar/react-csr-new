import React from 'react';
import PropTypes from 'prop-types';


import Images from '../../../constants/images';

const Header = (props) => {
    const { user } = props;
    return (
        <div className="header-container">
            <div className="icon-wrapper">
                <img src={Images.defaultLogo} alt="" />
            </div>
            <div className="d-flex align-items-center"></div>
        </div>
    );
};

Header.defaultProps = {
    user: {},
};

Header.propTypes = {
    user: PropTypes.object,
};

export default Header;
