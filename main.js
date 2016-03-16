console.log('Loading function!');
var fs = require('fs');
var Promise = require('promise');
var request = require('request');


//readFile('sample.txt','utf8').then(logTest).then(console.log);
//readFile('sample.txt','utf8').then(console.log);
// requestPage('http://www.freecodecamp.com/the-fastest-web-page-on-the-internet').then(logTest).then(console.log).catch(console.log);
// requestPage('http://www.google.com').then(logTest).then(console.log).catch(console.log);


exports.handler = function(event, context) {

  //console.log('TEST');
  //readFile('sample.txt','utf8').then(console.log);
  //readFile('sample.txt','utf8').then(logTest).then(console.log);
  //readFile('sample.txt','utf8').then(logTest).then(context.succeed);
  //requestPage('http://www.freecodecamp.com/the-fastest-web-page-on-the-internet').then(logTest).then(console.log).catch(console.log);
  //requestPage('http://www.freecodecamp.com/the-fastest-web-page-on-the-internet').then(logTest).then(context.succeed(event.key3)).catch(console.log);

  requestPage('http://www.freecodecamp.com/the-fastest-web-page-on-the-internet').then(logTest).then(context.succeed).catch(context.fail);


  //console.log('value1 =', event.key1);
  //console.log('value2 =', event.key2);
  //console.log('value3 =', event.key3);
  //context.succeed(event.key1);  // Echo back the first key value
  // context.fail('Something went wrong');

  function readFile(filename, enc){
    //console.log("readFile");
    return new Promise(function(fulfill, reject){
      fs.readFile(filename, enc, function(err, res){
        if(err) reject(err);
        else fulfill(res);
      });
    });
  }

  function requestPage(address){
    //console.log("requestPage");
    return new Promise(function(fulfill, reject){
      request(address, function(err, res, body){
        if(err) reject(err);
        else{
          fulfill(res.statusCode);
        }
      });
    });
  }

  function logTest(thing){
    //console.log("logTest");
    return new Promise(function(fulfill, reject){
      try {
        var res = thing+" \nLOLOLOLO";
      } catch (err) {
        reject(err);
      }
      fulfill(res);
    });
  }

};

// function readFile(filename, enc){
//   return new Promise(function(fulfill, reject){
//     fs.readFile(filename, enc, function(err, res){
//       if(err) reject(err);
//       else fulfill(res);
//     });
//   });
// }
//
// function requestPage(address){
//   return new Promise(function(fulfill, reject){
//     request(address, function(err, res, body){
//       if(err) reject(err);
//       else{
//         fulfill(res.statusCode);
//       }
//     });
//   });
// }
//
// function logTest(thing){
//   return new Promise(function(fulfill, reject){
//     try {
//       var res = thing+" LOLOLOLO";
//     } catch (err) {
//       reject(err);
//     }
//     fulfill(res);
//   });
// }

//if(!other_argument) throw Error('Two args required');
