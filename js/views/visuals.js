/**
 * visuals.js view
 */
define(['backbone', 'openhose'], function (Backbone, Openhose) {

	return Backbone.View.extend({

		interval: undefined,

		initialize: function() {
			this.render();
			this.interval = setInterval(_.bind(this.render, this), 60 * 1000);
		},

		render: function() {
			this.renderChart();
			this.getData();
		},

		getData: function() {
			if (!this.line.metrics[0].collection.length) {
				setTimeout(_.bind(this.getData, this), 1000);
			} else {
				console.log(this.line.metrics[0].collection.toJSON());
			}
		},

		renderChart: function() {
			this.line = new Openhose.Widget.Line({
				el: this.el,
				stream: {
					id: '525530f4693be8226e000009',
					organizationToken: App.config.userToken,
					organizationId: App.config.userId
				},
				data: {
					metrics: {
						ids: ['impressions', 'volume']
					}
				},
				period: {
					start: Openhose.moment().subtract(15, 'minutes'),
					end: Openhose.moment(),
					bucket: '1m'
				},
				filter: {
					entities: ["tags:philips"]
				}
			});

			this.line.render();
		}

	});

});

