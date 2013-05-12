module.exports.get = function(req, res){

  var embed = function(err, model){
    if(err){
      res.json(err);
    }
    else{
      model.update(function(err, model){
        console.log(model);
        res.render('displays/'+model.display, model);
      });
    }
  }

  DB.get(req.params.embed_id, embed);
  //GA.event("embed", "get", req.params.embed_id, req.params.embed_id);
}