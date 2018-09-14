let {IncomingMessage} = require('http')
let querystring = require('querystring')
let url = require('url')
let path = require('path')

module.exports = class ParsedMessage extends IncomingMessage {
    constructor(options){ super(options) }

    get parsedUrl(){
        // only run url.parse the first time a property is requested
        return this._parsedUrl = this._parsedUrl || url.parse(this.url)
    }

    get path()    { return this.parsedUrl.path            }
    get pathname(){ return this.parsedUrl.pathname        }
    get query()   { return qs.parse(this.parsedUrl.query) }
    get search()  { return this.parsedUrl.search          }
    get hash()    { return this.parsedUrl.hash            }

    get parsedPath(){
        return this._parsedPath = this._parsedPath || path.parse(this.pathname)
    }

    get root(){ return this.parsedPath.root }
    get dir() { return this.parsedPath.dir  }
    get base(){ return this.parsedPath.base }
    get ext() { return this.parsedPath.ext  }
    get name(){ return this.parsedPath.name }
}
