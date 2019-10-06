# node-steamapis
[![npm version](https://img.shields.io/npm/v/steamapis.svg)](https://npmjs.com/package/steamapis)

Unofficial community-maintained module for https://steamapis.com

```
npm install steamapis
```

## How to use

I'd recommend checking the examples in the examples/ folder.  
Currently all methods return promises, and the method parameters are designed to match parameters from the calls at: https://steamapis.com/docs apart from the api_key which is automatically put into every request, and is set in the constructor for the api.

## Some things to note about the API
For the inventory api, steamapis.com seem to already have detection for whether an inventory is private, or if a steamid cannot be found and these methods will return an error object with 403 or 404.  As of now there is steamid checking in the calls to save API calls in the case of an invalid steamid.  
Also for the inventory api, I attempted to replicate DoctorMcKay's getUserInventoryContents's as well as I could. This involves the getInventory call returning an array of CEconItem's and using DoctorMcKay's parser for descriptions and assets from the steamapis.com call. **Simply put if you already use getUserInventoryContents you should feel right at home.**

I have only implemented three of the calls as of now: getInventory (https://steamapis.com/docs/steam#inventory), getItemsForApp (https://steamapis.com/docs/market#items), and getAllCards (https://steamapis.com/docs/market#cards). In the future I'm looking to fully implement all APIs.

## API
See api.md