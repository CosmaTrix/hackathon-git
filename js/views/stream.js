/**
 * stream.js view
 */
define([
	'backbone',
	'moment',
	'collections/streams',
	'text!templates/stream.html'],
	function (Backbone, moment, StreamsCollection, streamTemplate) {

	return Backbone.View.extend({

		initialize: function() {
			// init streams collection
			this.collection = new StreamsCollection();

			// add view listeners
			this.listenTo(this.collection, 'reset', this.emptyStream);
			this.listenTo(this.collection, 'add', this.renderStream);

			// fetch data on load
			this.fetchData();

			// set interval refresh
			this.interval = setInterval(_.bind(this.fetchData, this), 60 * 1000);
		},

		fetchData: function() {
			// reset collection and fetch new data
			this.collection.reset();
			this.collection.fetch();
		},

		emptyStream: function() {
			// empty container
			this.$('.liveTweetsContainer').empty();
		},

		renderStream: function(streamModel) {
			// format data
			var data = streamModel.toJSON();
			data.published = moment(data.published).format('DD-MM-YYYY HH:MM');

			// render data
			this.$('.liveTweetsContainer').append(_.template(streamTemplate, data));
		}

	});

});
