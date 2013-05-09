var fs = require('fs');

var newId = function(){
	return "dddddddd";
}

var filePath = function(id){
	return './db/'+id+'.json';
}

/***********************************************************************************************************/

var DB = {
	get: function(embed_id, callback) {
		var file = filePath(embed_id);
	 
		fs.readFile(file, 'utf8', function (err, data) {
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
		model.curency = data.curency;
		model.explain = data.explain;
		model.project_url = data.project_url;
		model.id = newId();

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

	instance.curency = undefined;
	instance.explain= undefined;

	instance.project_url = undefined;
	instance.update_time = undefined;

	if(json!=undefined){
		instance.id = json.id;

		instance.percent = json.percent;
		instance.raised = json.raised;
		instance.goal = json.goal;
		instance.curency = json.curency;
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
	json.curency = instance.curency;
	json.explain= instance.explain;

	json.project_url = instance.project_url;
	json.update_time = instance.update_time;

	return json;
}

Instance.prototype.save = function(callback){
	var instance = this;

	var outputFilename = filePath(instance.id);

	var json = instance.toJSON();

	fs.writeFile(outputFilename, JSON.stringify(json, null, 4), function(err) {
	    callback(err, instance);
	}); 
}

Instance.prototype.update = function(callback){

	var now = Date.now();
	var tenMin = 1000*60*10;

	if(this.update_time==undefined||this.update_time+tenMin<now){
		this.raised = 100000;
		this.percent = ((100)/this.goal)*this.raised;
		this.update_time = now;
		this.save(callback);
	}
	else{
		callback(this.UPDATE_WARNING, this);
	}
}




module.exports = DB;