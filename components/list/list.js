pagelet.router(/^\/(\w+)(?:\?detail=(.*))?$/, function(ctx, options, event, next){
    $('.list .email-item[data-id]')
        .removeClass('email-item-selected');
    next();
});

pagelet.router('/:page?detail=:id', function(ctx, options, event, next){
    $('.list .email-item[data-id="' + ctx.id + '"]')
        .removeClass('email-item-unread')
        .addClass('email-item-selected');
    next();
});