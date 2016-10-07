 
var request = require('request');
var archive = require('/Users/student/Desktop/2016-09-web-historian/helpers/archive-helpers.js');
var Promise = require('bluebird');
// var url = "http://hackreactor.com";

// request(url, function(err, res, body) {
//   console.log(body);
// });

// http://
// google.com

// archive.readListOfUrlsPromise()
//   .then(function(dataArr) {
//     console.log(dataArr);
//   })
//   .catch(function(err) {
//     console.log("err: " + err);
//   });

// archive.readListOfArchivedUrlsPromise()
//   .then(function(arr) {
//     console.log(arr);
//   })
//   .catch(function(err) {
//     console.log('this is an err' + err);
//   });

archive.addUrlToListPromise('testing')
  .then(function(data) {

  })
  .catch(function(err) {

  });