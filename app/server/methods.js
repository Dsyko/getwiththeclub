var timeoutHandles = {};

Meteor.methods({
	lessonStarted: function(lessonId) {
		//console.log('messageId: ', messageId);
		//console.log('clientTime: ', clientTime);
		check(lessonId, String);
		var userId = Meteor.userId();
		if(userId) {
			var lessonStatus = LessonStatus.findOne({lessonId: lessonId, userId: userId});
			if(!_.isObject(lessonStatus)){
				LessonStatus.insert({lessonId: lessonId, userId: userId, state: '0'});
			}
			timeoutHandles[userId] = Meteor.setInterval(function(){
				var currentStatus = HTTP.get(SQL_URL + '/score.php');
				console.log('currentStatus: ', currentStatus.content);
				var lessonStatus = LessonStatus.findOne({lessonId: lessonId, userId: userId});
				if(lessonStatus && lessonStatus.state !== (currentStatus && currentStatus.content)){
					LessonStatus.update({_id: lessonStatus._id}, {$set: {state: ((currentStatus && currentStatus.content) || 0)}});
				}
			}, 2000);
		}
	},
	lessonEnded: function() {
		check(arguments, [Match.any]);
		var userId = Meteor.userId();
		if(userId && timeoutHandles[userId]){
			Meteor.clearInterval(timeoutHandles[userId]);
			timeoutHandles[userId] = undefined;
		}
	},
	resetLesson: function() {
		check(arguments, [Match.any]);
		HTTP.get(SQL_URL + '/reset.php');
	}
});