'use strict';

const sequelize = require('sequelize');
const model = require('../models/review');
const services = require('../models/services');
const review_document = require('../models/review_document');
const improvement_areas = require('../models/improvement_areas');
const customer = require('../models/customer');


/*******
 *
 * @returns {undefined}
 */
module.exports.create = (data) => {
    return model.create(data, {
        include: [
            // {model: customer},
            {model: review_document},
            {model: improvement_areas},
            {model: services}
        ]
    }).then((row) => {
        return {status: 200, row_created: row};
    }).catch((err) => {
        return {status: 400, errors: err};
    });
};


/****
 *
 * @returns {unresolved}
 */
module.exports.findAll = () => {
    return model.findAll({
        order: 'institution_name',
        include: [
            // {model: customer},
            {model: review_document},
            {model: improvement_areas},
            {model: services},
        ],

    }).then((data) => {
        let data_ = {};

        for (let i in data) {

            if (parseInt(i) !== 0) {
                if (((data[i]).institution_name) !== ((data[(i - 1)]).institution_name)) {
                    data_[((data[i]).institution_name)] = {};
                    data_[((data[i]).institution_name)].count = 0;
                    data_[((data[i]).institution_name)].avg_rating = 0;
                    data_[((data[i]).institution_name)].data = [];
                }
            }


        }

        for (let key in data_) {
            let avg_rating = 0;
            let history = [], past = [], present = [];
            let history_sum = 0, past_sum = 0, present_sum = 0;
            let history_avg = 0, past_avg = 0, present_avg = 0;
            let count = 0;
            for (let i in data) {
                if (key === data[i].institution_name) {
                    count += 1;
                    data_[key].data.push(data[i]);


                    /***
                     * //for the rating weight 50 - 30 - 20 calculator
                     *
                     * 50%: < 6 months ago
                     * 30%: >= 6 months ago && < 1 year ago
                     * 20%: >= 1 year ago
                     */

                    let now = (new Date()).getFullYear();
                    let then = (new Date(data[i].updatedAt)).getFullYear();
                    let time_diff = ((now - then) * 12) + (((new Date()).getMonth()) - ((new Date(data[i].updatedAt)).getMonth()));
                    if (time_diff < 6) {
                        present.push(((data[i]).rating));
                        present_sum += (data[i]).rating;

                    } else if (time_diff >= 6 && time_diff < 12) {
                        past.push(((data[i]).rating));
                    } else {
                        history.push(((data[i]).rating));
                    }
                }
            }
            data_[key].count = count;


            //make present average rating 5 if no rating exists for the time period
            if(present.length!==0){
                present_avg = present_sum/present.length;
            }else{
                present_avg = 0;
            }

            //make past average rating 5 if no rating exists for the time period
            if(past.length!==0){
                past_avg = past_sum/past.length;
            }else{
                past_avg = 0;
            }


            //make history average rating 5 if no rating exists for the time period
            if(history.length!==0){
                history_avg = history_sum/history.length;
            }else{
                history_avg = 0;
            }



            if(past_avg === 0){
                past_avg = present_avg;
            }

            if(history_avg===0){
                history_avg=present_avg;
            }



            past_avg = past_avg*0.3;
            history_avg = history_avg*0.2;
            present_avg = present_avg*0.5;

            avg_rating = ((present_avg+history_avg+past_avg));
            data_[key].avg_rating = avg_rating;

        }
        return {status: 200, data: data_};
    }).catch((err) => {
        console.log(err);
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
        .findOne({
            where: {id: id}, include: [
                //  {model: customer},
                {model: review_document},
                {model: improvement_areas},
                {model: services}
            ]
        }).then((data) => {
            let status;
            if (data !== null) {
                status = 200;
            } else {
                status = 404;
            }
            return {status: status, data: data};
        }).catch((err) => {
            return {status: 500, errors: err};
        });
};


/****
 * 
 * @param details
 * @param id
 * @returns {Promise.<TResult>}
=======
/*****
 *
 * @param {type} id
 * @returns {unresolved}
 */
module.exports.findAllByBankName = (bank_name) => {
    return model
        .findAll({
            where: {
                institution_name: {
                    $ilike: `${bank_name}%`
                }
            }, include: [
                //  {model: customer},
                {model: review_document},
                {model: improvement_areas},
                {model: services}
            ]
        }).then((data) => {
            let status;

            if (data !== null) {
                status = 200;
            } else {
                status = 404;
            }
            return {status: status, count: data.length, data: data};
        }).catch((err) => {
            return {status: 500, errors: err};
        });
};


/*************
 *
 * @param {type} details
 * @param {type} id
 * @returns {unresolved}
>>>>>>> c2587d73a8de466ad1e5803c30deb31eae7d25eb
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
};


        