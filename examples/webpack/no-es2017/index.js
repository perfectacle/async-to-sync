// You must import babel-polyfill before async-to-sync.
import 'babel-polyfill';
import ats from 'async-to-sync/module/no-es2017';
// If you want to use ES2015+, please use transpiler like babel.

var fallback = function(e) {
  alert('Error: ' + e);
};

var xhr = function(url, method) {
  method = method || 'get';
  return new Promise(function(res, rej) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = "json";
    xhr.onreadystatechange = function() {
      if(xhr.readyState === 4) { // 4 means request is done.
        if(xhr.status === 200) { // 200 means status is successful
          res(xhr.response);
        } else {
          rej(xhr.status);
        }
      }
    };
    xhr.send();
  });
};

var _fetch = function(url, method, headers, body) {
  method = method || 'get';
  headers = headers || null;
  body = body || null;
  return fetch(url, {
    method, headers, body
  }).then(res => res.json({}));
};

// You must add cb(callback) parameter
var a = function(cb) {
  setTimeout(function() {
    console.log(123);
    // You must execute callback function.
    cb();
  }, 2000);
};
// You must add cb(callback) parameter last
var b = function(b, cb) {
  setTimeout(function() {
    console.log(b);
    cb();
  }, 1000);
};
var c = function(url) {
  xhr(url).then(function(data) {
    console.log(data);
  }).catch(function(e) {
    fallback(e)
  });
};
var d = function(url) {
  _fetch(url).then(function(data) {
    console.log(data);
  }).catch(function(e) {
    fallback(e)
  });
};

var arrUrl = [
  'https://perfectacle.github.io/mock/test.json',
  'https://perfectacle.github.io/mock/test2.json'
];

var arrAsync = [
  a,
  // If You want to pass arguments or bind this, You could use bind method.
  c.bind(null, arrUrl[0]),
  b.bind(null, 2),
  a,
  d.bind(null, arrUrl[1]),
  b.bind(null, 33)
];

ats(arrAsync, fallback);