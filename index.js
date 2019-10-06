const request = require('request-promise-native');
const SteamID = require('steamid');
const CEconItem = require('./CEconItem.js');

const API_URL = 'https://api.steamapis.com';

class steamApis {
	/**
	 * 
	 * @param {string} apiKey - Your steamapis.com apikey
	 */
	constructor(apiKey) {
		this.apiKey = apiKey;
	}

	_httpGet(options) {
		if (!options.qs)
			options.qs = {api_key: this.apiKey};
		else
			options.qs.api_key = this.apiKey;
		options.json = true;

		return request.get(options);
	}

	/**
	 * Get the contents of a users inventory. Designed to be the same as DoctorMcKay's getUserInventoryContents from node-steamcommunity (without language support). 
	 * @param {SteamID|string} steamid - SteamID object from node-steamid or a string which can be parsed into a SteamID object 
	 * @param {int} appid - The Steam application ID of the game 
	 * @param {int} contextid - The ID of the context within the game you wish to retrieve 
	 * @param {boolean} tradableOnly - true to get only tradeable items and currencies 
	 */
	getInventory(steamid, appid, contextid, tradableOnly) {
		return new Promise((resolve, reject) => {

			if (!steamid)
				return reject(new Error("The user's SteamID is invalid or missing."));

			if (typeof steamid === 'string') {
				steamid = new SteamID(steamid);
			}

			if (!steamid.isValid())
				return reject(new Error("The user's SteamID is invalid."));
			
			let inventory = [];
			let currency = [];
			let pos = 1; // Counter to hold the items position in the inventory starting from 1. Taken from CEconItem standard.

			this._httpGet({
				uri: `${API_URL}/steam/inventory/${steamid}/${appid}/${contextid}`,
			}).then((res) => {
				if (!res || !res.success || !res.assets || !res.descriptions)
					return reject(new Error("Malformed response"));

				for (let item in res.assets) {
					let description = getDescription(res.descriptions, res.assets[item].classid, res.assets[item].instanceid);
	
					if (!tradableOnly || (description && description.tradable)) {
						res.assets[item].pos = pos++;
						(res.assets[item].currencyid ? currency : inventory).push(new CEconItem(res.assets[item], description, contextid));
					}
				}
				return resolve(inventory, currency, res.total_inventory_count);
			}).catch((err) => {
				return reject(err);
			});

			// Below is taken from node-steamcommunity - a faster way of searching for descriptions for items.
			let quickDescriptionLookup = {};

			function getDescription(descriptions, classID, instanceID) {
				let key = classID + '_' + (instanceID || '0'); // instanceID can be undefined, in which case it's 0.
		
				if (quickDescriptionLookup[key]) {
					return quickDescriptionLookup[key];
				}
		
				for (let i = 0; i < descriptions.length; i++) {
					quickDescriptionLookup[descriptions[i].classid + '_' + (descriptions[i].instanceid || '0')] = descriptions[i];
				}
		
				return quickDescriptionLookup[key];
			}
		});
	}

	/**
	 * Return price details for items that belong to an appid from the steamapis.com database. For more information: https://steamapis.com/docs/market#items
	 * @param {int} appid - Identifier of the application which item you want to fetch
	 * @param {boolean} [compact] - Return only safe or the compactValue prices only 
	 * @param {string} [compactValue] - Changes the return values for items when compact is true
	 */
	getItemsForApp(appid, compact, compactValue) {
		return new Promise((resolve, reject) => {
			if (!compact && compactValue)
				return reject(new Error("You must set compact as true to use compactValue"));

			this._httpGet({
				url: `${API_URL}/market/items/${appid}`,
				qs: {
					format: compact ? 'compact' : undefined,
					compact_value: compactValue
				}
			}).then((res) => {
				return resolve(res);
			}).catch((err) => {
				return reject(err);
			});
		});
	}

	/**
	 * Return price details for all monitored Steam cards from the steamapis.com database. For more information: https://steamapis.com/docs/market#cards
	 */
	getAllCards() {
		return this._httpGet({
			url: `${API_URL}/market/items/cards`,
		})
	}
	
}

module.exports = steamApis;