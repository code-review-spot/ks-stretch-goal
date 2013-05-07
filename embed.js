var html = '<div id="sg-progress"><div id="sg-progress-bar"></div></div><div id="sg-meta"><div id="sg-percent"><div class="sg-meta-value"></div><div class="sg-meta-msg">funded</div></div><div id="sg-goal"><div class="sg-meta-value"></div><div class="sg-meta-msg">stretch goal</div></div></div>';

$("#sg-display").html(html);

$("#sg-goal .sg-meta-value").html(goal);

var oPledged = 0;

var update = function(){
	var pledged= $("#pledged").data('pledged');
	if(pledged>=oPledged){
		var percent = Math.round((100/goal)*pledged);
	  $("#sg-percent .sg-meta-value").html(percent);
	  $("#sg-progress-bar").css("width", percent+"%");
	  oPledged = pledged;
	}
}

update();

setInterval(update, 1000);
