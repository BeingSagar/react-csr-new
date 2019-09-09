import React from 'react';

import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import PATHS, { baseUrls } from '../../../routes/routes-path';

import MenuStyles from './menu.scss';


const Menu = props => {
    const {logout} = props;
    /**
     * Custom link component
     * It is required to use CustomLink everywhere in Menu as it checks if challenge redirection information exists.
     * If it does it clears that.
     * @param {string} to: link where one should be redirected
     * @param {string} children: text on the link
     */
    const CustomLink = ({ to, children }) => <Link to={to}>{children}</Link>;


    CustomLink.defaultProps = {
        to: '',
        children: '',
    };

    CustomLink.propTypes = {
        to: PropTypes.string,
        children: PropTypes.string,
    };
    return (
        <div className={MenuStyles['menu-container']}>
            <ul className={MenuStyles['menu-links']}>
                <li><CustomLink to="/">View 1</CustomLink></li>
                <li onClick={logout}><span>Logout</span></li>
            </ul>
        </div>
    );
};


Menu.defaultProps = {
};

Menu.propTypes = {
    logout: PropTypes.func.isRequired,
};

export default withRouter(Menu);
