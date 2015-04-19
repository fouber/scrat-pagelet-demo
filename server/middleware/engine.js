var engine = require('scrat-swig');
module.exports = function(options, app, PROD){
    var ext = options.ext || 'tpl';
    app.set('view engine', ext);
    app.set('views', options.root);
    app.engine(ext, engine.renderFile);
    if(options.swig){
        engine.setDefaults(options.swig);
    }
    return engine.middleware(options.scrat || {});
};