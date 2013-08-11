
/**
 * Module dependencies.
 */

var express = require('express'),
 routes = require('./routes'),
 scores = require('./routes/scores'),
 leagues = require('./routes/leagues'),
 rightarm = require('./routes/rightarm'),
 franchises = require('./routes/rightarm/franchises'),
 schedule = require('./routes/schedule'),
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
app.all('/schedule', schedule.index);

app.get('/getLeague/28655', jsonData({
    host: 'football32.myfantasyleague.com',
    path: '/2013/export?TYPE=league&L=28655&W=&JSON=1'
}));

app.get('/getSchedule', jsonData({
    host: 'football.myfantasyleague.com',
    path: '/2013/export?TYPE=nflSchedule&W=1&JSON=1'
}));


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

function jsonData(options){
    return function(req, res){
        var http = require('http');
        var dat;
        http.get(options, function(res) {
            var data = '';
            res.on('data', function (chunk){
                data += chunk;
            });
            res.on('end',function(){
                var obj = JSON.parse(data);
                dat = obj;
            })
        }).on('close', function(){
            res.send(dat);
        }).on('error', function(e) {
            console.log('ERROR: ' + e.message);
        });
    }
}
