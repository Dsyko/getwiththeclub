function routeRequiresLogin(context) {
	//if(!Meteor.userId()){
	//	//console.log('User not logged in! Redirecting');
	//	FlowRouter.go('/entry');
	//}else{
	//	//console.log('User logged in ;D');
	//}
}

function trackRouteEntry(context) {

}

function trackRouteClose(context) {
	//Mixpanel.track("move-from-home", context.queryParams);
}

FlowRouter.route('/', {
	// calls just before the action
	triggersEnter: [trackRouteEntry],
	action: function() {
		BlazeLayout.render('appBody', { main: "home" });
	},
	// calls when when we decide to move to another route
	// but calls before the next route started
	triggersExit: [trackRouteClose]
});

FlowRouter.route('/course/:_id', {
	// calls just before the action
	triggersEnter: [trackRouteEntry, routeRequiresLogin],
	action: function(params) {
		BlazeLayout.render('appBody', { main: "course" });
	},
	// calls when when we decide to move to another route
	// but calls before the next route started
	triggersExit: [trackRouteClose]
});