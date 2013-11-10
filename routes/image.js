var webshot = require('webshot');

var drawImage = function(res, imageName) {
  var img = FS.readFileSync('./db/images/' + imageName + '.png');
  res.writeHead(200, {
    'Content-Type': 'image/png'
  });
  res.end(img, 'binary');
}

var createImage = function(model, callback) {

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

  webshot(BASE_URL + 'embed/' + model.id, './db/images/' + model.id + '.png', options, function(err) {
    model.png_update_time = model.update_time;
    model.save();
    callback(err);
  });
}

module.exports.get = function(req, res) {

  var embed_id = req.params.embed_id;
  embed_id = embed_id.substring(0, embed_id.length - 4);

  var image = function(err, model) {
    if (err) {
      //draw error image
      drawImage(res, 'error');
      track(req, 'error');
    } else if (model.needsUpdate() || model.update_time != model.png_update_time) {
      //create new image
      createImage(model, function(err) {
        if (err) {
          drawImage(res, 'error');
          track(req, 'error');
        } else {
          drawImage(res, embed_id);
          track(req, embed_id);
        }
      });
    } else {
      //display image
      drawImage(res, embed_id);
      track(req, embed_id);
    }
  }

  DB.get(embed_id, image);
}

var track = function(req, image) {
  GA.page(image, "/image/" + image + ".png", req.get('Referer'));
}