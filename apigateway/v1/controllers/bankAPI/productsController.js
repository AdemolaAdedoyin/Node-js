'use strict';
const request = require('../../helpers/APICall');
const fs = require('fs');
const path = require('path');

let uri = "http://localhost:5030/api/v2/products";
// let uri = "http://get-rates-banks.herokuapp.com/api/v2/products";
let main_uri = "http://get-rates-banks.herokuapp.com/api/v2/products";

let data;
module.exports = {

    create : (req, res, next) =>{

        return request('POST', uri, '', req.body).then(response =>{
            return res.json(response);
        })

    },

    update : (req, res, next)=> {
        return request().then(response =>{

        })

    },

    findAll : (req, res, next)=> {


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

        return request('GET', uri, '')
            .then(response =>{
                let url = `${req.hostname}${req.originalUrl}`;
                if(typeof(response) !== 'object'){
                    response = JSON.parse(response);
                }let data = {};

                let pages = response.pages;

                data.status = 'success';
                data.meta = {};
                data.meta.method = req.method;
                data.meta.total_record_count = response.count;
                data.meta.total_retrieved = (response.data).length;
                data.meta.links = {};
                data.meta.links.self = `${(url.split('?'))[0]}?page=${pages.current_page}`;
                data.meta.links.next = `n/a`;
                // data.meta.links.last = `n/a`;
                if (pages.next_page > pages.last_page) {
                    data.meta.links.next = `n/a`;
                } else {
                    data.meta.links.next = `${(url.split('?'))[0]}?page=${pages.next_page}`;
                }

                data.meta.links.last = `${(url.split('?'))[0]}?page=${pages.last_page}`;
                data.data = response.data;


                delete data.pages;

                return res.json(data);
            }).catch(err =>{
                console.log(err);
            });
    },

    findOne : (req, res, next)=>{
        let url = `${req.originalUrl}`;
        let a = url.split("/");
        return request('GET', `${uri}/${a[2]}`, '').then(response => {
            if(typeof(response)!== 'object'){
                response = JSON.parse(response);
            }
            let url = `${req.hostname}${req.originalUrl}`;
            data = response;
            data.status = "success";
            data.details = {};
            data.details.url = url;
            data.row = data.data;
            // data.details.count = (data.row).length;
            delete data.data;
            return res.json(data);
        }).catch(err =>{
            console.log(err);
        })

    }

};