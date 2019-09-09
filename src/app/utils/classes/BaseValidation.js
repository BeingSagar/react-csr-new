import moment from 'moment';

class BaseValidation {
    constructor() {
        this.validateRequiredField = this.validateRequiredField.bind(this);
        this.validateRequiredFields = this.validateRequiredFields.bind(this);
    }

    /**
     * Function that validates a valid string is present in given field or not.
     *
     * @param fieldName: Field name which has to be validated.
     * @param errorDict: Dict which will be updated if validation fails.
     * @param fieldNameDict: Dict for fields with their display names.
     */
    validateRequiredField = (fieldName, errorDict, fieldNameDict) => {
        if (!errorDict[fieldName] && (!this[fieldName]
                || (typeof (this[fieldName]) === 'string' && !this[fieldName].trim()))) {
            errorDict[fieldName] = `${fieldNameDict[fieldName]} is required`;
        }
    };

    /**
     * Function that validates if date is greater than equal to current date or not.
     *
     * @param fieldName: Field name which has to be validated.
     * @param errorDict: Dict which will be updated if validation fails.
     * @param fieldNameDict: Dict for fields with their display names.
     */
    validateForFutureOrCurrentDate = (fieldName, errorDict, fieldNameDict) => {
        if (this[fieldName] && !(moment(this[fieldName]).isSameOrAfter(moment(), 'day'))) {
            errorDict[fieldName] = `${fieldNameDict[fieldName]} cannot be in past`;
        }
    }

    /**
     * Function that validates whether a list of fields have valid value or not.
     *
     * @param fields: List having names of fields which has to be validated.
     * @param errorDict: Dict which will be updated if validation fails.
     * @param fieldNameDict: Dict for fields with their display names.
     */
    validateRequiredFields = (fields, errorDict, fieldNameDict) => {
        for (const field of fields) {
            this.validateRequiredField(field, errorDict, fieldNameDict);
        }
    };
}

export default BaseValidation;
