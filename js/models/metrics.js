/**
 * metrics.js model
 */
define(['backbone', 'moment'], function (Backbone, moment) {

	return Backbone.Model.extend({

		url: function() {
			var from = moment().subtract(15, 'minutes').valueOf(),
				to = moment().valueOf();

			return 'http://streams.bottlenose.com/3/metrics?streamId=' + App.config.streamId + '&organizationId=' + App.config.userId + '&organizationToken=' + App.config.userToken + '&userId=&userToken=&from=' + from + '&to=' + to + '&timezone=Europe/Berlin&interval=1m&ids[]=impressions&ids[]=volume&appName=not+specified';
		},

		parse: function(response) {
			var data = {
				values: [],
				interval: 0.8
			};

			_.each(response.result, function(result) {
				data.values.push({
					impressions: result.values['stream:impressions'],
					volume: result.values['stream:volume']
				});
			});

			return data;
		}

	});

});
