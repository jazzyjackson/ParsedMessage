let {IncomingMessage} = require('http')
let querystring = require('querystring')
let url = require('url')

module.exports = class ParsedMessage extends IncomingMessage {
    constructor(){
        super()
    }

    get path(){
        return this.parsedUrl.path
    }

    get pathname(){
        return this.parsedUrl.pathname
    }

    get query(){
        return querystring.parse(this.parsedUrl.query)
    }

    // if you don't want the parsed object you can just request the search
    get search(){
        return this.parsedUrl.search
    }

    get hash(){
        return this.parsedUrl.hash
    }

    get parsedUrl(){
        // only run url.parse the first time a property is requested
        return this._parsedUrl = this._parsedUrl || url.parse(this.url)
    }
}
