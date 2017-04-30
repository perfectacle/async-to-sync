// If you want to use import syntax, please use transpiler like babel.
const ats = require('async-to-sync');

const fallback = e => alert('Error: ' + e);

const xhr = (url, method='get') => (
  new Promise(function(res, rej) {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.responseType = "json";
    xhr.onreadystatechange = () => {
      if(xhr.readyState === 4) { // 4 means request is done.
        if(xhr.status === 200) { // 200 means status is successful
          res(xhr.response);
        } else {
          rej(xhr.status);
        }
      }
    };
    xhr.send();
  })
);

const _fetch = (url, method='get', headers=null, body=null) => (
  fetch(url, {
    method, headers, body
  }).then(res => res.json({}))
);

// You must add cb(callback) parameter
const a = cb => setTimeout(() => {
  console.log(1);
  // You must execute callback function.
  cb();
}, 2000);
// You must add cb(callback) parameter last
const b = (b, cb) => setTimeout(() => {
  console.log(b);
  cb();
}, 1000);
const c = (url, cb) => xhr(url).then(data => {
  console.log(data);
  cb();
});
const d = (url, cb) => _fetch(url).then(data => {
  console.log(data);
  cb();
});

const arrUrl = [
  'https://perfectacle.github.io/mock/test.json',
  'https://perfectacle.github.io/mock/test2.json'
];

const arrAsync = [
  a,
  // If You want to pass arguments or bind this, You could use bind method.
  c.bind(null, arrUrl[0]),
  // You also can use ES2015 arrow function for pass arguments,
  // but you must also pass callback function parameter too.
  cb => b(2, cb),
  a,
  cb => d(arrUrl[1], cb),
  b.bind(null, 33)
];

ats(arrAsync, fallback);