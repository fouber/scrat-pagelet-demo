var timer, last,
    wrapper = $('.progress'), inner = $('#progress-inner');

pagelet.on(pagelet.EVENT_BEFORE_LOAD, function(){
    last = Date.now();
    wrapper.css('display', 'block');
    clearTimeout(timer);
});

pagelet.on(pagelet.EVENT_LOAD_PROGRESS, function(data){
    var e = data.event;
    var percent = e.loaded / e.total * 100;
    inner.width(percent + '%');
});

pagelet.on(pagelet.EVENT_LOAD_COMPLETED, function(){
    inner.width('100%');
    var delay = 200;
    var delta = Date.now() - last;
    if(delta < 300){
        delay += 300 - delta;
    }
    timer = setTimeout(function(){
        wrapper.css('display', 'none');
        inner.width(0);
    }, delay);
});