pagelet.router('/:page', function(ctx, options, event, next){
    if(/^\w+$/.test(ctx.page)){
        $('.nav a[data-name]')
            .removeClass('active');
        $('.nav a[data-name="' + ctx.page + '"]')
            .addClass('active');
    }
    next();
});