'use strict';

const sequelize = require('sequelize');
const Model = require("../Model/customer_phone_number");
const phone = require("../Model/phone_number");

module.exports.create = (data) => {
   console.log(data);
    return Model
            .create(data, {include: [phone]}).then((required_ob) => {
        return required_ob;
    }).catch((err) => {
        return err;
    });
};

module.exports.findAll = () => {
    return Model
            .findAll()
            .then((data) => {
                return{status: 200, data: data};
            }).
            catch((err) => {
                return{status: 500, errors: err};
            });

};

module.exports.findOne = (id) => {
    return Model
            .findOne({where: {customerId: id}})
            .then((data) => {
                let status;
                console.log("I work");
                if (data !== null) {
                    status = 200;
                } else {
                    status = 404;
                }
                return{status: status, data: data};
            }).
            catch((err) => {
                return{status: 500, errors: err};
            });
};

module.exports.updateOne = (details, id) => {
    return Model
            .update(details, {where: {customerId: id}})
            .then((response) => {
                return{status: 200, data: response};
            }).
            catch((err) => {
                return{status: 500, errors: err};
            });

};

module.exports.deleteWhere = (query) => {
    return Model
            .destroy({where: query})
            .then((response) => {
                return{status: 200, data: response};
            }).
            catch((err) => {
                return{status: 500, errors: err};
            });

};
