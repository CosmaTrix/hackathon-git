/**
 * app.js view
 */
define(['backbone', 'views/stream', 'views/visuals'], function (Backbone, HomeView, VisualsView) {

	return Backbone.View.extend({

		el: 'body',

		initialize: function () {
			new HomeView({
				el: this.$('#stream')
			});

			new VisualsView({
				el: this.$('#line-chart')
			});
		}

	});

});
