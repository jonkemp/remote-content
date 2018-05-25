'use strict';

var superagent = require('superagent');
var getProxyForUrl = require('proxy-from-env').getProxyForUrl;

// extend with Request#proxy()
require('superagent-proxy')(superagent);

module.exports = function (remoteUrl, callback) {
    var proxy_url = getProxyForUrl(remoteUrl);

    if(proxy_url) {
        superagent.get(remoteUrl).proxy(proxy_url).buffer().end(function (err, resp) {
            if (err) {
                return callback(err);
            } else if (resp.ok) {
                return callback(null, resp.text);
            }
            callback(new Error('GET ' + remoteUrl + ' ' + resp.status));
        });
    }
    else {
        superagent.get(remoteUrl).buffer().end(function (err, resp) {
            if (err) {
                return callback(err);
            } else if (resp.ok) {
                return callback(null, resp.text);
            }
            callback(new Error('GET ' + remoteUrl + ' ' + resp.status));
        });
    }
};
