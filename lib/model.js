var ks = require("./kickstarter");
var guid = require("./guid");

var filePath = function(id){
	return './db/'+id+'.json';
}

/***********************************************************************************************************/

var DB = {
	get: function(embed_id, callback) {
		var file = filePath(embed_id);
	 
		FS.readFile(file, 'utf8', function (err, data) {
		  if(err){
		  	callback(err, undefined);
		  }
		  else{
		  	data = JSON.parse(data);
		  	var model = new Instance(data);
		  	callback(err, model);
		  }
		});
	},
	new: function(data, callback){
		var model = new Instance();

		model.goal = data.goal;
		model.currency = data.currency;
		model.explain = data.explain;
		model.project_url = data.project_url;
		model.id = guid();

		model.save(callback);
	}
}

/***********************************************************************************************************/

var Instance = function(json){
	var instance = this;

	instance.id = undefined;

	instance.goal = undefined;
	instance.raised = undefined;
	instance.percent = undefined;

	instance.currency = undefined;
	instance.explain= undefined;

	instance.project_url = undefined;
	instance.update_time = undefined;

	if(json!=undefined){
		instance.id = json.id;

		instance.percent = json.percent;
		instance.raised = json.raised;
		instance.goal = json.goal;
		instance.currency = json.currency;
		instance.explain= json.explain;

		instance.project_url = json.project_url;
		instance.update_time = json.update_time;
	}
}

Instance.prototype.UPDATE_WARNING = "TOO SOON TO UPDATE";

Instance.prototype.toJSON = function(){
	var instance = this;

  var json = {};

  json.id = instance.id;

	json.percent = instance.percent;
	json.raised = instance.raised;
	json.goal = instance.goal;
	json.currency = instance.currency;
	json.explain= instance.explain;

	json.project_url = instance.project_url;
	json.update_time = instance.update_time;

	return json;
}

Instance.prototype.save = function(callback){
	var instance = this;

	var outputFilename = filePath(instance.id);

	var json = instance.toJSON();

	FS.writeFile(outputFilename, JSON.stringify(json, null, 4), function(err) {
	    callback(err, instance);
	}); 
}

Instance.prototype.update = function(callback){
	var instance = this;

	if(instance.currency==undefined){
		instance.updateCurrency(function(err, instance){
			if(err){
				callback(err, instance);
			}
			else{
				instance.updatePledged(callback);
			}
		});
	}
	else{
		instance.updatePledged(callback);
	}
}

Instance.prototype.updateCurrency = function(callback){
	var instance = this;
	ks.currency(instance.project_url, function(err, currency){
		instance.currency = currency;
		instance.save(callback);
	});
}

Instance.prototype.updatePledged = function(callback){
	var instance = this;

	var now = Date.now();
	var tenMin = 1000*60*10;

	if(instance.update_time==undefined||instance.update_time+tenMin<now){
		ks.pledged(instance.project_url, function(err, pledged){
			if(err){
				callback(err, undefined);
			}
			else{
				instance.raised = pledged;
				instance.percent = (((100)/instance.goal)*instance.raised).toFixed(2);
				instance.update_time = now;
				instance.save(callback);
			}
		});
	}
	else{
		callback(this.UPDATE_WARNING, instance);
	}
}




module.exports = DB;