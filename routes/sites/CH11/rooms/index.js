exports.index = function(req, res){
  var rooms = [{name: '101'}, {name: '103'}, {name: '201'}]

  res.render('room', { title: req.route.path, rooms: JSON.stringify(rooms) });
};