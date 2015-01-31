require.config({
	paths: {
		jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min',
		backbone: 'vendor/backbone-min',
		underscore: 'vendor/underscore-min',
		openhose: 'vendor/openhose-visualizations-sdk.bundle',
		text: 'vendor/text',
		moment: 'vendor/moment'
	}
});

require(['views/app'], function(MainApp) {

	window.App = {
		Vent: _.extend({}, Backbone.Events),
		config: {
			userId: '54c22ac91342df12d0f2a288',
			userToken: 'fb74ed08c36695d6aadce0c4d51b7886011ff84044e162d59c5b0c60231d5f9beefef8ca40ed9793515ccaff37b1da6641b9e943fb6752ce22ab0a16f39016f6',
			streamId: '525530f4693be8226e000009'
		}
	};

	new MainApp();

});
