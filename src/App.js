import React from 'react';

import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AppRoutes from './routes/routes';
import LanguageWrap from './LanguageWrap';

function App(props) {
    console.log("XYZ 3 in app.js");
    return (
        <LanguageWrap>
            <div className="page-content">
                { AppRoutes }
            </div>
        </LanguageWrap>
    );
}

export default withRouter(connect(null, null)(App));