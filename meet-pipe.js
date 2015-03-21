// node main /test.txt
var fs        = require("fs"),
    fileDir   =  __dirname + process.argv[2],
    srcStream = fs.createReadStream( fileDir );

srcStream.pipe( process.stdout );

/*var  transformedSource = "";

srcStream.on('data',function(data){
  transformedSource += data.toString();

}).on('end',function(){
    process.stdout.write(transformedSource);
});*/