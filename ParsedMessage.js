/* these are all node builtins */
const url = require('url')
const path = require('path')
const http = require('http')
const querystring = require('querystring')

/**
 * @extends http.IncomingMessage
 * Adds convenient getters to useful objects and properties based off IncomingMessage's .url property.
 * Lazy evaluation: ParsedMessage performs no extra work until one of the properties is requested.
 * The result of url.parse and path.parse is cached so further calls do as little work as possible.
 */
module.exports = class ParsedMessage extends http.IncomingMessage {
    constructor(req){ super(req) }

    /**
     * @private
     * @param {String} urlString
     * Get the URL object, and then replace a couple properties
     * .pathname gets decoded (use .path for untouched prop)
     * .query gets parsed into an object (use .search for untouched prop)
     */
    deepParse(urlString){
        var halfParsed = url.parse(urlString)
        return Object.assign(halfParsed, {
            pathname : decodeURI(halfParsed.pathname),
            query    : querystring.parse(halfParsed.query)
        })
    }

    /**
     * Return parsedUrl if it already exists, otherwise create it:
     * call this.deepParse to get fully decoded properties
     * @returns {Object} parsedUrl
     */
    get parsedUrl(){
        if(this._parsedUrl) return this._parsedUrl
        else return this._parsedUrl = this.deepParse(this.url)
    }

    get path()    { return this.parsedUrl.path     }
    get pathname(){ return this.parsedUrl.pathname }
    get query()   { return this.parsedUrl.query    }
    get search()  { return this.parsedUrl.search   }
    get hash()    { return this.parsedUrl.hash     }

    /**
     * Return parsedPath if it exists, otherwise creates it from this.pathname.
     * this.pathname will call this.parsedUrl and create that too.
     * Filename will be unescaped
     * @returns {Object} parsedPath
     */
    get parsedPath(){
        return this._parsedPath = this._parsedPath || path.parse(this.pathname)
    }

    get root(){ return this.parsedPath.root }
    get dir() { return this.parsedPath.dir  }
    get base(){ return this.parsedPath.base }
    get ext() { return this.parsedPath.ext  }
    get name(){ return this.parsedPath.name }
}
