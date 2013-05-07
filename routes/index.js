module.exports = function(app) {
  app.get('/', function(req, res) {
      res.send('soon to come');
  });

  app.get('/embed/:embed_id', function(req, res){

  	res.render('embed', {});
  });
}