'use strict';

const sequelize = require('sequelize');
const Model = require("../Model/user_account");

const customer = require('../Model/customer');
const customerSocial = require('../Model/customer_social_media');
const socialMediaPlatform = require('../Model/social_media_platform');
const CPhoneNumber = require('../Model/customer_phone_number');
const phoneNumber = require('../Model/phone_number');
const CEmail = require('../Model/customer_email_address');
const Email = require('../Model/email_address');
const BVN = require('../Model/customer_bvn');


const customerDAO = require('./customerDAO');
module.exports.create = (data) => {
    return Model
            .create(data).then((required_ob) => {
        return required_ob;
    }).catch((err) => {
        return err;
    });
};

module.exports.createOneStep = (data) => {
    console.log(data);
    //return data;
    return Model
            .create(data,
                    {include: [
                            {model: customer, include: [
                                    {model: Email},
                                    {model: phoneNumber},
                                    {model: BVN}
                                ]}
                        ]}).then((required_ob) => {
        return ({status: 200, body: required_ob});

    }).catch((err) => {
        return ({status: 400, error: err.message});
    });
};


/*****
 * ===If customer logs in with social media account
 * @param {type} data
 * @returns {unresolved}
 */
module.exports.createSocial = (data) => {
    //return data;
    //==> create new social media entry 
    return socialMediaPlatform
            .find({where: {
                    provider: data.provider_name
                }})
            .then((platform) => {
                return  customerSocial.find(
                        {where: {
                                account_id: data.account_id
                            },
                            include:[
                                {model:socialMediaPlatform},
                                   {model: customer, include: [
                                    {model: Email},
                                    {model: phoneNumber},
                                    {model: BVN}
                                ]}
                            ]
                        }).then((user) => {
                    //Create new row in customer table if new social media info row was created
                    if (user === null) {
                        let basic_info = {
                            last_name: data.last_name,
                            other_names: data.other_names
                        };

                        return customerDAO.create(basic_info).then((user_crr) => {
                            return customerSocial.create({
                                account_id: data.account_id,
                                customerId: user_crr.id,
                                socialMediaPlatformId: platform.id
                            }).then((cust_social) => {
                                return cust_social;
                            }).catch((err) => {
                                return err;
                            });
                        });
                    } else {
                        return user;
                    }

                });

            }).then((required_ob) => {
        console.log(required_ob);
        return required_ob;
    }).catch((err) => {
        return err;
    });
};
module.exports.findAll = () => {
    return Model
            .findAll({include: [{
                        model: customer,
                        include: [
                            {
                                model: phoneNumber,

                            },
                            {
                                model: Email,

                            },
                            {model: BVN}

                        ]
                    }]})
            .then((data) => {
                return{status: 200, data: data};
            }).
            catch((err) => {
                return{status: 500, errors: err};
            });
};
module.exports.findOne = (id) => {
    return Model
            .findOne({where: {id: id}, include: [customer]})
            .then((data) => {
                let status;
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
module.exports.findOneAccount = (email_address, password) => {

    return Model
            .findOne({
                include: [{model: customer, 
                //attributes: ['first_name', 'last_name', 'account_type']
            }],
                where: {

                    email: email_address,
                    $and: {
                        password: password
                    }
                },
               // attributes: ['id', 'user_name', 'password']

            })
            .then((data) => {
                let status;
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
            .update(details, {where: {id: id}})
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