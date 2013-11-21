var brandweer = function(){
	var config = {
		// foo: bar
		"src":"js/json/dummy.js"
	},	init = function(){
		populate();
	},	populate = function(){
		// console.log($.get(config.src));
		$.getJSON( config.src , function( data ) {
			console.log(data.dummy);
			var cn = data.dummy.contact.companyname;
			alert(cn);
		});
	};
	return {
		init:init
	};
}();

brandweer.init();