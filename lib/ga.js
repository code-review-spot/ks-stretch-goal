var ua = "UA-XXX";
var host = 'nodega.jga.me';


var GA = function(ua, host){
	this.ua = ua;
	this.host = host;
	this.ga = require("ga")(ua, host);
	return this;
}

GA.prototype.event = function(cat, act, lbl, val) {
	this.ga.trackEvent({
    category: cat,
    action: act,
    label: lbl,
    value: val
	});
};

GA.prototype.page = function(url){
	this.ga.trackPage(url);
}

module.exports = GA;