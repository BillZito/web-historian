#!/usr/local/bin/node

var fs = require('fs');
var archive = require('/Users/student/Desktop/2016-09-web-historian/helpers/archive-helpers.js');

// archive.downloadUrls(['www.google.com', 'www.amazon.com']);
// archive.readListOfUrls()(dataArr) => {
//   archive.downloadUrls(dataArr);
// });




var basePath = '/Users/student/Desktop/2016-09-web-historian/workers/log.text';
if (!fs.existsSync(basePath)) {
    // We use fs.openSync to create the file
  var file = fs.openSync(basePath, 'w');
  fs.writeFile(basePath, 'created the first one');
  fs.closeSync(file);
} else {
  fs.appendFile(basePath, 'we ran one cron');
}

archive.readListOfUrlsPromise()
  .then(function(dataArr) {
    archive.downloadUrls(dataArr);
  }).catch(function(err) {
    fs.appendFile(basePath, err);
  });
