Meteor.publish('courseStatus', function () {
	check(arguments, [Match.Any]);
	//console.log('Publish function called: messages, by userId: ' + this.userId);
	if(this.userId) {
		return Courses.find({userId: this.userId});
	}
});