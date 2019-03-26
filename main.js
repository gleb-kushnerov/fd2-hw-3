(function () {
    'use strict';

    let number = {
        name: 'Number',
        check(value) {
            return Number.isFinite(value);
        },
        message(value) {
            if (this.check(value)) {
                return `${value} is number`
            } else {
                return `${value} is not a number`
            }
        }
    };

    let array = {
        name: 'Array',
        check(value) {
            return Array.isArray(value);
        },
        message(value) {
            if (this.check(value)) {
                return `${value} is array`
            } else {
                return `${value} is not array`
            }
        }
    };

    let string = {
        name: 'String',
        check(value) {
            return typeof value === 'string';
        },
        message(value) {
            if (this.check(value)) {
                return `${value} is string`
            } else {
                return `${value} is not a string`
            }
        }
    };

    let criteriaArr = [number, array, string];




    class Validation {
        constructor(criteria) {
            this.criteria = criteria;
        };

        toggleValidator(name, state) {

        }

        validate(value) {
            let result = [],
                errorsMap = new Map;
            for (let criterion of this.criteria) {
                if (criterion.check(value)) {
                    result.push('true');
                } else {
                    result.push('false');
                    errorsMap.set(criterion.name, criterion.message(value));
                }
            }
            if (result.includes('false')) {
                return {
                    valid: false,
                    errors: errorsMap
                }
            } else  {
                return {
                    valid: true,
                    errors: 'no errors'
                }
            }
        };
    }

    let validObj = new Validation(criteriaArr);
    console.log(validObj.validate('hello'));

}());