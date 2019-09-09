import React, { Component } from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addLocaleData, IntlProvider } from 'react-intl';
import enLocaleData from 'react-intl/locale-data/en';
import esLocaleData from 'react-intl/locale-data/es';

import actions from './app/actions/language';
import flattenMessages from './app/utils/flattenArray';
import enTranslations from './translations/en.json';
import esTranslations from './translations/es.json';

// Adding locale data
addLocaleData(enLocaleData);
addLocaleData(esLocaleData);
addLocaleData({
    locale: 'es',
    parentLocale: 'en',
});

const messages = {
    en: flattenMessages(enTranslations),
    es: flattenMessages(esTranslations),
};

/**
 * This Component is used to show a notification to the user
 * above the header.
 * @param {any} props
 */
const LanguageWrap = props => {
    const { language, children } = props;
    return (
        <IntlProvider key={language} locale={language} messages={messages[language]}>
            {children}
        </IntlProvider>
    );
};

LanguageWrap.defaultProps = {
    language: 'en',
};

LanguageWrap.propTypes = {
    language: PropTypes.string,
    children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
    language: state.language,
});

const mapDispatchToProps = dispatch => ({
    setLanguage: lang => dispatch(actions.setLanguage(lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LanguageWrap));
