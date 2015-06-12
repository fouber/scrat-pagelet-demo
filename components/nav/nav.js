pagelet.router(/^\/(\w+)/, function(ctx, options, event, next){
    var page = ctx[1];
    if(/^\w+$/.test(page)){
        $('.nav a[data-name]')
            .removeClass('active');
        $('.nav a[data-name="' + page + '"]')
            .addClass('active');
    }
    next();
});