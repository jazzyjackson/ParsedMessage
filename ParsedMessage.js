let {IncomingMessage} = require('http')
let querystring = require('querystring')
let url = require('url')

module.exports = class ParsedMessage extends IncomingMessage {
    constructor(){
        super()
    }

    set url(newData){
      this._url = newData
    }

    get url(){
        return url.parse(this._url)
    }

    get query(){
        return querystring.parse(this.url.query)
    }
}