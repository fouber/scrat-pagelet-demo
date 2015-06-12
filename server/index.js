'use strict';

var meta = require('../package.json'),
    express = require('express'),
    path = require('path'),
    app = module.exports = express(),
    root = path.resolve(__dirname, '../').replace(/\/+$/, ''),
    PROD = (app.get('env') || '').toLocaleLowerCase() === 'production';

process.on('uncaughtException', function (err) {
    (app.get('logger') || console).error('Uncaught exception:\n', err.stack);
});

app.set('name', meta.name);
app.set('version', meta.version);
app.set('port', process.env.PORT || 5000);
app.set('root', root);
app.set('logger', console);
app.enable('trust proxy');

var middleware = {
    combo: {
        root: root + '/public',
        cache: PROD
    },
    proxy: {
        target: 'http://cors-api-host'
    },
    static: {
        root: root + '/public',
        maxAge: PROD ? Infinity : 0
    },
    error: {},
    engine: {
        root: root + '/views',
        ext: 'tpl',
        scrat: {
            map: root + '/config/map.json',
            cacheMap: PROD,
            logger: console
        },
        swig: {
            cache: PROD ? 'memory' : false
        }
    },
    router: {
        index: '/index'
    },
    render: {}
};
for (var key in middleware) {
    if (middleware.hasOwnProperty(key)) {
        Object.defineProperty(middleware, key, {
            value: require('./middleware/' + key)(middleware[key], app, PROD),
            enumerable: true
        });
    }
}
//app.use(compress()); //Use gzip in nginx, instead of in nodejs.
app.use('/co', middleware.combo);
app.use('/public', middleware.static);
// app.use('/api/*', middleware.proxy);
app.use('/:page', middleware.engine);
app.use(middleware.router);
app.use('/:page', middleware.render);
app.use(middleware.error);

if (require.main === module) {
    app.listen(app.get('port'), function () {
        console.log('[%s] Express server listening on port %d',
            app.get('env').toUpperCase(), app.get('port'));
    });
}