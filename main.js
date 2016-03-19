
var fs = require('fs');
var Promise = require('promise');
var request = require('request');

  //requestPage('http://jsonplaceholder.typicode.com/users').then(parseJSON).catch(logRes).done(jsontest);
  readFile('package.json','utf8').then(parseJSON).catch(logRes).done(jsontest);

exports.handler = function(event, context) {

  //readFile('package.json','utf8').then(parseJSON).then(logRes).catch(logRes);
  requestPage('http://www.freecodecamp.com/the-fastest-web-page-on-the-internet').then(logRes).catch(context.fail);
  requestPage('http://jsonplaceholder.typicode.com/users').then(logRes).then(context.succeed).catch(context.fail);
};

function jsontest(parsedJson){
  console.log(parsedJson.version);
  //return(true);
  //console.log(parsedJson.id['2']);
}

function requestPage(address){
  return new Promise(function(fulfill, reject){
    request(address, function(err, res, body){
      if(err) reject(err);
      else{
        if (res.statusCode !== 200) {
          reject('Invalid Status Code Returned:', res.statusCode);
        }else{
          fulfill(res.body);
        }
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
