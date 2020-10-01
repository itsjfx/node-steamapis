const request = require('request-promise-native');
const SteamID = require('steamid');
const InventoryAPI = require('steam-inventory-api-ng');

const API_URL = 'https://api.steamapis.com';

/**
 * SteamApis
 * @class
 */
class SteamApis {
	/**
	 * A SteamApis instance
	 * @constructor
	 * @param {string} apiKey - Your steamapis.com apikey
	 * @param {Object} [options] - Optional options for the api
	 * @param {Object} [options.inventoryApi] - The settings to pass into the steam-inventory-api-ng constructor when the instance gets created
	 */
	constructor(apiKey, options = {}) {
		this.apiKey = apiKey;

		const DEFAULT_INVENTORY_API_OPTIONS = {
			requestOptions: {
				uri: (steamid, appid, contextid) => `https://api.steamapis.com/steam/inventory/${steamid}/${appid}/${contextid}`,
				qs: {
					api_key: apiKey,
				},
			},
		};

		let inventoryApiOptions = options.inventoryApi || DEFAULT_INVENTORY_API_OPTIONS;
		if (options.inventoryApi) {
			// Replace the default inventory API options we need so we can make steamapis requests
			inventoryApiOptions.requestOptions = Object.assign({}, DEFAULT_INVENTORY_API_OPTIONS.requestOptions, options.inventoryApi.requestOptions);
			if (options.inventoryApi.requestOptions.qs) {
				inventoryApiOptions.requestOptions.qs = Object.assign({}, DEFAULT_INVENTORY_API_OPTIONS.requestOptions.qs, options.inventoryApi.requestOptions.qs);
			}
		}
		this._inventoryApi = new InventoryAPI(inventoryApiOptions);
	}

	_httpGet(options) {
		if (!options.qs) {
			options.qs = {api_key: this.apiKey};
		} else {
			options.qs.api_key = this.apiKey;
		}
		options.json = true;

		return request.get(options);
	}

	/**
	 * Get the contents of a users inventory. Designed to be the same as DoctorMcKay's getUserInventoryContents from node-steamcommunity (without language support and with retries). 
	 * @param {SteamID|string} steamid - SteamID object from node-steamid or a string which can be parsed into a SteamID object 
	 * @param {int} appid - The Steam application ID of the app 
	 * @param {int} contextid - The ID of the context within the app you wish to retrieve 
	 * @param {boolean} [tradableOnly] - true to get only tradeable items and currencies 
	 * @param {number} [retries=1] - How many calls to make to an inventory before rejecting. If an inventory is private or not found this value is ignored and an error is thrown after the first request.
	 * @returns {Promise} Promise object containing an object with keys: inventory, currency and total_inventory_count - with inventory and currency being an array of CEconItem objects.
	 */
	getInventory(steamid, appid, contextid, tradableOnly, retries = 1) {
		return this._inventoryApi.get(steamid, appid, contextid, tradableOnly, retries);
	}

	/**
	 * Fetches Steam's profile endpoint and returns detailed information about the user and its inventory contexts. For more information: https://steamapis.com/docs/steam#profile
	 * @param {SteamID|string} steamid - SteamID object from node-steamid or a string which can be parsed into a SteamID object 
	 * @returns {Promise} Promise object with steamapis raw response
	 */
	getProfileData(steamid) {
		if (!steamid) {
			return Promise.reject(new Error("The user's SteamID is invalid or missing."));
		}
		if (typeof steamid === 'string') {
			steamid = new SteamID(steamid);
		}
		if (!steamid.isValid()) {
			return Promise.reject(new Error("The user's SteamID is invalid."));
		}

		return this._httpGet({
			url: `${API_URL}/steam/profile/${steamid}`
		});
	}

	/**
	 * Returns the data that displayed on the front page of steamapis.com.
	 * @returns {Promise} Promise object with steamapis raw response
	 */
	getMarketStats() {
		return this._httpGet({
			url: `${API_URL}/market/stats`
		});
	}

	/**
	 * Returns detailed data about any app from the steamapis.com database. For more information: https://steamapis.com/docs/market#app
	 * @param {int} appid - Identifier of the application
	 * @returns {Promise} Promise object with steamapis raw response
	 */
	getDataForApp(appid) {
		return this._httpGet({
			url: `${API_URL}/market/app/${appid}`
		});
	}

	/** 
	 * Returns all apps from the steamapis.com database. For more information: https://steamapis.com/docs/market#apps 
	 * @returns {Promise} Promise object with steamapis raw response
	 */
	getDataForAllApps() {
		return this._httpGet({
			url: `${API_URL}/market/apps`
		});
	}

	/**
	 * Returns detailed data about any item from the steamapis.com database. For more information: https://steamapis.com/docs/market#item
	 * @param {int} appid - Identifier of the application for the item you wish to fetch
	 * @param {string} market_hash_name - The value of the market hash name of the item you wish to fetch
	 * @returns {Promise} Promise object with steamapis raw response
	 */
	getItemFromApp(appid, market_hash_name) {
		return this._httpGet({
			url: `${API_URL}/market/item/${appid}/${market_hash_name}`
		});
	}

	/**
	 * Return price details for items that belong to an appid from the steamapis.com database. For more information: https://steamapis.com/docs/market#items
	 * @param {int} appid - Identifier of the application for the item you wish to fetch
	 * @param {boolean|string} [compactValue] - Changes the return values for items, if true uses steamapis.com's default
	 * @returns {Promise} Promise object with steamapis raw response
	 */
	getItemsForApp(appid, compactValue) {
		return this._httpGet({
			url: `${API_URL}/market/items/${appid}`,
			qs: {
				format: compactValue ? 'compact' : undefined,
				compact_value: compactValue && compactValue !== true ? compactValue : undefined,
			}
		});
	}

	/**
	 * Return price details for all monitored Steam cards from the steamapis.com database. For more information: https://steamapis.com/docs/market#cards
	 * @returns {Promise} Promise object with steamapis raw response
	 */
	getAllCards() {
		return this._httpGet({
			url: `${API_URL}/market/items/cards`
		});
	}

	/**
	 * Redirects to the image of specified item if it exists on the steamapis.com database, else an error is returned. For more information: https://steamapis.com/docs/images#item
	 * @param {int} appid - Identifier of the application for the image you wish to fetch
	 * @param {string} market_hash_name - The value of the market hash name of the image you wish to fetch
	 * @returns {Promise} Promise object with steamapis raw response
	 */
	getImageRedirectForItem(appid, market_hash_name) {
		return this._httpGet({
			url: `${API_URL}/image/item/${appid}/${market_hash_name}`
		});
	}

	/**
	 * Returns all item images on the steamapis.com database that belong to the specified application. For more information: https://steamapis.com/docs/images#items
	 * @param {int} appid - Identifier of the application for the images you wish to fetch
	 * @returns {Promise} Promise object with steamapis raw response
	 */
	getAllImagesForApp(appid) {
		return new Promise((resolve, reject) => {
			this._httpGet({
				url: `${API_URL}/image/items/${appid}`
			}).then((res) => {
				if (!res || Object.keys(res).length == 0) {
					return reject(new Error("Invalid response from steamapis.com. Please check your input."));
				}
				return resolve(res);
			}).catch((err) => reject(err));
		});
	}
}

module.exports = SteamApis;
