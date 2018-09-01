'use strict';

const DAO = require("../DataAccess/customer_phone_numberDAO");

module.exports.create = (request, response) => {
    let req_body = {
        customerId: request.body.customerId,
        phone_number:[
            {phone_number:request.body.phone_number}
        ]
    };
    //return response.send(req_body)
    return DAO
            .create(req_body)
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
            .deleteWhere({customerId: req.params.id})
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