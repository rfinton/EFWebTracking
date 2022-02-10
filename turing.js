var events = ['scroll', 'click', 'mousemove', 'keydown'];
var postState = {
	pending: false,
	resolved: false,
	rejected: false
};

function monitor() {
	for(var i = 0; i < events.length; i++) {
		window.addEventListener(events[i], function() {
			triggerPost();
		});
	}
}

function triggerPost(evt) {
	if(postState.pending) {
		return;
	}

	postState.pending = true;

	var d = {
		"eventid": "201916",
		"eventoption": location.origin,
		"dedup": "##purl##",
		"date": (new Date()).toISOString()
	};

	var s = "http://studio.afw.mdl.io/api/OutboundApp/AppCallback?serviceTypeId=2019&identifier=23959_32_637602259041268668&accountId=23959&outboundId=10";

	var x = new XMLHttpRequest();
	x.open('POST', s);
	x.onreadystatechange = function() {
		if(x.readyState == 4 && x.status == 200) {
			postState.resolved = true;
		}
		if(x.readyState == 4 && x.status != 200) {
			postState.rejected = true;
		}
		console.log(postState);
	};
	x.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	x.setRequestHeader('Content-Type', 'application/json');
	x.send(JSON.stringify(d));
}

window.addEventListener('DOMContentLoaded', monitor);