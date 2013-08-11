
/**
 * Module dependencies.
 */

var express = require('express'),
 routes = require('./routes'),
 scores = require('./routes/scores'),
 leagues = require('./routes/leagues'),
 rightarm = require('./routes/rightarm'),
 franchises = require('./routes/rightarm/franchises'),
 http = require('http'),
 path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.all('/', routes.index);
app.all('/scores', scores.index);
app.all('/leagues', leagues.index);
app.all('/rightarm', rightarm.index);
app.all('/rightarm/franchises', franchises.index);
app.get('/getLeague/28655', function(req, res){
    var http = require('http');
    var options = {
        host: 'football32.myfantasyleague.com',
        path: '/2013/export?TYPE=league&L=28655&W=&JSON=1'
    };
    var franchises;
    http.get(options, function(res) {
        var data = '';
        res.on('data', function (chunk){
            data += chunk;
        });
        res.on('end',function(){
            var obj = JSON.parse(data);
            franchises = obj.league.franchises.franchise;
            console.log('DATA: ' + JSON.stringify(franchises[0]))
        })
    }).on('close', function(){
        res.send(franchises);
    }).on('error', function(e) {
        console.log('ERROR: ' + e.message);
    });
})
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
