/**
 * app.js view
 */
define([
	'backbone',
	'views/hashtag-mood',
	'views/visuals',
	'views/stream'
],
	function (Backbone, HashtagMoodView, VisualsView, StreamView) {

	return Backbone.View.extend({

		el: 'body',

		initialize: function () {
			new HashtagMoodView({
				el: this.$('#hashtag-mood')
			});

			new StreamView({
				el: this.$('#stream')
			});

			new VisualsView({
				el: this.$('#line-charts')
			});
		}

	});

});
