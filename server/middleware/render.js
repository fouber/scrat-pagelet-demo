module.exports = function(options, app, PROD){
    return function(req, res, next){
        var page = req.params.page.split('/');
        var last = page[page.length - 1];
        if(last.indexOf('.') === -1){
            page.push(last);
        }
        page = page.join('/');
        try {
            res.render(page, res.locals);
        } catch (e){
            res.status(404).send('Not found');
        }
    }
};