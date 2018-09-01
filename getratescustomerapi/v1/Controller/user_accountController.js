'use strict';

const DAO = require("../DataAccess/user_accountDAO");

module.exports.create = (request, response) => {
    return DAO
            .create(request.body)
            .then((required_obj) => {
                response.status(200).json(required_obj);
            }).catch((err) => {
        response.status(404).json(err);
    });
};

module.exports.createOneStep = (request, response) => {
    request.body.date_of_birth = new Date(request.body.date_of_birth);
    let body = {
        email: request.body.email,
        password: request.body.password,
        customer: {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            date_of_birth:request.body.date_of_birth,
            account_created_where:request.body.account_created_where
        }
    };
    
    if(request.body.phone_number){
        let phone_numbers = [
            {phone_number:request.body.phone_number}
        ] ;
        body.customer.phone_numbers = phone_numbers;
    }
    if(request.body.email){
        let emails = [
            {email_address:request.body.email}
        ];
        body.customer.email_addresses = emails;
    }
    if(request.body.bvn){
         let bvn = {bvn:request.body.bvn};
        body.customer.customer_bvn = bvn;
    }
    //return response.json(body);
    return DAO
            .createOneStep(body)
            .then((required_obj) => {
                response.status(required_obj.status);
                if(!required_obj.error){
                    response.json(required_obj.body);
                }else{
                    
                    response.send(required_obj.error);
                }
                
            }).catch((err) => {
                
        response.status(400).json(err);
    });
};

/****8
 * 
 * @param {type} request
 * @param {type} response
 * @returns {unresolved}
 */
module.exports.createSocial = (request, response) => {
    let body = {
        account_id: request.body.account_id,
        provider_name: request.body.provider_name,
        other_names: request.body.other_names,
        last_name: request.body.last_name

    };
    return DAO
            .createSocial(body)
            .then((required_obj) => {
                response.status(200).json(required_obj);
            }).catch((err) => {
        response.status(404).json(err);
    });
};

module.exports.findAll = (req, res) => {
    return DAO
            .findAll()
            .then((data) => {
                res.status(data.status);
                if (data.errors) {
                    res.json(data.errors);
                } else {
                    res.json(data.data);
                }
            }).catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.findOne = (req, res) => {
    return DAO
            .findOne(req.params.id)
            .then((data) => {
                res.status(data.status);
                if (data.errors) {
                    res.json(data.errors);
                } else {
                    res.json(data.data);
                }
            }).catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.findOneAccount = (req, res) => {
    return DAO
            .findOneAccount(req.body.email, req.body.password)
            .then((data) => {
                res.status(data.status);
                if (data.errors) {
                    res.json(data.errors);
                } else {
                    res.json(data.data);
                }
            }).catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.updateOne = (req, res) => {
    return DAO
            .updateOne(req.body, req.params.id, res)
            .then((data) => {
                res.status(data.status);
                if (data.errors) {
                    res.json(data.errors);
                } else {
                    res.json(data.data);
                }
            }).catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.deleteOne = (req, res) => {
    return DAO
            .deleteWhere({id: req.params.id})
            .then((data) => {
                res.status(data.status);
                if (data.errors) {
                    res.json(data.errors);
                } else {
                    res.json(data.data);
                }
            }).catch((err) => {
        res.status(400).json(err);
    });
};