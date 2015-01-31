/**
 * streams.js collection
 */
define(['backbone', 'models/stream'], function (Backbone, StreamModel) {

	return Backbone.Collection.extend({

		model: StreamModel,

		url: function() {
			return 'http://streams.bottlenose.com/3/activities?limit=10&userId=' + App.config.userId + '&userToken=' + App.config.userToken + '&streamId=' + App.config.streamId + '&filter[entities][]=tags:philips'
		},

		parse: function(response) {
			return response.result;
		}

	});

});
