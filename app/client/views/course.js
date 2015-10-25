var lessonSteps = [ 'intro', 'login', 'adminLogin', 'dropUser', 'dropTable'];

Template.course.onCreated(function(){
	var template = this;
	if(!_.isString(FlowRouter.getQueryParam('lessonStep'))){
		FlowRouter.setQueryParams({lessonStep: lessonSteps[0]});
	}
	Meteor.call('lessonStarted', FlowRouter.getParam('_id'));
	var currentState = 0;
	template.autorun(function(){
		var lesson = LessonStatus.findOne({lessonId: FlowRouter.getParam('_id')});
		if(lesson && _.isString(lesson.state)){
			var state = parseInt(lesson.state, 10);
			if(state > currentState){
				currentState =  state;
				try{
					if(currentState === 4){
						playMultiSound('final');
					}else{
						playMultiSound('progress');
					}
				}catch(err){

				}
			}
		}
	});
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
			Meteor.call('lessonEnded');
			Meteor.call('resetLesson');
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
			Meteor.call('lessonEnded');
			Meteor.call('resetLesson');
		}
	}
};


var channel_max = 10;										// number of channels
var audioChannels = [];
for (var channelNumber = 0; channelNumber < channel_max; channelNumber++) {	// prepare the channels
	audioChannels[channelNumber] = {};
	audioChannels[channelNumber].channel = new Audio();// create a new audio object
	audioChannels[channelNumber].finished = -1;// expected end time for this channel
}

playMultiSound = function(sound) {
	for (var channelNumber = 0; channelNumber < audioChannels.length;channelNumber++) {
		var thisTime = new Date();
		if (audioChannels[channelNumber].finished < thisTime.getTime()) {			// is this channel finished?
			audioChannels[channelNumber].finished = thisTime.getTime() + document.getElementById(sound).duration*1000;
			audioChannels[channelNumber].channel.src = document.getElementById(sound).src;
			audioChannels[channelNumber].channel.load();
			audioChannels[channelNumber].channel.play();
			break;
		}
	}
};
