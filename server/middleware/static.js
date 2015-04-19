'use strict';

var express = require('express');
module.exports = function (options, app, PROD) {
    var root = options.root;
    delete options.root;
    return express.static(root, options);
};