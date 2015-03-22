var concatStream = require("concat-stream"),
    joinLetters = function( streamData ){
        var strOut = streamData.toString().split("").reverse().join("");
        process.stdout.write( strOut +"\n");
    };

process.stdin
    .pipe( concatStream( joinLetters ) );