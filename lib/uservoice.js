var   http = require("http")
    , util = require('util')
    , OAuth = require("oauth").OAuth;

function UserVoice(consumer_key, consumer_secret, domain, options) {

    options = options || {};

    this.uservoice_domain = domain;
    this.consumer_key = consumer_key;
    this.consumer_secret = consumer_secret;
    this.oauth_token = options["oauth_token"] || null;
    this.oauth_token_secret = options["oauth_token_secret"] || null;

    // process options
    this.baseUrl = options["baseUrl"] || "/api/v1/";

    this.oauth_client = new OAuth("https://"+this.uservoice_domain+".uservoice.com/oauth/request_token",
        "https://"+this.uservoice_domain+".uservoice.com/oauth/access_token",
        consumer_key,
        consumer_secret,
        "1.0A",
        null,
        "HMAC-SHA1");
    return this;
};

UserVoice.prototype.setOAuthTokens = function(oauth_token, oauth_token_secret) {
    this.oauth_token = oauth_token;
    this.oauth_token_secret = oauth_token_secret;
};

UserVoice.prototype.executeAPIRequest = function (method, params, signed_in, optionsOrCallback) {

    var callback = optionsOrCallback;
    var options = null;

    if (arguments.length == 4 && typeof optionsOrCallback == "object") {
        callback = arguments[3];
        options = optionsOrCallback;
    }

    if (options == null) { options = {}; }

    if( params === undefined || params === null)  params = {};


    // apply default arguments
    params.format = "json";
    params.nojsoncallback = "1";
    params.method = method;

    if (signed_in === true) {
        // use OAuth client
        this._executeOAuthAPIRequest(params, options, callback);
    } else {
        // use simple API token method
        this._executeNoAuthAPIRequest(params, options, callback);
    }

};

UserVoice.prototype._executeOAuthAPIRequest = function(params, options, callback) {

    var oauth_token = options["oauth_token"] || this.oauth_token;
    var oauth_token_secret = options["oauth_token_secret"] || this.oauth_token_secret;

    var api_instance = this;
    // console.log("ot: " + oauth_token + " ots: " + oauth_token_secret + " -- " + this.oauth_token);

    // default method call to get
    var methodCall = this.oauth_client.get;
    var allowedMethodCalls = ["get", "put", "post", "delete"];

    if(allowedMethodCalls.indexOf( params.method.toLowerCase() ) != -1
        && this.oauth_client[ params.method.toLowerCase() ] !== undefined
        && typeof( this.oauth_client[ params.method.toLowerCase() ] ) === "function")
        methodCall = this.oauth_client[ params.method.toLowerCase() ];


    if( params.method.toLowerCase() == "post" || params.method.toLowerCase() == "put")
    {
        methodCall.call(this.oauth_client, "https://" + this.uservoice_domain + ".uservoice.com" + this.baseUrl + params.url,
            oauth_token, oauth_token_secret, JSON.stringify( params.data ), "application/json", function(error, data){
                if (error) {
                    callback(new Error("Uservoice Error ("+error.statusCode+"): message: "+error.data));
                } else {
                    api_instance.processResponse(data, options, callback);
                }
            });
    }
    else
    {
        var queryString = this.paramsToQueryString(params.data);
        methodCall.call(this.oauth_client, "https://" + this.uservoice_domain + ".uservoice.com" + this.baseUrl + params.url + queryString,
            oauth_token, oauth_token_secret, function(error, data){
                if (error) {
                    callback(new Error("Uservoice Error ("+error.statusCode+"): message: "+error.data));
                } else {
                    api_instance.processResponse(data, options, callback);
                }
            });
    }
};

UserVoice.prototype._executeNoAuthAPIRequest = function(params, options, callback) {

    var api_instance = this;

    // add security
    params.api_key = this.consumer_key;

    var queryString = this.paramsToQueryString(params);

    // console.log("queryString is " + queryString);
    // default method call to get
    var methodCall = "GET";
    var allowedMethodCalls = ["get", "put", "post", "delete"];

    if(allowedMethodCalls.indexOf( params.method.toLowerCase() ) != -1)
        methodCall = params.method.toUpperCase();

    var request = this.getHttpClient().request(methodCall,
        this.baseUrl+ queryString,
        {"host": "api.flickr.com"});

    request.addListener('response', function(response){
        var result= "";
        response.setEncoding("utf8");
        response.addListener("data", function (chunk) {
            result+= chunk;
        });
        response.addListener("end", function () {

            api_instance.processResponse(result, options, callback);

        }); // end addListener for end
    });
    request.end();
};

UserVoice.prototype.processResponse = function(response_body, options, callback) {

    options = options || {};
    var result_mapper = options["result_mapper"];
    var ourCallback = callback;

    // console.log("response_body was " + util.inspect(response_body));

    var res = JSON.parse(response_body);
    if( res ) {

        if( result_mapper ) {
            res = result_mapper(res);
        }

        // console.log("res is " + util.inspect(res));
        ourCallback(null, res);
    } else {

        ourCallback(new Error("UserVoice Error: "+response_body));
    }


};

UserVoice.prototype.get = function(params, optionsOrCallback) {
    this.executeAPIRequest("GET", params, true, optionsOrCallback);
}

UserVoice.prototype.post = function(params, optionsOrCallback) {
    this.executeAPIRequest("POST", params, true, optionsOrCallback);
}

UserVoice.prototype.put = function(params, optionsOrCallback) {
    this.executeAPIRequest("PUT", params, true, optionsOrCallback);
}

UserVoice.prototype.delete = function(params, optionsOrCallback) {
    this.executeAPIRequest("DELETE", params, true, optionsOrCallback);
}

UserVoice.prototype.getHttpClient = function() {
    return http.createClient(80, "api.flickr.com");
};

UserVoice.prototype.paramsToQueryString = function (params) {
    var queryString = "";
    var operator= "?";
    for(var key in params) {
        queryString += (operator + key + "=" + encodeURIComponent(params[key]));
        if( operator == "?" ) operator= "&";
    }
    return queryString;
}

module.exports = UserVoice;