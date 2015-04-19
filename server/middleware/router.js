'use strict';

var express = require('express'),
    router = express.Router();

router.get('/', function (req, res) {
    res.redirect('/inbox');
});

router.get('/api', function (req, res) {
    res.json({title: 123});
});

router.get('/:page', function(req, res, next){
    req.url = '/index';
    var page = req.params.page;
    var navService = require('../service/nav');
    res.locals.title = '首页';
    navService(page, function(is404, nav){
        res.locals.page404 = is404;
        res.locals.nav = nav;
        if(is404){
            next();
        } else {
            res.locals.title = page;
            var listService = require('../service/list');
            var detail = req.query.detail;
            listService(page, detail, function(is404, list) {
                res.locals.list = list;
                res.locals.list404 = is404;
                if (!is404 && detail) {
                    var detailService = require('../service/detail');
                    detailService(detail, function (is404, detail) {
                        res.locals.detail404 = is404;
                        if(!is404){
                            res.locals.title = detail.subject + ' - ' + page;
                        }
                        res.locals.detail = detail;
                        next();
                    });
                } else {
                    next();
                }
            });
        }
    });
});

module.exports = function (options) {
    router.options = options || {};
    return router;
};