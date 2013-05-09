var DB = require('../lib/model');

module.exports = function(app) {
  app.get('/', function(req, res) {
      res.render('new');
  });

  app.post('/new', function(req, res){
    var data = {};
    data.goal = req.body.goal;
    data.project_url = req.body.url;
    data.explain = req.body.explain;

    var callback = function(err, model){
      if(err){
        res.json(err);
      }
      else{
        console.log(model);
        res.method = "get";
        res.redirect('/display/'+model.id);
      }
    }

    DB.new(data, callback);

  });

  app.get('/display/:embed_id', function(req, res){
    res.render('display', {id:req.params.embed_id});
  });

  app.get('/embed/:embed_id', function(req, res){

    var embed = function(err, model){
      if(err){
        res.json(err);
      }
      else{
        model.update(function(err, model){
          console.log(model);
          res.render('embed', model);
        });
      }
    }

    DB.get(req.params.embed_id, embed);
  });
}