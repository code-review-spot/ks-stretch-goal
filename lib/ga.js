var GA = module.exports;

GA.init = function(ua, host){
	GA.ua = ua;
	GA.host = host;
	GA.na = null;

	var NA = require("nodealytics");
	NA.initialize(this.ua, this.host, function () {
	  GA.na = NA;
	});
}


GA.page = function(title, url, ref){
	//NEED TO FORK THIS AND ADD utmr

	var options = {};

	if(ref!=undefined){
		options.utmr = ref;
	}

	GA.na.trackPage(title, url, options, function (err, resp) {
    if (!err, resp.statusCode === 200) { }
  });
}

module.exports = GA;