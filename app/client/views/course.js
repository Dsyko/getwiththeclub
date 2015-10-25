Template.course.helpers({
	course: function(){
		var course =  _.find(COURSES, function(course){
			return course._id === FlowRouter.getParam('_id');
		});
		console.log('course: ', course);
		return course;
	}
});
