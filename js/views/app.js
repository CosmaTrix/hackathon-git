/**
 * app.js view
 */
define(['backbone', 'views/stream', 'views/visuals'], function (Backbone, StreamView, VisualsView) {

	return Backbone.View.extend({

		el: 'body',

		initialize: function () {
			new StreamView({
				el: this.$('#stream')
			});

			new VisualsView({
				el: this.$('#line-chart')
			});
		}

	});

});
