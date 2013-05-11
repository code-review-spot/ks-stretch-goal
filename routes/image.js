var drawImage = function(res, imageName){
	var img = FS.readFileSync('./db/images/'+imageName+'.png');
  res.writeHead(200, {'Content-Type': 'image/png' });
  res.end(img, 'binary');
}

var createImage = function(model, callback){
  console.log("HERE");
  callback("ERR");
}

module.exports.get = function(req, res){
  console.log("START");
  var image = function(err, model){
    if(err){
      //draw error image
      drawImage(res, 'error');
    }
    else{
      var update_time = model.update_time;
      model.update(function(err, new_model){
        console.log("NEW MODEL", new_model.update_time);
        console.log("OLD MODEL", update_time);
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