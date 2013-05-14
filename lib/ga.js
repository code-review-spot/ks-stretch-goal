var GA = module.exports;

GA.init = function(ua, host){
	this.ua = ua;
	this.host = host;
	this.na = null;

	var NA = require("nodealytics");
	NA.initialize(this.ua, this.host, function () {
	  this.na = NA;
	});
}


GA.page = function(pageTitle, pageName){
	//NEED TO FORK THIS AND ADD utmr
	this.na.trackPage(title, url, function (err, resp) {
    if (!err, resp.statusCode === 200) {
      console.log('it worked!');
    }
  });
}

module.exports = GA;