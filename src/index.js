
// import React from "react";
// import ReactDOM from "react-dom";

// import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// import "bootstrap/dist/css/bootstrap.min.css";
// import "./assets/css/animate.min.css";
// import "./assets/sass/main.scss?v=1.3.0";
// import "./assets/css/demo.css";
// import "./assets/css/pe-icon-7-stroke.css";

// import AdminLayout from "layouts/Admin.jsx";

// ReactDOM.render(
//   <BrowserRouter>
//     <Switch>
//       <Route path="/" render={props => <AdminLayout {...props} />} />
//       <Redirect from="/" to="/dashboard" />
//     </Switch>
//   </BrowserRouter>,
//   document.getElementById("root")
// );

import React from 'react';
import ReactDOM from 'react-dom';

import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { store, history } from './store';
import App from './App';

//import './styles/styles.scss';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <App />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);