# ParsedMessage
## A convenient improvement on http.IncomingMessage

Pass this class into your http.createServer options and have convenient access to properties provided by url.parse including:
```js
.path
.pathname
.query // returns parsed object
.search
.hash
```

Compatible with Node ^9.6.0.

See also: VerboseResponse

## Usage

Install with `npm i parsedmessage` and require before creating an http server:

```js
let ParsedMessage = require('ParsedMessage')

http.createServer({
    IncomingMessage: "ParsedMessage"
}, yourRequestHandlerHere)
```
