module.exports = function(app) {
  app.get('/', function(req, res) {
      res.send('soon to come');
  });

  app.get('/embed/:embed_id', function(req, res){

  	var data = {};
  	data.explain = '<h3>Fully funded, but far from finished.</h3><div>We\'ve hit our first target - thank you so much! Now we\'re going for the stretch. <a href="">Click here</a> to read about what will happen if we hit this target!</div>';
  	data.goal = 250000;
  	data.percent = 55;

  	res.render('embed', data);
  });
}