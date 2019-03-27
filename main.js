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
                    if (criteria.name === name) {
                        this.customCriteria.delete(criteria);
                    }
                }
            } else  {
                for (let criteria of this.allCriteria) {
                    if (criteria.name === name) {
                        this.customCriteria.add(criteria)
                    }
                }
            }
            // if (this.allCriteria.length === this.customCriteria.size) {
            //     for (let criterion of [...this.customCriteria]) {
            //         if (criterion.name === name && !state) {
            //             this.customCriteria.delete(criterion);
            //         }
            //     }
            // } else {
            //     for (let criterion of this.allCriteria) {
            //         if (criterion.name === name && state !== false) {
            //             this.customCriteria.add(criterion);
            //         }
            //     }
            // }
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

    let validObj = new Validation(criteriaArr);
    validObj.toggleValidator('Array');
    validObj.toggleValidator('Array');
    validObj.toggleValidator('Array');
    validObj.toggleValidator('Number');
    validObj.toggleValidator('Number');





    console.log(validObj.customCriteria);

}());