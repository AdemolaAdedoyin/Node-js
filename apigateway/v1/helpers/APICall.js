'use strict';
/****
 * Author: ifeoluwa.afolabi@algorismng.com
 */
const request = require('request-promise');
/****
 *
 * @param method
 * @param uri
 * @param token
 * @param data
 * @returns {Promise.<TResult>}
 * @constructor
 */
const APICall = (method, uri, token, data = null) => {
    //Options to be passed with request

    let options = {
        method: method,
        uri: uri,
        resolveWithFullResponse: true
    };
    //send form data only if the data parameter was passed
    if (data !== null) {
        options.form = data;
    }

    if(token!==0){
        options.headers = {
            token:token
        };
    }

    return request(options).then((response) => {

        return response.body;
    }).catch((err) => {
        //return err;
        return ({error: err});
    });
};
module.exports = APICall;