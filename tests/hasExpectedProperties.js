#!/usr/bin/env node
/**
---
Author: Colten Jackson
SemVer: ^0.1.0 
...
**/
const ParsedMessage = require('../')
const assert = require('assert').strict
const http = require('http')
const url = require('url')
const qs = require('querystring')
/**
Let's start by defining some arbitrary test data.
**/
let testPath = '/some/path'
let testQuery = { test: "an interesting query!" }
let testUrl = `${testPath}?${qs.encode(testQuery)}`
/**
Create a server and use this module for incoming messages,
and check incoming request objects for expected properties.
**/
let testServer = http.createServer({
    IncomingMessage: ParsedMessage
}, (request, response) => {
/**
The .url property on IncomingMessage returns the raw string,
but ParsedMessage returns the url object from 'url.parse()'
**/
    assert.ok(request.url)
    assert.ok(request.url.constructor, url.Url)
    assert.deepEqual(request.url.pathname, testPath)
/**
The query defined above should look exactly like the query extracted from the request object.
**/
    assert.ok(request.query)
    assert.deepEqual(request.query.test, testQuery.test)
    response.end()
})
/**
Start the server and make a get request to run all the tests. 
Exit when response received. Everything succeeded if no AssertionErrors were thrown.
**/
testServer.listen().on('listening', function(){ 
    http.get(`http://localhost:${this.address().port}${testUrl}`, response => process.exit(0))
})