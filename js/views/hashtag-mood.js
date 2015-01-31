/**
 * hashtag-mood.js view
 */
define(['backbone'], function (Backbone) {

	return Backbone.View.extend({

		initialize: function () {
			App.Vent.on('changeMood', this.render, this);
		},

		render: function (response) {
            var hue = parseInt(response[0].hue / 65535 * 360),
                saturation = parseInt(response[0].sat / 255 * 100) + '%',
                lightness = parseInt(response[0].bri / 255 * 100) + '%';

			this.$('h1').css('color', 'hsl(' + [hue, saturation, lightness].join(',') + ')');
		}

	});

});
