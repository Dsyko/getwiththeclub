var lessonSteps = [ 'intro', 'login', 'dropUser', 'dropTable'];

Template.course.onCreated(function(){
	if(!_.isString(FlowRouter.getQueryParam('lessonStep'))){
		FlowRouter.setQueryParams({lessonStep: lessonSteps[0]});
	}
	Meteor.call('lessonStarted', FlowRouter.getParam('_id'));
});

Template.course.onDestroyed(function(){
	Meteor.call('lessonEnded');
	Meteor.call('resetLesson');
});


Template.course.helpers({
	course: function(){
		var course =  _.find(COURSES, function(course){
			return course._id === FlowRouter.getParam('_id');
		});
		console.log('course: ', course);
		return course;
	},
	onFirstStep: function(){
		var step = FlowRouter.getQueryParam('lessonStep');
		return _.indexOf(lessonSteps, step) === 0;
	},
	onLastStep: function(){
		var step = FlowRouter.getQueryParam('lessonStep');
		return _.indexOf(lessonSteps, step) === (lessonSteps.length -1);
	}
});


Template.course.events = {
	'click button[data-action="next"]': function(event, template){
		event.preventDefault();
		var message = this;
		var step = FlowRouter.getQueryParam('lessonStep');
		var stepIndex = _.indexOf(lessonSteps, step);
		if(lessonSteps.length > stepIndex+1){
			FlowRouter.setQueryParams({lessonStep: lessonSteps[stepIndex+1]});
		}else{
			FlowRouter.go('/');
			FlowRouter.setQueryParams({lessonStep: null});
			//Meteor.call('resetMessageTimer', message._id, moment().valueOf());
		}
	},
	'click button[data-action="prev"]': function(event, template){
		event.preventDefault();
		var step = FlowRouter.getQueryParam('lessonStep');
		var stepIndex = _.indexOf(lessonSteps, step);
		if(stepIndex > 0){
			FlowRouter.setQueryParams({lessonStep: lessonSteps[stepIndex-1]});
		}else{
			FlowRouter.go('/');
			FlowRouter.setQueryParams({lessonStep: null});
		}
	}
};
