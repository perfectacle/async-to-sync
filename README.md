# async-to-sync
It is help you for Javascript asynchronous function to synchronous function.  
You don't should know async/await, also Promise!!

## Why did you make async-to-sync
Finally, [async/await](https://github.com/tc39/ecmascript-asyncawait) added ES2017(isn't publish yet).  
async/await is help you for Javascript asynchronous function to synchronous function.  
But, it isn't use to easy, also you have to know Promise in ES2015.  
So, I made it easy to use async/await & Promise for asynchronous function to synchronous function.  

## Getting Started
### Installation
#### npm
```bash
npm i -S async-to-sync
```
#### yarn
```bash
yarn add async-to-sync
```

### Usage
If you didn't know browser or node of supported status, you would visit below link.  
[ECMAScript 6 compatibility table | Promise](https://kangax.github.io/compat-table/es6/#test-Promise)  
[Node.js ES2015/ES6 | Promise](http://node.green/#ES2015-built-ins-Promise)  
[ECMAScript 2016+ compatibility table | async](http://kangax.github.io/compat-table/es2016plus/#test-async_functions)
[Node.js ES2017 support | async](hhttp://node.green/#ES2017-features-async-functions)  

#### How to import async-to-sync
##### In webpack
###### In async/await & Promise support browser
```javascript
import ats from 'async-to-sync';
```
###### In async/await & Promise or ES2015 not support browser
You must use [babel-polyfill](https://babeljs.io/docs/usage/polyfill/).  
You must import babel-polyfill before async-to-sync.  
And you don't like to transpile ES2015+ to ES5 using babel, dont't use ES2015 Syntax. (for IE)
```javascript
import 'babel-polyfill';
import ats from 'async-to-sync/module/no-es2017';
```

##### In browser (CDN isn't support yet, just wait a minute!)
###### In async/await & Promise support browser
```html
<script src="node_modules/async-to-sync-test/browser/es2017/index.min.js"></script>
```

###### In async/await & Promise or ES2015 not support browser
You must use babel-polyfill.  
You must import babel-polyfill before async-to-sync.  
And you don't like to transpile ES2015+ to ES5 using babel, dont't use ES2015 Syntax. (for IE)
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.23.0/polyfill.min.js"></script>
<script src="node_modules/async-to-sync-test/browser/no-es2017/index.min.js"></script>
```

##### In Node.js
###### In async/await & Promise support Node
```javascript
const ats = require('async-to-sync');
```
###### In async/await & Promise or ES2015 not support Node
You must use [babel-polyfill](https://babeljs.io/docs/usage/polyfill/).  
You must import babel-polyfill before async-to-sync.  
```javascript
require('babel-polyfill');
const ats = require('async-to-sync/module/no-es2017');
```

#### How to use
You have some asynchronous function,  
* setTimeout(or setInterval)  
```javascript
var a = function() {
  setTimeout(function() {
    console.log(123);
  }, 2000);
};

var b = function(b) {
  setTimeout(function() {
    console.log(b);
  }, 1000);
};
```
* AJAX(Asynchronous Javascript And XML)  
you can use third-party like bluebird, axios, jQuery slim.  
If you used XHR(XMLHttpRequest) or fetch, you should use Promise.  
then method is success callback function.  
catch method is fail callback function.  
`Attention!`  
Some AJAX request becomes a problem in IE 9, but it isn't async-to-sync's problem.  
Please read below link.  
* [Can I Use Cross-Origin Resource Sharing?](http://caniuse.com/#feat=cors)  
* [IE9 jQuery AJAX with CORS returns “Access is denied”](http://stackoverflow.com/questions/10232017/ie9-jquery-ajax-with-cors-returns-access-is-denied)  
```javascript
var fallback = function(e) {
  alert('Error: ' + e);
}

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
```

`Attention!`  
You must follow some rules.  
* Add callback function parameter to your asynchronous function.  
* Execute callback function in your asynchronous function last.  
```javascript
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

var c = function(url, cb) {
  xhr(url).then(function(data) {
    console.log(data);
    cb();
  }).catch(function(e) {
        fallback(e)
  });
};

var d = function(url, cb) {
  _fetch(url).then(function(data) {
    console.log(data);
    cb();
  }).catch(function(e) {
    fallback(e)
  });
};
```

##### Real usage
###### ats(Array arrAsync[, Function fallback])  
1. arrAsync's Type is Array.  
It contains asynchronous functions.  
They execute synchronous.  
2. fallback's Type is Function, it is optional.  
It execute when an error occurs, then rest functions are stop.  
```javascript
var arrUrl = [
  'https://perfectacle.github.io/mock/test.json',
  'https://perfectacle.github.io/mock/test2.json'
];

var arrAsync = [
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
```

#### Support Platform
![Chrome](imgs/chrome.png) | ![Firefox](imgs/firefox.jpg) | ![IE](imgs/IE.png)| ![Node.js](imgs/node.png)|
--- | --- | --- | --- |
Latest ✔ | Latest ✔ | 9+ ✔ |  6+ ✔ |
