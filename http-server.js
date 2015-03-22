"use strict";

var pipeBuffer = require("through2"),
    postData = "",
    http = require("http");

// SEND STDIN INTO POST RESPONSE
process.stdin
    .pipe( pipeBuffer(function( srcData, enc, cb ){
        postData = srcData.toString().toUpperCase();
        this.push(postData);
        cb();
    }));

http.createServer( function( req, res ){
    if( req.method === "POST" ){
        res.end(postData);
    }

}).listen( +process.argv[2] || 3000 );


// SEND POST UPPERCASE INTO RESPONSE
http.createServer( function( req, res ){
    if( req.method === "POST" ){
        req.pipe( pipeBuffer(function( srcData, enc, cb ){
            this.push(srcData.toString().toUpperCase());
            cb();
        }))
        .pipe(res);
    }

}).listen( +process.argv[2] || 3000 );