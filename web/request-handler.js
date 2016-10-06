var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelper = require('./http-helpers');
var fs = require('fs');
var http = require('http');
// require more modules/folders here!


exports.handleRequest = function (req, res) {

  if (req.method === 'POST' && req.url === '/') {
    // archive.downloadUrls(['www.google.com']);
    var jsonData = '';
    req.on('data', function(data) {
      jsonData += data;
    });

    req.on('end', function() {
      var url = JSON.parse(jsonData).url;
      console.log(url);
      archive.isUrlArchived(url, function(exists) {
        console.log(exists);
        if (exists) {
          // Redirect to the site

         res.statusCode = 200;
         // send the desired new url back to the index.html page
         res.end('archive/' + url);

        } else {
          archive.isUrlInList(url, function(inList) {
            if (inList) {
              //Redirect to loading
              res.statusCode = 200; 
              res.end('loading');
            } else {
              archive.addUrlToList(url, function() {});

            }
          });
        }
      });
      // comment these back in evntually
      // res.writeHead(200, httpHelper.headers);
      // res.end(archive.paths.list);
    });



  } else if (req.method === 'GET' && req.url === '/') {
    //renders index.html at beginning
    httpHelper.serveAssets(res, '/index.html', function(data) {
      res.writeHead(200, httpHelper.headers);
      res.end(data);
    });

  } else if (req.method === 'GET' && req.url.indexOf('archive') !== -1) {
    //when we redirect to the archives url, have it read the new page
    httpHelper.serveArchives(res, req.url.slice(8), function(data) {
      res.writeHead(200, httpHelper.headers);
      res.end(data);
    });

  } else if (req.method === 'GET' && req.url === '/loading.html') {
    httpHelper.serveAssets(res, '/loading.html', function(data) {
      res.writeHead(200, httpHelper.headers);
      res.end(data);
    });
  } else {
    //renders page assets at beginning
    httpHelper.serveAssets(res, req.url, function(data) {
      res.writeHead(200, httpHelper.headers);
      res.end(data);
    });
  }

  
};
