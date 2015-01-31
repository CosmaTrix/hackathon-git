
App.views.Home = Backbone.View.extend({
	el: '.container',

	initialize: function() {
		this.collection.fetch();

		this.listenTo(this.collection, 'add', this.renderStream);
	},

	renderStream: function(streamModel) {
		var $li = $('<li>');

		$li.text(streamModel.get('title'));

		this.$('ul').append($li);
	}

});
