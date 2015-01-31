
App.views.Home = Backbone.View.extend({

	el: '.container',

	initialize: function() {
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
