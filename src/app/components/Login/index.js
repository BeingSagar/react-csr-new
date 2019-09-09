import React from 'react';

import PropTypes from 'prop-types';

import { history } from 'store';
import PATHS from 'AppRoutes/routes-path';
import { LOCAL_STORAGE_USER_KEY } from 'AppConstants/app';
import FormInputField from 'AppComponents/UiComponents/FormInputField';
import LoaderWrapper from 'AppComponents/Loader/LoaderWrapper';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const user = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
        if (user) {
            history.push(PATHS.claimListPage);
        }
    }

    /**
     * Function to handle change in any field of login form.
     *
     * @param e: Change event
     */
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    /**
     * Function to handle login submission, It makes a api call for authentication and sets user in local storage.
     * @param e: Submit event
     */
    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.checkAuthentication(username, password);
        }
    }

    /**
     * Function which defines how entire login component will look like with html.
     * @returns {XML}
     */
    render() {
        const { username, password, submitted } = this.state;
        const { error, isAuthenticating } = this.props;
        const showLoader = isAuthenticating;

        return (
            <LoaderWrapper showLoader={showLoader}>
                <div className="login-container">
                    <form
                        name="form"
                        className="login-form"
                        onSubmit={this.handleSubmit}
                    >
                        <FormInputField
                            fieldName="username"
                            labelText="Username"
                            placeHolderText="Username"
                            handleChange={this.handleChange}
                            fieldValue={username}
                            errors={submitted && !username ? 'This field is required' : ''}
                        />
                        <FormInputField
                            fieldName='password'
                            labelText='Password'
                            type="password"
                            placeHolderText="Password"
                            handleChange={this.handleChange}
                            fieldValue={password}
                            errors={submitted && !password ? 'This field is required': ''}
                        />
                        <div className="form-group mt-4 mb-0">
                            <button
                                className={
                                    `btn ${
                                        !(username && password) && 'disabled'
                                    }`
                                }
                            >
                                LOGIN
                            </button>
                        </div>
                        <div className="form-error-message">
                            <p className="col-md-12">{error}</p>
                        </div>
                    </form>
                </div>
            </LoaderWrapper>

        );
    }
}

LoginForm.defaultProps = {
    error: null,
    isAuthenticating: false,
};

LoginForm.propTypes = {
    validateUsername: PropTypes.func.isRequired,
    checkAuthentication: PropTypes.func.isRequired,
    error: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    isAuthenticating: PropTypes.bool,
};

export default LoginForm;
