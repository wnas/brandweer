/*
 cycle.js
 2013-02-19

 Public Domain.

 NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.

 This code should be minified before deployment.
 See http://javascript.crockford.com/jsmin.html

 USE YOUR OWN COPY. IT IS EXTREMELY UNWISE TO LOAD CODE FROM SERVERS YOU DO
 NOT CONTROL.
 *//*jslint evil: true, regexp: true *//*members $ref, apply, call, decycle, hasOwnProperty, length, prototype, push,
 retrocycle, stringify, test, toString
 */typeof JSON.decycle!="function"&&(JSON.decycle=function(t){"use strict";console.log("decycle");var n=[],r=[];return function i(e,t){var s,o,u;if(typeof e!="object"||e===null||e instanceof Boolean||e instanceof Date||e instanceof Number||e instanceof RegExp||e instanceof String)return e;for(s=0;s<n.length;s+=1)if(n[s]===e)return{$ref:r[s]};n.push(e);r.push(t);if(Object.prototype.toString.apply(e)==="[object Array]"){u=[];for(s=0;s<e.length;s+=1)u[s]=i(e[s],t+"["+s+"]")}else{u={};for(o in e)Object.prototype.hasOwnProperty.call(e,o)&&(u[o]=i(e[o],t+"["+JSON.stringify(o)+"]"))}return u}(t,"$")});typeof JSON.retrocycle!="function"&&(JSON.retrocycle=function retrocycle($){"use strict";var px=/^\$(?:\[(?:\d+|\"(?:[^\\\"\u0000-\u001f]|\\([\\\"\/bfnrt]|u[0-9a-zA-Z]{4}))*\")\])*$/;(function rez(value){var i,item,name,path;if(value&&typeof value=="object")if(Object.prototype.toString.apply(value)==="[object Array]")for(i=0;i<value.length;i+=1){item=value[i];if(item&&typeof item=="object"){path=item.$ref;typeof path=="string"&&px.test(path)?value[i]=eval(path):rez(item)}}else for(name in value)if(typeof value[name]=="object"){item=value[name];if(item){path=item.$ref;typeof path=="string"&&px.test(path)?value[name]=eval(path):rez(item)}}})($);return $});