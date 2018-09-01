/**
 * Created by ifeoluwa.afolabi@algorismng.com on 8/9/2017.
 */
"use strict";
const request = require('../../helpers/APICall');
const rp = require('request-promise');
const fs = require('fs');
const path = require('path');


let uri = "http://get-rates-banks.herokuapp.com/api/v2/basic-info";
let main_uri = "http://get-rates-banks.herokuapp.com/api/v2/basic-info";

// let main_uri = "http://localhost:5030/api/v2/basic-info";
// let uri = "http://localhost:5030/api/v2/basic-info";


module.exports = {


    create: (req, res, next) => {

        let data_response = {};
        data_response.status = "success";

        let form_request = rp({
            method: 'POST',
            uri: uri
        });


        let form = form_request.form();
        let logo = req.files.logo;


        logo.mv(path.join(__dirname, logo.name), (err) => {//temporarily move file
            if (err) {
                data_response.status = "error";
                data_response.errors = err;
            } else {
                fs.unlinkSync(path.join(__dirname, logo.name));  //delete file once upload is successfull
            }

        });

        form.append('logo', fs.createReadStream(logo.name));
        let body = req.body;
        /***
         * loop through request body and append to form data
         */
        for (let key in body) {
            if (body.hasOwnProperty(key)) {
                form.append(key, body[key]);
            }
        }


        data_response.meta = {};
        data_response.meta.method = req.method;
        data_response.meta.links = {};
        data_response.meta.links.self = `${req.hostname}${req.originalUrl}`;

        return form_request.then(response => {

            if (typeof(response !== 'object')) {
                response = JSON.parse(response);
            }


            if (!response.errors) {
                data_response.data = [];
                (data_response.data).push(response);
                return res.json(data_response);
            } else {
                    throw(response.errors);
            }



        }).catch(err => {
            data_response.errors = {
                summary: err.message,
                details: err
            }
            return res.status(400).json(data_response);
        });

    },

    update: (req, res, next) => {
        let data_response = {};
        data_response.status = "success";


        let key_to_update = (Object.keys(req.query))[0];
        let value = (req.query)[key_to_update];
        //make sure url is not malformed
        if (typeof(value) === 'object') {
            /***
             * a url like http://localhost:8000/banks?id=1&&id=11 would yield
             * [1","11"] as the id key which would be hard to work with
             *
             */

            data_response.status = "error";
            data_response.errors = {};
            data_response.errors.summary = "Url malformed";
            data_response.errors.details = {
                message: "update key seems to be an object",
                value_of_key_detected: value,
                url: `${req.hostname}${req.originalUrl}`
            };
            return res.status(400).json(data_response);
        }

        uri = `${uri}/${value}`;

        let form_request = rp({
            method: 'PUT',
            uri: uri
        });


        let form = form_request.form();
        if (req.files) {
            let logo = req.files.logo;


            logo.mv(path.join(__dirname, logo.name), (err) => {//temporarily move file
                if (err) {
                    data_response.status = "error";
                    data_response.errors = err;
                } else {
                    fs.unlinkSync(path.join(__dirname, logo.name));  //delete file once upload is successfull
                }

            });

            form.append('logo', fs.createReadStream(logo.name));
        }

        let body = req.body;
        /***
         * loop through request body and append to form data
         */
        for (let key in body) {
            if (body.hasOwnProperty(key)) {
                form.append(key, body[key]);
            }
        }


        return form_request.then(response => {

            if (typeof(response !== 'object')) {
                response = JSON.parse(response);
            }


            data_response.meta = {};
            data_response.meta.method = req.method;
            data_response.meta.links = {};
            data_response.meta.links.self = `${req.hostname}${req.originalUrl}`;
            data_response.data = [];
            if (response[0] === 1) {
                (data_response.data).push({message: "Record Updated Successfully"});
            } else {
                res.status(404);
                data_response.status = "unsuccessful";
                (data_response.data).push({message: `No Record with that ${key_to_update} Found`});
            }
            uri = main_uri;


            return res.json(data_response);
        }).catch(err => {
            data_response.status = "error";
            data_response.errors = {};
            data_response.errors.summary = "Bad Request";
            data_response.errors.details = {
                message: err,
                // value_of_key_detected:value,
                // url:`${req.hostname}${req.originalUrl}`
            };
            uri = main_uri;
            return res.status(400).json(data_response);
        });

    },


    findAll: (req, res, next) => {
        let page = 1;
        if (req.query.page !== 1 && typeof(req.query.page) !== 'undefined') {
            page = req.query.page;
            let req_array = uri.split('?');
            if (req_array.length > 0) {
                uri = `${req_array[0]}?page=${req.query.page}`;
            } else {
                uri = `${uri}/?page=${page}`;
            }
        }

        let url = `${req.hostname}${req.originalUrl}`;


        return request("GET", uri, '').then(response => {
            if (typeof(response) !== 'object') {
                response = JSON.parse(response);
            }
            let data = {};

            let pages = response.pages;

            data.status = 'success';
            data.meta = {};
            data.meta.method = req.method;
            data.meta.total_record_count = response.count;
            data.meta.total_retrieved = (response.data).length
            data.meta.links = {};
            data.meta.links.self = `${(url.split('?'))[0]}?page=${pages.current_page}`;
            data.meta.links.next = `n/a`;
            data.meta.links.last = `n/a`;
            if (pages.next_page > pages.last_page) {
                data.meta.links.next = `n/a`;
            } else {
                data.meta.links.next = `${(url.split('?'))[0]}?page=${pages.next_page}`;
            }

            data.meta.links.last = `${(url.split('?'))[0]}?page=${pages.last_page}`;
            data.data = response.data;


            delete data.pages;

            return res.json(data);
        });
    },


    findOne: (req, res, next) => {
        let data_response = {};
        data_response.status = "success";


        let key_to_find = (Object.keys(req.query))[0];
        let value = (req.query)[key_to_find];
        //make sure url is not malformed
        if (typeof(value) === 'object') {
            /***
             * a url like http://localhost:8000/banks?id=1&&id=11 would yield
             * [1","11"] as the id key which would be hard to work with
             *
             */

            data_response.status = "error";
            data_response.errors = {};
            data_response.errors.summary = "Url malformed";
            data_response.errors.details = {
                message: "key seems to be an object",
                value_of_key_detected: value,
                url: `${req.hostname}${req.originalUrl}`
            };
            return res.status(400).json(data_response);
        }

        uri = `${uri}/${key_to_find}/${value}`;

        let form_request = rp({
            method: 'GET',
            uri: uri
        });


        return form_request.then(response => {

            if (typeof(response !== 'object')) {
                response = JSON.parse(response);
            }


            data_response.meta = {};
            data_response.meta.method = req.method;
            data_response.meta.links = {};
            data_response.meta.links.self = `${req.hostname}${req.originalUrl}`;
            data_response.data = [];
            //if(response[0]===1){
            (data_response.data).push(response);
            /* }else{
             res.status(404);
             data_response.status = "unsuccessful";
             (data_response.data).push({message:`No Record with that ${key_to_update} Found`});
             }*/
            uri = main_uri;


            return res.json(data_response);
        }).catch(err => {
            data_response.status = "unsuccessful";
            data_response.errors = {};
            data_response.errors.summary = "No Records Found";
            data_response.errors.details = {
                message: err,
                // value_of_key_detected:value,
                // url:`${req.hostname}${req.originalUrl}`
            };
            uri = main_uri;
            return res.status(err.statusCode).json(data_response);
        });

    },


    deleteOne: (req, res, next) => {
        let data_response = {};
        data_response.status = "success";


        let key_to_find = (Object.keys(req.query))[0];
        let value = (req.query)[key_to_find];
        //make sure url is not malformed
        if (typeof(value) === 'object') {
            /***
             * a url like http://localhost:8000/banks?id=1&&id=11 would yield
             * [1","11"] as the id key which would be hard to work with
             *
             */

            data_response.status = "error";
            data_response.errors = {};
            data_response.errors.summary = "Url malformed";
            data_response.errors.details = {
                message: "key seems to be an object",
                value_of_key_detected: value,
                url: `${req.hostname}${req.originalUrl}`
            };
            return res.status(400).json(data_response);
        }

        uri = `${uri}/${value}`;

        let form_request = rp({
            method: 'DELETE',
            uri: uri
        });


        return form_request.then(response => {

            if (typeof(response !== 'object')) {
                response = JSON.parse(response);
            }


            data_response.meta = {};
            data_response.meta.method = req.method;
            data_response.meta.links = {};
            data_response.meta.links.self = `${req.hostname}${req.originalUrl}`;

            //  return res.json(parseInt(response));
            if (parseInt(response) === 1) {
                data_response.data = [];
                (data_response.data).push({message: `Record Successfully Deleted`});
            } else {
                res.status(404);
                data_response.status = "unsuccessful";
                (data_response.errors) = {message: `Not Found`};
            }
            uri = main_uri;


            return res.json(data_response);
        }).catch(err => {
            data_response.status = "unsuccessful";
            data_response.errors = {};
            data_response.errors.summary = "No Records Found";
            data_response.errors.details = {
                message: err,
                // value_of_key_detected:value,
                // url:`${req.hostname}${req.originalUrl}`
            };
            uri = main_uri;
            return res.status(400).json(data_response);
        });

    },


};