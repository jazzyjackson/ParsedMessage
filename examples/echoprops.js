let ParsedMessage = require('../ParsedMessage')
let http = require('http')

http.createServer({
    IncomingMessage: ParsedMessage
}, (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'application/json'
    })
    res.end(JSON.stringify({
        parsedUrl: req.parsedUrl,
        parsedPath: req.parsedPath
    }))
}).listen(3000)
