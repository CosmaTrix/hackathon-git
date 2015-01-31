/**
 * stream.js view
 */
define(['backbone', 'collections/streams'], function (Backbone, StreamsCollection) {

	return Backbone.View.extend({

		initialize: function() {
			this.collection = new StreamsCollection();

			this.listenTo(this.collection, 'reset', this.emptyStream);
			this.listenTo(this.collection, 'add', this.renderStream);

			this.fetchData();

			this.interval = setInterval(_.bind(this.fetchData, this), 60 * 1000);
		},

		fetchData: function() {
			this.collection.reset();
			this.collection.fetch();
		},

		emptyStream: function() {
			this.$('ul').empty();
		},

		renderStream: function(streamModel) {
			var $li = $('<li>');

			$li.text(streamModel.get('title'));

			this.$('ul').append($li);
		}

	});

});
