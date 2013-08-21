exports.index = function(req, res){
  var isLogged = req.cookies.USER_ID;

  res.render('index', { title: 'Fantasy Football', isLogged: isLogged });
};