'use strict';
const request = require('../../helpers/APICall');
// let uri = "http://get-rates-news.herokuapp.com/news";
let uri = "http://localhost:9080/news";

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
        return request('GET', uri, '')
            .then(response =>{
                let url = `${req.hostname}${req.originalUrl}`;
                if(typeof(response) !== 'object'){
                    response = JSON.parse(response);
                }
                data = response;
                data.status = "success";
                data.details = {};
                data.details.url = url;
                data.details.count = (data.data).length;
                data.row = data.data;
                delete data.data;
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