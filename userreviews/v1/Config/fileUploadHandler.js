

'use strict';

const path = require('path');
const md5 = require('js-md5');
const fs = require('fs');
const upload1 = require('./fileupload');

/********************
 * 
 * @param {binary object} upload
 * @returns {String} (new File Name)
 */
module.exports = function (upload) {

  /****
   *  what say we make new_file_name a hashed random number
   *  for that extra dramatic effect? ;)
   */
  let mime_type = (upload.mimetype);
  let ext = (mime_type.split('/'))[1];

  const file_name = md5(Math.floor((Math.random() * 98093857) + 87654) + upload.name) + '.'+ext;
  const file = path.join(__dirname, `../public/uploads/${file_name}`);
  console.log(file)
  const ret_file = file_name;

  //move the file
  upload.mv(file, function (err) {
    
    
    if (err) {
      console.log(`error: ${err}`);
      //res.status(500).send(err);
      return;
    }
  });
  //let s3File = upload1(ret_file);
  return upload1(file);
  
};
    
