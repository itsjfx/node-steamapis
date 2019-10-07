const SteamApis = require('../index.js'); // Or if installed require('steamapis')

const steamApis = new SteamApis(process.env.STEAMAPIS_API_KEY || 'YOUR_STEAMAPIS_API_KEY');

steamApis.getInventory('76561197993496553', 753, 6)
.then((res) => {
	console.log(res);
}).catch((err) => {
	console.log(err);
});

/*steamApis.getAllImagesForApp(730)
.then((res) => {
	console.log(res);
}).catch((err) => {
	console.log(err);
});*/

/*steamApis.getItemsForApp(730)
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