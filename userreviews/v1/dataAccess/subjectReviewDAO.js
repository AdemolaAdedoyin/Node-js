'use strict';

const sequelize = require('sequelize');
const model = require('../models/subjectReview');


/*******
 * 
 * @returns {undefined}
 */
module.exports.create = (data) => {
    return model.
            create(data).
            then((row) => {
                return {status: 200, row_created: row};
            }).
            catch((err) => {
                return {status: 400, errors: err};
            });
};


/****
 * 
 * @returns {unresolved}
 */
module.exports.findAll = () => {
    return model.
            findAll().
            then((data) => {
                return {status: 200, data: data};
            }).
            catch((err) => {
                return {status: 500, errors: err};
            });
};


/*****
 * 
 * @param {type} id
 * @returns {unresolved}
 */
module.exports.findOne = (id) => {
    return model
            .findOne({where: {id: id}}).
            then((data) => {
                let status;
                if (data !== null) {
                    status = 200;
                } else {
                    status = 404;
                }
                return {status: status, data: data};
            }).
            catch((err) => {
                return {status: 500, errors: err};
            });
};


/*************
 * 
 * @param {type} details
 * @param {type} id
 * @returns {unresolved}
 */
module.exports.updateOne = (details, id) => {
    return model.update(details, {where: {id: id}})
            .then((response) => {
                return ({status: 200, data: response})
            }).catch((err) => {
        return ({status: 500, errors: err});
    });
};

module.exports.deleteWhere = (query) => {
    return model.destroy({where: query})
            .then((response) => {
                return ({status: 200, data: response})
            }).catch((err) => {
        return ({status: 500, errors: err});
    });
}


        