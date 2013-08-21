exports.index = function(req, res){
  res.clearCookie('USER_ID');
  res.redirect('/');
};