ServiceConfiguration.configurations.upsert(
	{ service: "twitter" },
	{
		$set: {
			consumerKey: Meteor.settings && Meteor.settings.twitter && Meteor.settings.twitter.consumerKey,
			secret:Meteor.settings && Meteor.settings.twitter &&  Meteor.settings.twitter.secret
		}
	}
);
