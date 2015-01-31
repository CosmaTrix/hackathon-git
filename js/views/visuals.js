/**
 * visuals.js view
 */
define(['backbone', 'openhose', 'models/metrics'], function (Backbone, Openhose, MetricsModel) {

	return Backbone.View.extend({

		interval: undefined,

		initialize: function() {
			this.metrics = new MetricsModel();
			this.listenTo(this.metrics, 'sync', this.render);

			this.fetchData();

			this.interval = setInterval(_.bind(this.fetchData, this), 60 * 1000);
		},

		fetchData: function() {
			this.metrics.fetch();
		},

		render: function(collection) {
            var data = JSON.stringify(collection.toJSON());

			$.ajax({
                url: '/',
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: data,
                dataType: 'json',
                success: function() {

                }
            });

			this.renderImpressions();
			this.renderVolume();

			App.Vent.trigger('changeMood');
		},

		getStreamOptions: function() {
			return {
				id: App.config.streamId,
				organizationToken: App.config.userToken,
				organizationId: App.config.userId
			};
		},

		getStreamPeriod: function() {
			return {
				start: Openhose.moment().subtract(15, 'minutes'),
				end: Openhose.moment(),
				bucket: '1m'
			};
		},

		renderImpressions: function() {
			this.line = new Openhose.Widget.Line({
				el: this.$('.impressions-chart'),
				stream: this.getStreamOptions(),
				data: {
					metrics: {
						ids: ['impressions']
					}
				},
				period: this.getStreamPeriod(),
				filter: {
					entities: ["tags:philips"]
				}
			});

			this.line.render();
		},

		renderVolume: function() {
			this.line = new Openhose.Widget.Line({
				el: this.$('.volume-chart'),
				stream: this.getStreamOptions(),
				data: {
					metrics: {
						ids: ['volume']
					}
				},
				period: this.getStreamPeriod(),
				filter: {
					entities: ["tags:philips"]
				}
			});

			this.line.render();
		}

	});

});
