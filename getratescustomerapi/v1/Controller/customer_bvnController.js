'use strict';

const DAO = require("../DataAccess/customer_bvnDAO");

module.exports.create = (request, response) => {
    return DAO
            .create(request.body)
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