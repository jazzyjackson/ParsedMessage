# ParsedMessage
## A convenient improvement on http.IncomingMessage

Pass this class into your http.createServer options and have convenient access to .url and .query properties.

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

## Test
Run `npm test` or `make test-all` to execute each file in the tests directory.

