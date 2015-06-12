;(function (global) {
    // 注册给全局的函数
    var pagelet = global.pagelet = {};
    // 已加载资源记录，用于去重
    var loaded = {};
    // 判断是否为旧版本浏览器
    var isOldWebKit = +navigator.userAgent.replace(/.*AppleWebKit\/(\d+)\..*/, '$1') < 536;
    // document.head
    var head = document.head || document.getElementsByTagName('head')[0];
    // pagelet请求的默认超时时间，1分钟
    var TIMEOUT = 60 * 1000;
    // 是否需要combo，不用设置该项目，构建工具会生成
    var combo = false;
    // 默认的combo请求格式
    var DEFAULT_COMBO_PATTERN = '/co??%s';
    // combo url 长度限制
    var maxUrlLength = 2000;
    // combo请求格式，不用设置该项目，构建工具会生成
    var comboPattern = DEFAULT_COMBO_PATTERN;
    // 是否支持Html5的PushState
    var supportPushState =
        global.history && global.history.pushState && global.history.replaceState &&
            // pushState isn't reliable on iOS until 5.
        !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/);
    // 一个空函数
    function noop() {}

    /**
     * 加载js、css资源
     * @param url{String}
     * @param type{String} 'js' or 'css'
     * @param callback{Function}
     */
    function load(url, type, callback) {
        var isScript = type === 'js';
        var isCss = type === 'css';
        var node = document.createElement(isScript ? 'script' : 'link');
        var supportOnload = 'onload' in node;
        var done = function(err){
            clearTimeout(tid);
            clearInterval(intId);
            if(node){
                node.onload = node.onreadystatechange = noop;
                if (isScript && head && node.parentNode) {
                    head.removeChild(node);
                }
                node = null;
            }
            callback('err');
        };
        var tid = setTimeout(function () {
            done('timeout');
        }, TIMEOUT);
        var intId;
        if (isScript) {
            node.type = 'text/javascript';
            node.src = url;
        } else {
            if (isCss) {
                node.type = 'text/css';
                node.rel = 'stylesheet';
            }
            node.href = url;
        }
        node.onload = node.onreadystatechange = function () {
            if (node && (!node.readyState || /loaded|complete/.test(node.readyState))) {
                done();
            }
        };
        node.onerror = function (e) {
            e = (e || {}).error || new Error('load resource timeout');
            e.message = 'Error loading [' + url + ']: ' + e.message;
            done(e);
        };
        head.appendChild(node);
        if (isCss) {
            if (isOldWebKit || !supportOnload) {
                intId = setInterval(function () {
                    if (node.sheet) {
                        done();
                    }
                }, 20);
            }
        }
    }

    /**
     * 判断类型
     * @param obj{*}
     * @param type{String}
     */
    function is(obj, type) {
        return Object.prototype.toString.call(obj) === '[Object ' + type + ']';
    }

    /**
     * 添加资源，排重已加载资源
     * @param result{Array}
     * @param collect{Array}
     * @param type{String}
     */
    function addResource(result, collect, type) {
        if (collect && collect.length) {
            collect = collect.filter(function (uri) {
                var has = loaded[uri] === true;
                loaded[uri] = true;
                return !has;
            });
            if (collect.length) {
                if (combo) {
                    var comboUrl = '';
                    collect.forEach(function(uri){
                        if(comboUrl.length + comboPattern.length + uri.length > maxUrlLength){
                            result.push({
                                uri: comboPattern.replace('%s', comboUrl.substring(1)),
                                type: type
                            });
                            comboUrl = ',' + uri;
                        } else {
                            comboUrl += ',' + uri;
                        }
                    });
                    result.push({
                        uri: comboPattern.replace('%s', comboUrl.substring(1)),
                        type: type
                    });
                } else {
                    collect.forEach(function (uri) {
                        result.push({
                            uri: uri,
                            type: type
                        });
                    });
                }
            }
        }
    }

    /**
     * 执行页面脚本
     * @param code{String}
     */
    function exec(code) {
        var node = document.createElement('script');
        node.appendChild(document.createTextNode(code));
        head.appendChild(node);
    }

    /**
     * 数组元素非空过滤函数
     */
    function filter(item) {
        return !!item;
    }

    /**
     * 取消正在加载中的ajax请求
     * @param xhr{XMLHttpRequest}
     */
    function abortXHR(xhr) {
        if ( xhr && xhr.readyState < 4) {
            xhr.onreadystatechange = noop;
            xhr.abort();
        }
        clearTimeout(xhrTimer);
    }

    /**
     * 深度复制对象
     * @param obj{*}
     */
    function clone(obj){
        if(typeof obj === 'object'){
            var copy;
            if(obj instanceof Array){
                copy = [];
                obj.forEach(function(item, index){
                    copy[index] = clone(item);
                });
            } else {
                copy = {};
                for(var key in obj){
                    if(obj.hasOwnProperty(key)){
                        copy[key] = clone(obj[key]);
                    }
                }
            }
            return copy;
        } else {
            return obj;
        }
    }

    /**
     * 处理url匹配
     * @param pattern{String|RegExp}
     * @param pathname{String}
     * @param params{Object}
     */
    function match(pattern, pathname, params){
        var keys = [];
        var root = normalize('/').replace(/\/$/, '');
        if(pathname.indexOf(root) === 0){
            pathname = pathname.substring(root.length);
        }
        if(typeof pattern === 'string'){
            pattern = pattern.replace(/:(\w+)|[\.\\\+\*\?\[\^\]\$\(\){}=!<>\|:\/]/g, function (_, key) {
                if(key){
                    keys.push(key);
                    return '([\\w.\\-\\s]+)';
                } else if(_ === '*'){
                    return '.*?';
                } else {
                    return '\\' + _;
                }
            }) || '';
            pattern = new RegExp('^' + pattern + '$');
        }
        var match = pathname.match(pattern);
        if (!match) {
            return false;
        }
        params = params || {};
        match.forEach(function(m, i){
            params[keys[i-1] || i] = m;
        });
        return true;
    }

    /**
     * 匹配URL路径
     * @param options{Object}
     * @param event{Event}
     */
    function route(options, event){
        var moveOn = true;
        var next = function(){ moveOn = true; };
        var ctx = {};
        for(var i = 0, len = routers.length; i < len && moveOn; i++){
            var r = routers[i];
            if(match(r.reg, options.url, ctx)){
                moveOn = false;
                r.callback(ctx, options, event, next);
            }
        }
        return !moveOn;
    }

    /**
     * 格式化url
     * @param url{String}
     */
    function normalize(url){
        anchor.href = url;
        return anchor.href;
    }

    /**
     * 获取跳转pagelet
     * @param from{String}
     * @param to{String}
     */
    function getPagelets(from, to){
        from = normalize(from);
        to = normalize(to);
        return historyMap[from + MAP_CONCATOR + to] || historyMap[to + MAP_CONCATOR + from];
    }

    /**
     * 建立pagelet跳转映射表
     * @param from{String}
     * @param to{String}
     * @param pagelets{Array}
     */
    function setPagelets(from, to, pagelets){
        from = normalize(from);
        to = normalize(to);
        historyMap[from + MAP_CONCATOR + to] = pagelets;
        historyMap[to + MAP_CONCATOR + from] = pagelets;
    }

    var xhr, state, xhrTimer,
        listeners = {},
        routers = [],
        historyMap = {},
        MAP_CONCATOR = '<->',
        anchor = document.createElement('a');

    // pagelet加载前事件
    pagelet.EVENT_BEFORE_LOAD = 'before_load';
    // pagelet加载失败事件
    pagelet.EVENT_LOAD_ERROR = 'load_error';
    // pagelet加载完成事件
    pagelet.EVENT_LOAD_COMPLETED = 'load_completed';
    // pagelet跳转错误事件
    pagelet.EVENT_GO_ERROR = 'load_error';
    // popstate跳转错误事件
    pagelet.EVENT_BACK_ERROR = 'back_error';
    // pagelet跳转加载完毕事件
    pagelet.EVENT_GO_LOADED = 'go_loaded';
    // pagelet加载进度事件
    pagelet.EVENT_LOAD_PROGRESS = 'load_progress';
    // pagelet执行页面脚本开始前事件
    pagelet.EVENT_BEFORE_EXEC_SCRIPTS = 'before_exec_scripts';
    // pagelet执行页面脚本完成后事件
    pagelet.EVENT_AFTER_EXEC_SCRIPTS = 'after_exec_scripts';
    // pagelet处理html前事件
    pagelet.EVENT_BEFORE_INSERT_HTML = 'before_insert_html';
    // pagelet处理html后事件
    pagelet.EVENT_AFTER_INSERT_HTML = 'after_insert_html';
    // pagelet跳转前事件
    pagelet.EVENT_BEFORE_GO = 'before_go';
    // pagelet跳转后事件
    pagelet.EVENT_AFTER_GO = 'after_go';
    // pagelet跳转完成事件
    pagelet.EVENT_GO_COMPLETED = 'go_completed';

    /**
     * 事件绑定
     * @param type{String}
     * @param callback{Function}
     */
    pagelet.on = function(type, callback){
        var fns = listeners[type] || [];
        fns.push(callback);
        listeners[type] = fns;
    };

    /**
     * 解除事件绑定
     * @param type{String}
     * @param callback{Function}
     */
    pagelet.off = function(type, callback){
        var fns = listeners[type];
        if(fns){
            listeners[type] = fns.filter(function(fn){
                return fn !== callback;
            });
        }
    };

    /**
     * 事件派发
     * @param type{String}
     * @param data{*}
     */
    pagelet.emit = function(type, data){
        var fns = listeners[type];
        if(fns && fns.length){
            fns.forEach(function(cb){
                cb(data);
            });
        }
    };

    /**
     * pagelet初始化，不要手动调用此函数，该函数的调用是由框架生成的
     * @param cb{Boolean} 是否combo请求
     * @param cbp{String} combo请求格式
     * @param used{Array} 当前页面已加载过的资源
     */
    pagelet.init = function (cb, cbp, used) {
        combo = !!cb;
        comboPattern = cbp || DEFAULT_COMBO_PATTERN;
        if (used && used.length) {
            used.forEach(function (uri) {
                loaded[uri] = true;
            });
        }
    };

    /**
     * 设置加载超时时间
     * @param time {Number}
     */
    pagelet.timeout = function(time){
        TIMEOUT = time >> 0;
    };

    /**
     * 加载pagelet
     * @param options{Object}
     */
    pagelet.load = function (options) {
        var url = options.url,
            pagelets = options.pagelets,
            onComplete = options.complete || noop,
            onSuccess = options.success || noop,
            onError = options.error || noop,
            onProcess = options.progress || noop;
        if (pagelets && pagelets.length) {
            pagelet.emit(pagelet.EVENT_BEFORE_LOAD, { options: options });
            var callback = function(err, data, done){
                clearTimeout(xhrTimer);
                callback = noop;
                if(err){
                    pagelet.emit(pagelet.EVENT_LOAD_ERROR, { options: options, error: err });
                    onError(err);
                } else {
                    pagelet.emit(pagelet.EVENT_BEFORE_INSERT_HTML, { options: options, data: data });
                    if(onSuccess(data, done) !== false){
                        done();
                    }
                    pagelet.emit(pagelet.EVENT_AFTER_INSERT_HTML, { options: options, data: data });
                }
                pagelet.emit(pagelet.EVENT_LOAD_COMPLETED, { options: options, error: err, data: data });
                onComplete(err, data, done);
            };
            if (is(pagelets, 'String')) {
                pagelets = pagelets.split(/\s*,\s*/);
            }
            abortXHR(xhr);
            xhr = new global.XMLHttpRequest();
            xhr.onprogress = function(evt){
                var data = { options: options, event: evt };
                pagelet.emit(pagelet.EVENT_LOAD_PROGRESS, data);
                onProcess(data);
            };
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    xhr.onreadystatechange = noop;
                    var result, error = null;
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        result = xhr.responseText;
                        try {
                            result = JSON.parse(result);
                        } catch (e) {
                            error = e;
                        }
                        if (error) {
                            callback(error);
                        } else {
                            var res = [];
                            addResource(res, result.js, 'js');
                            addResource(res, result.css, 'css');
                            var _done = function(){
                                pagelet.emit(pagelet.EVENT_BEFORE_EXEC_SCRIPTS, result.script);
                                if (result.script && result.script.length) {
                                    var left = '!function(){';
                                    var right = '}();\n';
                                    var code = left + result.script.join(right + left) + right;
                                    exec(code);
                                }
                                //TODO input[autofocus], textarea[autofocus]
                                _done = noop;
                                pagelet.emit(pagelet.EVENT_AFTER_EXEC_SCRIPTS, result.script);
                            };
                            var done = function () { _done(); };
                            if (res && res.length) {
                                var len = res.length;
                                res.forEach(function (r) {
                                    load(r.uri, r.type, function (err) {
                                        len--;
                                        if (len === 0) {
                                            callback(error, result, done);
                                        }
                                        error = err;
                                    });
                                });
                            } else {
                                callback(error, result, done);
                            }
                        }
                    } else {
                        error = xhr.statusText || (xhr.status ? 'error' : 'abort');
                        callback(error);
                    }
                }
            };
            url += url.indexOf('?') === -1 ? '?' : '&';
            url += '_pagelets=' + pagelets.join(',');   //必须加上个query，猜猜为啥？
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.setRequestHeader('X-Pagelets', pagelets.join(','));
            xhr.send();
            xhrTimer = setTimeout(function(){
                callback('timeout');
            }, options.timeout || TIMEOUT);
        } else {
            location.href = url;
        }
    };

    /**
     * 压栈一个历史记录，返回一个函数，完成加载后调用
     * @param options{Object}
     * @return {Function}
     */
    pagelet.pushState = function(options){
        if(!state){
            state = {
                url: global.location.href,
                title: document.title
            };
            global.history.replaceState(state, state.title, state.url);
        }
        setPagelets(state.url, options.url, options.pagelets);
        var fn = options.replace ? 'replaceState' : 'pushState';
        global.history[fn](null, "", options.url);
        return function(title){
            state = {
                url: options.url,
                title: title
            };
            global.history.replaceState(state, title, options.url);
            // Clear out any focused controls before inserting new page contents.
            try {
                document.activeElement.blur();
            } catch (e) {}
        }
    };

    /**
     * pagelet跳转
     * @param options{Object}
     */
    pagelet.go = function (options) {
        var pagelets = options.pagelets;
        //url, pagelets, callback, progress
        if (supportPushState && pagelets) {
            pagelet.emit(pagelet.EVENT_BEFORE_GO, options);
            var opt = clone(options);
            opt.error = function(err){
                pagelet.emit(pagelet.EVENT_GO_ERROR, { options: options, error: err });
                if(typeof options.error === 'function'){
                    options.error(err);
                }
            };
            opt.success = function(data, done){
                pagelet.emit(pagelet.EVENT_GO_LOADED, {options: options, data: data});
                if(data.title){
                    document.title = data.title;
                } else {
                    data.title = document.title;
                }
                push(data.title);
                if(typeof options.success === 'function'){
                    var ret = options.success(data, done);
                    pagelet.emit(pagelet.EVENT_AFTER_GO, {options: options, data: data});
                    return ret;
                }
            };
            opt.complete = function(err, data, done){
                pagelet.emit(pagelet.EVENT_GO_COMPLETED, options);
                if(typeof options.complete === 'function'){
                    options.complete(err, data, done);
                }
            };
            if(!state){
                state = {
                    url: global.location.href,
                    title: document.title
                };
                global.history.replaceState(state, state.title, state.url);
            }
            pagelet.load(opt);
            var push = xhr.readyState > 0 ? pagelet.pushState(options) : noop;
        } else {
            location.href = url;
        }
    };

    /**
     * 添加router，在pagelet跳转和popstate过程中拦截处理
     * @param pattern{String|RegExp}
     * @param callback{Function}
     */
    pagelet.router = function(pattern, callback){
        routers.push({
            reg: pattern,
            callback: callback
        });
    };

    /**
     * 启动A标签跳转拦截
     * @param defaultPagelet{String|Array} 默认的pagelet id
     * @param eventType {String} 拦截事件，默认是click
     */
    pagelet.autoload = function(defaultPagelet, eventType){
        if(supportPushState){
            if(typeof defaultPagelet === 'string'){
                defaultPagelet = [ defaultPagelet ];
            }
            eventType = eventType || 'click';
            global.addEventListener('popstate', function (e) {
                if (e.state) {
                    var pagelets = defaultPagelet;
                    if(state){
                        var p = getPagelets(state.url, e.state.url);
                        if(p){
                            pagelets = p;
                        } else {
                            setPagelets(state.url, e.state.url, pagelets);
                        }
                    }
                    state = e.state;
                    if(pagelets){
                        var opt = {};
                        opt.url = state.url;
                        opt.pagelets = pagelets;
                        opt.isBack = true;
                        opt.error = function(err){
                            pagelet.emit(pagelet.EVENT_BACK_ERROR, { options: opt, error: err});
                            location.replace(opt.url);
                        };
                        if(!route(opt, e)){
                            opt.success = function(data){
                                if(data.title){
                                    document.title = data.title;
                                }
                                var html = data.html;
                                for (var key in html) {
                                    if (html.hasOwnProperty(key)) {
                                        var dom = document.querySelector('[data-pagelet="' + key + '"]');
                                        if (dom) {
                                            dom.innerHTML = html[key];
                                            dom = null;
                                        } else {
                                            console.error('undefined parent dom [' + key + ']');
                                        }
                                    }
                                }
                            };
                            pagelet.load(opt);
                        }
                    } else {
                        location.replace(state.url);
                    }
                }
            }, false);
            document.documentElement.addEventListener(eventType, function (e) {
                var target = e.target;
                while(target && target.tagName && target.tagName.toLowerCase() !== 'a'){
                    target = target.parentNode;
                }
                if (target) {
                    // Middle click, cmd click, and ctrl click should open
                    // links in a new tab as normal.
                    if (e.which > 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
                    // Ignore cross origin links
                    if (location.protocol !== target.protocol || location.hostname !== target.hostname) return;
                    var pagelets = target.getAttribute('data-pagelets');
                    var mode = (target.getAttribute('data-insert-type') || 'replace').toLocaleLowerCase();
                    var historyReplace = target.getAttribute('data-history-replace');
                    historyReplace = historyReplace !== null && (historyReplace === '' || /^(yes|1|true)$/i.test(historyReplace));
                    var href = target.getAttribute('href');
                    pagelets = (pagelets || '').split(/\s*,\s*/).filter(filter);
                    if (href && pagelets.length > 0) {
                        e.preventDefault();
                        e.stopPropagation();
                        var opt = {};
                        opt.url = href;
                        opt.pagelets = pagelets;
                        opt.replace = historyReplace || mode === 'prepend' || mode === 'append';
                        opt.error = function(){
                            location.replace(href);
                        };
                        if(!route(opt, e)){
                            opt.success = function(data){
                                var html = data.html;
                                // TODO
                                for (var key in html) {
                                    if (html.hasOwnProperty(key)) {
                                        var dom = document.querySelector('[data-pagelet="' + key + '"]');
                                        if (dom) {
                                            if(mode === 'prepend' || mode === 'append'){
                                                var div = document.createElement('div');
                                                div.innerHTML = html[key];
                                                var fragment = document.createDocumentFragment();
                                                var children = div.childNodes;
                                                while(children.length){
                                                    fragment.appendChild(children[0]);
                                                }
                                                if(mode === 'append' || dom.childNodes.length === 0){
                                                    dom.appendChild(fragment);
                                                } else {
                                                    dom.insertBefore(fragment, dom.childNodes[0]);
                                                }
                                            } else {
                                                dom.innerHTML = html[key];
                                            }
                                            dom = null;
                                        } else {
                                            console.error('undefined parent dom [' + key + ']');
                                        }
                                    }
                                }
                            };
                            pagelet.go(opt);
                        }
                    }
                }
            }, false);
        }
    };
})(window);
