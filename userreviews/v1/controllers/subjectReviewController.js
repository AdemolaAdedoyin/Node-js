'use strict';

const DAO = require('../dataAccess/subjectReviewDAO');

/***********
 * 
 * @param {type} req
 * @param {type} res
 * @returns {unresolved}
 */
module.exports.create = (req, res) => {
    //return res.json(req.body);
    return DAO.create(req.body).then((data) => {
        res.status(data.status);
        if (data.errors) {
            res.json(data.errors);
        } else {
            res.json(data.row_created);
        }

    }).catch((err) => {
        res.status(400).json(err);
    });
};


/******************
 * 
 * @param {type} req
 * @param {type} res
 * @returns {unresolved}
 */
module.exports.findAll = (req, res) => {
    return DAO.findAll().then((data) => {
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

/****
 * 
 * @param {type} req
 * @param {type} res
 * @returns {unresolved}
 */
module.exports.findOne = (req, res) => {
    return DAO.findOne(req.params.id).then((data) => {
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

    return DAO.updateOne(req.body, req.params.id, res).then((data) => {
        //res.json(data);
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
    return DAO.deleteWhere({id: req.params.id})
            .then((data) => {
                //res.json(data);
                res.status(data.status);
                if (data.errors) {
                    res.json(data.errors);
                } else {
                    res.json(data.data);
                }
            }).catch((err) => {
        res.status(400).json(err);
    });
}