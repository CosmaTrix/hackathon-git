/**
 * hashtag-mood.js view
 */
define(['backbone'], function (Backbone) {

	return Backbone.View.extend({

		initialize: function () {
			App.Vent.on('changeMood', this.render, this);
		},

		render: function () {
			this.$('h1').css('color', 'red');
		}

	});

});
