exports.index = function(req, res){
  res.render('signin', { title: 'Login', messages: req.flash('error') });
};

exports.controller = function(req, res){
  var leagueid = req.param('leagueid');
    var franchiseid = req.param('franchiseid');
    var password = req.param('password');
    console.log('League Id: ' + leagueid);
    console.log('Franchise Id: ' + franchiseid);
    console.log('Password: ' + password);
    var options = {
        qual: 'http://',
        host: 'football32.myfantasyleague.com',
        path: '/2013/login?L=' + leagueid + '&FRANCHISE_ID=' + franchiseid + '&PASSWORD=' + password + '&XML=1'
    }
    var request = require('request');
    var dat;
    request(options.qual + options.host + options.path, function (error, response, body) {
        var parseString = require('xml2js').parseString;
        if (!error && response.statusCode == 200) {
            var xml = body
            parseString(xml, function (err, result) {
                if(result.error){
                    console.log(JSON.stringify(err));
                    var stringError = JSON.stringify(result.error);
                    req.flash('error', 'Woops, looks like that username and password are incorrect.');
                    res.redirect('/signin')
                } else {
                    var seshid = result.status.$.session_id;
                    console.log(JSON.stringify(seshid));
                    res.redirect('/')
                }
            });
        }
    })
};