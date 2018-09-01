'use strict';

const DAO = require('../dataAccess/reviewDAO');
const servicesDAO = require('../dataAccess/services');
const review_document = require('../dataAccess/review_document');
const customer = require('../dataAccess/customerDAO');
const improvement_area = require('../dataAccess/improvement_areas');
const upload = require('../Config/fileUploadHandler');


/***********
 *
 * @param {type} req
 * @param {type} res
 * @returns {unresolved}
 */
module.exports.create = (req, res, next) => {

    let body = req.body;


    let review_data = {
        rating: body.rating,
        review: body.review,
        customerEmail: body.email,
        institution_name: body.institution_name,
        review_type: body.review_type
    };

    if (body.improvement_area) {
        review_data.improvement_areas = [{improvement_areas: body.improvement_area}];
    }
    if (req.files) {
        const document_file_name = upload(req.files.document_url);
        if (document_file_name !== parseInt(0)) {
            req.body.document_url = document_file_name;

            let review_document_data = {
                document_url: document_file_name
            };
            review_data.Review_documents = [review_document_data];

        }

    }
    if (body.service_name) {
        review_data.service = {service_name: body.service_name};
    }

    return DAO.create(review_data)
        .then((data) => {
            return res.status(data.status).json(data);
        })
        .catch((err) => {
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
            return res.json(data.errors);
        } else {
            return res.json(data.data);
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
            return res.json(data.errors);
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
module.exports.findAllByBankName = (req, res) => {
    return DAO.findAllByBankName(req.body.institution_name).then((data) => {
        res.status(data.status);
        if (data.errors) {
            return res.json(data.errors);
        } else {
            res.json(data);
        }
    }).catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.updateOne = (req, res) => {

    return DAO.updateOne(req.body, req.params.id, res).then((data) => {
        //return res.json(data);
        res.status(data.status);
        if (data.errors) {
            return res.json(data.errors);
        } else {
            return res.json(data.data);
        }
    }).catch((err) => {
        res.status(400).json(err);
    });
};

module.exports.deleteOne = (req, res) => {
    return DAO.deleteWhere({id: req.params.id})
        .then((data) => {
            //return res.json(data);
            res.status(data.status);
            if (data.errors) {
                return res.json(data.errors);
            } else {
                return res.json(data.data);
            }
        }).catch((err) => {
            res.status(400).json(err);
        });
}