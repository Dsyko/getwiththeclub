Tracker.autorun(function(){
	if(Meteor.userId()){
		Meteor.subscribe('lessonStatus', function(){
		});
	}
});