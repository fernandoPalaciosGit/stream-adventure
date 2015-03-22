"use strict";
var splitBuffer = require("split"),
    pipeBuffer = require("through2"),
    lineCount = 0,
    streamPipe = {
        opt: {
            encoding: "utf8",
            decodeStrings: false,
            objMode: true
        },

        transformCb: function( chunkLine, enc, nextBufferCb ){
            var line = chunkLine.toString();
            line = ( lineCount % 2 === 0 ) ? line.toLowerCase() : line.toUpperCase() ;
            this.push(line+"\n");          
            lineCount++;
            nextBufferCb();
        },

        flushCb : function( nextBufferCb ){
            this.push(null);
            nextBufferCb();
        }       
    };

process.stdin
    .pipe( splitBuffer() )  /*cut buffer into multiple (array buffer),
                            no regular expression means same buffer*/
    .pipe( pipeBuffer(streamPipe.opt, streamPipe.transformCb, streamPipe.flushCb) )
    .pipe( process.stdout);