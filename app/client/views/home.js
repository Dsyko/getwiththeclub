var reRunComputationAfterTime = function(recalculateIn){
	if(Tracker.active){
		var computation = Tracker.currentComputation;
		var timer = setTimeout(function(){
			//console.log("Invalidating computation");
			computation.invalidate();
		}, recalculateIn);
		computation.onInvalidate(function(){ //Cleanup timer on invalidation, or if computation is destroyed
			clearTimeout(timer);
		});
	}
};

Template.home.onCreated(function(){
	var wow = new WOW({
		mobile: false
	});
	wow.init();
});
Template.home.onRendered(function(){
	$(".screen-height").height($(window).height());

	$(window).resize(function(){
		$(".screen-height").height($(window).height());
	});
});

Template.home.helpers({
	helperName: function(){
		//helper function
	}
});


Template.home.events = {
	'click [data-action="action-type"]': function(event, template){
		//click handler
	}
};
