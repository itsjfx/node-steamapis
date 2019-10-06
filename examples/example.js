const SteamApis = require('../index.js');

const steamApis = new SteamApis('YOUR_STEAMAPIS_API_KEY');

steamApis.getInventory('76561197993496553', '730', '2')
.then((res) => {
	console.log(res);
}).catch((err) => {
	console.log(err);
});

/*steamApis.getItemsForApp('730')
.then((res) => {
	console.log(res);
}).catch((err) => {
	console.log(err);
});*/

/*steamApis.getAllCards()
.then((res) => {
	console.log(res);
}).catch((err) => {
	console.log(err);
});*/