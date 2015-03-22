"use strict";
var through2 = require("through2");

var streamPipe = {
    opt : {
        objMode : true, // non bynary stream
        encoding: "utf8",
        decodeStrings: false
    },
    transformCb : function( chunk, encoding, cb ){
        
        /*var strBuffer = "";
        console.dir(chunk);
        for (var i = 0, len = chunk.length; i < len; i++){
            strBuffer += ( String.fromCharCode(chunk[i]).toUpperCase() );
        }
        this.push(strBuffer); // acumulate stream into pipe*/

        this.push( chunk.toString().toUpperCase() );

        cb();   /**cb( err, data )*
                cb(null, "noMoreData") // return false with "noMoreData" chunk
                bc() // pass to next stream */
    },
    flushCb : function( cb ){
        this.push(null);
        cb();
    }
};

process.stdin
    .pipe( through2( streamPipe.opt, streamPipe.transformCb, streamPipe.flushCb ) )
    .pipe( process.stdout );