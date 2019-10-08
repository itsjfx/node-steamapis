<a name="SteamApis"></a>

## SteamApis
**Kind**: global class  

* [SteamApis](#SteamApis)
    * [new SteamApis(apiKey)](#new_SteamApis_new)
    * [.getInventory(steamid, appid, contextid, tradableOnly)](#SteamApis+getInventory) ⇒ <code>Promise</code>
    * [.getProfileData(steamid)](#SteamApis+getProfileData) ⇒ <code>Promise</code>
    * [.getMarketStats()](#SteamApis+getMarketStats) ⇒ <code>Promise</code>
    * [.getDataForApp(appid)](#SteamApis+getDataForApp) ⇒ <code>Promise</code>
    * [.getDataForAllApps()](#SteamApis+getDataForAllApps) ⇒ <code>Promise</code>
    * [.getItemFromApp(appid, market_hash_name)](#SteamApis+getItemFromApp) ⇒ <code>Promise</code>
    * [.getItemsForApp(appid, [compact], [compactValue])](#SteamApis+getItemsForApp) ⇒ <code>Promise</code>
    * [.getAllCards()](#SteamApis+getAllCards) ⇒ <code>Promise</code>
    * [.getImageRedirectForItem(appid, market_hash_name)](#SteamApis+getImageRedirectForItem) ⇒ <code>Promise</code>
    * [.getAllImagesForApp(appid)](#SteamApis+getAllImagesForApp) ⇒ <code>Promise</code>

<a name="new_SteamApis_new"></a>

### new SteamApis(apiKey)

| Param | Type | Description |
| --- | --- | --- |
| apiKey | <code>string</code> | Your steamapis.com apikey |

<a name="SteamApis+getInventory"></a>

### steamApis.getInventory(steamid, appid, contextid, tradableOnly) ⇒ <code>Promise</code>
Get the contents of a users inventory. Designed to be the same as DoctorMcKay's getUserInventoryContents from node-steamcommunity (without language support).

**Kind**: instance method of [<code>SteamApis</code>](#SteamApis)  
**Returns**: <code>Promise</code> - Promise object containing an object with keys: inventory, currency and total_inventory_count - with inventory and currency being an array of CEconItem objects.  

| Param | Type | Description |
| --- | --- | --- |
| steamid | <code>SteamID</code> \| <code>string</code> | SteamID object from node-steamid or a string which can be parsed into a SteamID object |
| appid | <code>int</code> | The Steam application ID of the app |
| contextid | <code>int</code> | The ID of the context within the app you wish to retrieve |
| tradableOnly | <code>boolean</code> | true to get only tradeable items and currencies |

<a name="SteamApis+getProfileData"></a>

### steamApis.getProfileData(steamid) ⇒ <code>Promise</code>
Fetches Steam's profile endpoint and returns detailed information about the user and its inventory contexts. For more information: https://steamapis.com/docs/steam#profile

**Kind**: instance method of [<code>SteamApis</code>](#SteamApis)  
**Returns**: <code>Promise</code> - Promise object with steamapis raw response  

| Param | Type | Description |
| --- | --- | --- |
| steamid | <code>SteamID</code> \| <code>string</code> | SteamID object from node-steamid or a string which can be parsed into a SteamID object |

<a name="SteamApis+getMarketStats"></a>

### steamApis.getMarketStats() ⇒ <code>Promise</code>
Returns the data that displayed on the front page of steamapis.com.

**Kind**: instance method of [<code>SteamApis</code>](#SteamApis)  
**Returns**: <code>Promise</code> - Promise object with steamapis raw response  
<a name="SteamApis+getDataForApp"></a>

### steamApis.getDataForApp(appid) ⇒ <code>Promise</code>
Returns detailed data about any app from the steamapis.com database. For more information: https://steamapis.com/docs/market#app

**Kind**: instance method of [<code>SteamApis</code>](#SteamApis)  
**Returns**: <code>Promise</code> - Promise object with steamapis raw response  

| Param | Type | Description |
| --- | --- | --- |
| appid | <code>int</code> | Identifier of the application |

<a name="SteamApis+getDataForAllApps"></a>

### steamApis.getDataForAllApps() ⇒ <code>Promise</code>
Returns all apps from the steamapis.com database. For more information: https://steamapis.com/docs/market#apps

**Kind**: instance method of [<code>SteamApis</code>](#SteamApis)  
**Returns**: <code>Promise</code> - Promise object with steamapis raw response  
<a name="SteamApis+getItemFromApp"></a>

### steamApis.getItemFromApp(appid, market_hash_name) ⇒ <code>Promise</code>
Returns detailed data about any item from the steamapis.com database. For more information: https://steamapis.com/docs/market#item

**Kind**: instance method of [<code>SteamApis</code>](#SteamApis)  
**Returns**: <code>Promise</code> - Promise object with steamapis raw response  

| Param | Type | Description |
| --- | --- | --- |
| appid | <code>int</code> | Identifier of the application for the item you wish to fetch |
| market_hash_name | <code>string</code> | The value of the market hash name of the item you wish to fetch |

<a name="SteamApis+getItemsForApp"></a>

### steamApis.getItemsForApp(appid, [compact], [compactValue]) ⇒ <code>Promise</code>
Return price details for items that belong to an appid from the steamapis.com database. For more information: https://steamapis.com/docs/market#items

**Kind**: instance method of [<code>SteamApis</code>](#SteamApis)  
**Returns**: <code>Promise</code> - Promise object with steamapis raw response  

| Param | Type | Description |
| --- | --- | --- |
| appid | <code>int</code> | Identifier of the application for the item you wish to fetch |
| [compact] | <code>boolean</code> | Return only safe or the compactValue prices only |
| [compactValue] | <code>string</code> | Changes the return values for items when compact is true |

<a name="SteamApis+getAllCards"></a>

### steamApis.getAllCards() ⇒ <code>Promise</code>
Return price details for all monitored Steam cards from the steamapis.com database. For more information: https://steamapis.com/docs/market#cards

**Kind**: instance method of [<code>SteamApis</code>](#SteamApis)  
**Returns**: <code>Promise</code> - Promise object with steamapis raw response  
<a name="SteamApis+getImageRedirectForItem"></a>

### steamApis.getImageRedirectForItem(appid, market_hash_name) ⇒ <code>Promise</code>
Redirects to the image of specified item if it exists on the steamapis.com database, else an error is returned. For more information: https://steamapis.com/docs/images#item

**Kind**: instance method of [<code>SteamApis</code>](#SteamApis)  
**Returns**: <code>Promise</code> - Promise object with steamapis raw response  

| Param | Type | Description |
| --- | --- | --- |
| appid | <code>int</code> | Identifier of the application for the image you wish to fetch |
| market_hash_name | <code>string</code> | The value of the market hash name of the image you wish to fetch |

<a name="SteamApis+getAllImagesForApp"></a>

### steamApis.getAllImagesForApp(appid) ⇒ <code>Promise</code>
Returns all item images on the steamapis.com database that belong to the specified application. For more information: https://steamapis.com/docs/images#items

**Kind**: instance method of [<code>SteamApis</code>](#SteamApis)  
**Returns**: <code>Promise</code> - Promise object with steamapis raw response  

| Param | Type | Description |
| --- | --- | --- |
| appid | <code>int</code> | Identifier of the application for the images you wish to fetch |

