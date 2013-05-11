var webshot = require('webshot');

var drawImage = function(res, imageName){
	var img = FS.readFileSync('./db/images/'+imageName+'.png');
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');
}

var createImage = function(model, callback){

  var options = {
    screenSize: {
      width: 620,
      height: 245
    },
    shotSize: {
      width: 620,
      height: 245
    }
  }

  webshot('http://ks-stretch-goal.herokuapp.com/embed/'+model.id, './db/images/'+model.id+'.png', options, function(err) {
    callback(err); 
  });
}

module.exports.get = function(req, res){
  var image = function(err, model){
    if(err){
      //draw error image
      drawImage(res, 'error');
    }
    else{
      var update_time = false; //model.update_time;
      model.update(function(err, new_model){
        if(new_model.update_time!=update_time){
          //create new image
          createImage(new_model, function(err){
          	if(err){
          		drawImage(res, 'error');
          	}
          	else{
          		drawImage(res, req.params.embed_id);
          	}
          });
        }
        else{
          //display image
          drawImage(res, req.params.embed_id);
        }
      });
    }
  }

  DB.get(req.params.embed_id, image);
}