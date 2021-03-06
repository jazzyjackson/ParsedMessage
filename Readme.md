# ParsedMessage

Since Node v9.6.0, http.createServer supports an options argument to override the IncomingMessage and ServerResponse constructed for each request. Pass this class as `IncomingMessage` and have convenient access to properties provided by url.parse and path.parse:

```js
http.createServer({
    IncomingMessage: require("ParsedMessage")
}, (req, res) => {
    req.path       // url.parse(req.url).path
    req.pathname   // url.parse(req.url).pathname
    req.query      // querystring.parse(url.parse(req.url).query
    req.search     // url.parse(req.url).search
    req.hash       // url.parse(req.url).hash
    req.parsedUrl  // url.parse(req.url)
    req.parsedPath // path.parse(req.pathname)
    req.root       // path.parse(req.pathname).root
    req.dir        // path.parse(req.pathname).dir
    req.base       // path.parse(req.pathname).base
    req.ext        // path.parse(req.pathname).ext
    req.name       // path.parse(req.pathname).name
}))
```
Check out the [source code](ParsedMessage.js), it's very simple. I cache the result of url.parse so it's only called once, and only once you use one of the shortcuts.

See also: [Transflect](http://github.com/mixint/Transflect), a Transform stream that can be piped from request to response: `req.pipe(new Transflect).pipe(res)`

See also: [ServerFailSoft](http://github.com/jazzyjackson/ServerFailSoft), an extension to ServerResponse that catches errors piped to it and closes the connection with an informative error.
