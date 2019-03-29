(function () {
    'use strict';

    class Validation {
        constructor(criteria) {
            this.allCriteria = criteria;
            this.customCriteria = new Set(criteria);
        };
        toggleValidator(name, state) {
            let result = new Set();
            for (let criteria of [...this.customCriteria]) {
                if (criteria.name === name) {
                    result.add('true');
                } else {
                    result.add('false')
                }
            }
            if (result.has('true')) {
                for (let criteria of [...this.customCriteria]) {
                    if (criteria.name === name && !state) {
                        this.customCriteria.delete(criteria);
                    }
                }
            } else  {
                for (let criteria of this.allCriteria) {
                    if (criteria.name === name && state !== false) {
                        this.customCriteria.add(criteria)
                    }
                }
            }
        }
        validate(value) {
            let result = [],
                errorsMap = new Map;
            for (let criterion of [...this.customCriteria]) {
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
        },
        array = {
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
        },
        string = {
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
        },
        criteriaArr = [number, array, string];

    let validObj = new Validation(criteriaArr);
        validObj.toggleValidator('Number');
        validObj.toggleValidator('Array');


}());