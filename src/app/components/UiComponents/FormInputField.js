import React from 'react';
import PropTypes from 'prop-types';
import { getErrorMessage } from 'AppUtils';

class FormInputField extends React.Component {
    constructor(props) {
        super(props);

        this.attachRef = target => this.setState({ target });
        this.state = { show: false };
    }

    render() {
        const {
            fieldName, labelText, placeHolderText, handleChange, fieldValue,
            errors, type, disabled, min, max,
        } = this.props;
        const errorMessage = getErrorMessage(errors, fieldName);
        const {target } = this.state;

        return (
            <div className="form-group d-flex justify-content-between flex-column">
                { labelText &&
                    <label
                        htmlFor={fieldName}
                        className={`font-weight-bold`}
                        ref={this.attachRef}
                    >
                        {labelText}
                    </label>
                }
                <input
                    className={`form-control ${errorMessage && 'has-error'}`}
                    type={type || 'text'}
                    placeholder={placeHolderText}
                    name={fieldName}
                    onChange={handleChange}
                    value={fieldValue}
                    disabled={disabled}
                    autoComplete="off"
                    min={(type === 'number') && min ? min : undefined}
                    max={(type === 'number') && max ? max : undefined}
                />
                {errorMessage && <div className="form-error-message"> {errorMessage} </div>}
            </div>
        );
    }
}

FormInputField.defaultProps = {
    labelText: '',
    placeHolderText: '',
    errors: '',
    type: 'text',
    disabled: false,
    min: Number.MIN_VALUE,
    max: Number.MAX_VALUE,
};

FormInputField.propTypes = {
    fieldName: PropTypes.string.isRequired,
    labelText: PropTypes.string,
    placeHolderText: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    fieldValue: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
    errors: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string,
        PropTypes.array,
    ]),
    type: PropTypes.string,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
};

export default FormInputField;
