function getItems(callback){
    callback({
        inbox: { label: 'Inbox', href: '/inbox', count: 0 },
        important: { label: 'Important', href: '/important', count: 0 },
        sent: { label: 'Sent', href: '/sent', count: 0 },
        drafts: { label: 'Drafts', href: '/drafts', count: 0 },
        trash: { label: 'Trash', href: '/trash', count: 0 }
    });
}

module.exports = function(page, callback){
    getItems(function(items){
        var nav = { items: items };
        var is404 = false;
        if(items.hasOwnProperty(page)){
            nav.current = page;
            // items[page].href = 'javascript:;';
            items[page].status = 'active';
        } else {
            is404 = true;
        }
        callback(is404, nav);
    });
};