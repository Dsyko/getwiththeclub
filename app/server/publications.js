Meteor.publish('lessonStatus', function () {
	check(arguments, [Match.Any]);
	//console.log('Publish function called: messages, by userId: ' + this.userId);
	if(this.userId) {
		console.log('Publishing lesson status');
		return LessonStatus.find({userId: this.userId});
	}
});