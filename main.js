
var fs = require('fs');
var Promise = require('promise');
var request = require('request');

  requestPage('http://jsonplaceholder.typicode.com/users').then(logRes);

exports.handler = function(event, context) {

  //readFile('package.json','utf8').then(parseJSON).then(logRes).catch(logRes);
  requestPage('http://www.freecodecamp.com/the-fastest-web-page-on-the-internet').then(logRes).catch(context.fail);
  requestPage('http://jsonplaceholder.typicode.com/users').then(logRes).then(context.succeed).catch(context.fail);
};

function requestPage(address){
  return new Promise(function(fulfill, reject){
    request(address, function(err, res, body){
      if(err) reject(err);
      else{
        fulfill(res.statusCode);
      }
    });
  });
}

function readFile(filename, enc){
  return new Promise(function(fulfill, reject){
    fs.readFile(filename, enc, function(err, res){
      if(err) reject(err);
      else fulfill(res);
    });
  });
}

function readJSON(file){
  return readFile(file,'utf8').then(JSON.parse);
}

function logRes(thing){
  return new Promise(function(fulfill, reject){
    try {
      console.log(thing);
    } catch (e) {
      reject(e);
    }
    fulfill(thing);
  });
}

function parseJSON(toParse){
  return new Promise(function(fulfill, reject) {
    try {
      fulfill(JSON.parse(toParse));
    } catch (e) {
      reject(e);
    }
  });
}
