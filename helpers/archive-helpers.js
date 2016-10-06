var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../web/archives/sites'),
  list: path.join(__dirname, '../web/archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  // console.log('called');  
  fs.readFile(exports.paths['list'], function(err, data) {
    // console.log(data.toString().split('\n'));
    cb(data.toString().split('\n'));
  });
};

exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(urlArray) {
    cb(_.contains(urlArray, url));
  });
};

exports.addUrlToList = function(url, cb) {
  fs.appendFile(exports.paths['list'], url + '\n', function(err, data) {
    cb();
  });
};

exports.isUrlArchived = function(url, cb) {
  // cant use sync in future
  cb(fs.existsSync(exports.paths['archivedSites'] + '/' + url + '.html'));
};

exports.downloadUrls = function(urlArray) {
  // for each url in array
  urlArray.forEach( (url) => {
    var filename = exports.paths['archivedSites'] + '/' + url + '.html';
    if (!fs.existsSync(filename)) {
    // We use fs.openSync to create the file
      var file = fs.openSync(filename, 'w');
      fs.closeSync(file);
      // store everything from website there

      var options = {
        host: url,
        port: 80
      };

      http.get(options, (res) => {
        var body = '';
        res.on('data', (currItem)=> {
          body += currItem;
        });
        res.on('end', () => {
          fs.writeFile(filename, body, (error) => {} );
        });
      });

    }
  });
};
