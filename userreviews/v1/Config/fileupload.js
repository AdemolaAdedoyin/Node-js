'use strict';
let AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');
let s3 = new AWS.S3();
let s1 = require('s3');
const path = require('path');
const fs = require('fs');

//const S3 = require('s3');
//let options = {
//  s3Client: awsS3Client,
//  // more options available. See API docs below.
//};
//let client = s3.createClient(options);

/********************
 * 
 * @param {binary object} upload
 * @returns {String} (new File Name)
 */
module.exports = function (upload) {
    let region = "eu-central-1";
    var uploadParams = {Bucket: 'get-rates-banks-re-test-2', Key: '', Body: '', ACL:"public-read-write"};
    var fileStream = fs.createReadStream(upload);
    fileStream.on('error', function (err) {
        console.log('File Error', err);
    });
    uploadParams.Body = fileStream;

    uploadParams.Key = path.basename(upload);
    console.log(path.basename(upload));
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            console.log("Error", err);
        }
        if (data) {
            console.log("Upload Success", data.Location);
        }
    });

    // console.log(s1.getPublicUrl(uploadParams.Bucket, uploadParams.Key, region));

    // let s3Bucket = new AWS.S3({params: {Bucket: 'get-rates-banks-re-test-2'}});
    // let urlParams = {Bucket: 'get-rates-banks-re-test-2', Key: '',Expires: 604800};
    // urlParams.Key = path.basename(upload);
    let ret_file = s1.getPublicUrl(uploadParams.Bucket, uploadParams.Key, region);
    if(ret_file){
        return ret_file;
    }
    else{
        return 0;
    }
    // console.log(ret_file);
    // s3Bucket.getSignedUrl('getObject', urlParams, function (err, url) {
    //     //console.log('the url of the image is', url);
    //     ret_file = url;
    //     return url;
    // });

};

