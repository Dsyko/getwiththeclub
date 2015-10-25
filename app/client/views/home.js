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
	var setHeight = function(){
		var height = $(window).height();//Math.max($(window).height(), 700);
		$(".screen-height").height(height);
	};

	setHeight();
	$(window).resize(function(){
		setHeight();
	});
});

Template.home.helpers({
	classes: function(){
		return COURSES;
	}
});


Template.home.events = {
	'click [data-action="scroll-to-classes"]': function(event, template){
		event.preventDefault();
		event.stopPropagation();

	},
	'click [data-action="open-course"]': function(event, template){
		event.preventDefault();
		event.stopPropagation();
		FlowRouter.go('/course/' + this._id);
	}
};



Template.twitterLogin.events = {
	'click button[data-action="launch-twitter-login"]': function(event, template){
		event.preventDefault();
		Meteor.loginWithTwitter({loginStyle: 'redirect'});
	}
};
