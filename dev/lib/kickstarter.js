var request = require("request");
var cheerio = require("cheerio");

var KS = module.exports;

KS.pledged = function(url, callback) {
	request(url, function(err, res, body){
		if(err){
			callback(err, undefined);
		}
		else{
			try{
				var $ = cheerio.load(body);
				var pledged = $("#pledged").attr("data-pledged");
				callback(undefined, pledged);
			}
			catch(e){
				callback(e, undefined);
			}
		}
	});
};

KS.currency = function(url, callback){
	request(url, function(err, res, body){
		if(err){
			callback(err, undefined);
		}
		else{
			try{
				var $ = cheerio.load(body);
				var currency = $("#pledged data").attr("data-currency");

				if(currency=="GBP"){
					currency = "£";
				}
				else if(currency=="USD"){
					currency = "$";
				}

				callback(undefined, currency);
			}
			catch(e){
				callback(e, undefined);
			}
		}
	});
}