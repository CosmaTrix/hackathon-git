
App.collections.Streams = Backbone.Collection.extend({

	streamId: '525530f4693be8226e000009',

	model: App.models.Stream,

	url: function() {
		return 'http://streams.bottlenose.com/3/activities?limit=10&userId=' + App.config.userId + '&userToken=' + App.config.userToken + '&streamId=' + this.streamId + '&filter[entities][]=tags:philips'
	},

	parse: function(response) {
		return response.result;
	}

});
