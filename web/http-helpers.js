var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  //serve at beginning
  fs.readFile(archive.paths.siteAssets + asset, function(err, data) {
    callback(data);
  });
};

exports.serveArchives = function(res, asset, callback) {
  //write back the archive page
  fs.readFile(archive.paths.archivedSites + asset, function(err, data) {
    callback(data);
  });
};


// As you progress, keep thinking about what helper functions you can put here!
