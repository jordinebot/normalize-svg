var path = require('path');
var fs = require('fs');
var xmldom = require('xmldom');
/**
 * Promise all
 * @author Loreto Parisi (loretoparisi at gmail dot com)
 */
function promiseAllP(items, block) {
  var promises = [];
  items.forEach(function(item, index) {
    promises.push(
      (function(item, i) {
        return new Promise(function(resolve, reject) {
          return block.apply(this, [item, index, resolve, reject]);
        });
      })(item, index),
    );
  });
  return Promise.all(promises);
} //promiseAll

/**
 * read files
 * @param dirname string
 * @return Promise
 * @author Loreto Parisi (loretoparisi at gmail dot com)
 * @see http://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
 */
function readFiles(dirname) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, function(err, filenames) {
      if (err) return reject(err);
      promiseAllP(filenames, (filename, index, resolve, reject) => {
        fs.readFile(path.resolve(dirname, filename), 'utf-8', function(
          err,
          content,
        ) {
          if (err) return reject(err);
          return resolve({filename: filename, contents: content});
        });
      })
        .then(results => {
          return resolve(results);
        })
        .catch(error => {
          return reject(error);
        });
    });
  });
}

var DOMParser = require('xmldom').DOMParser;
var parser = new DOMParser();

readFiles('./data/')
  .then(files => {
    console.log('loaded ', files.length);
    files.forEach((item, index) => {
      var svg = parser.parseFromString(item.contents, 'image/svg+xml');
      var viewBox = svg.getElementsByTagName('svg')[0].getAttribute('viewBox');
    });
  })
  .catch(error => {
    console.log(error);
  });
