# node-steamapis
[![npm version](https://img.shields.io/npm/v/steamapis.svg)](https://npmjs.com/package/steamapis)

Unofficial community-maintained module for https://steamapis.com

```
npm install steamapis
```

# Usage

I'd recommend checking the examples in the `examples` folder. The JSDoc is also in [doc.md](https://github.com/itsjfx/node-steamapis/blob/master/doc.md).

[Link to SteamApis.com docs](https://steamapis.com/docs)

Currently all methods return promises, and the method parameters mostly match the ones from the SteamApis docs. One exception `api_key` which is automatically put into every request. This value is set in the constructor for the instance.

# Some things to note about the module
Under the hood the inventory requests use my module `node-steam-inventory-api-ng`. Because of this, you can retry requests and customise the request timeout. Both of these are incredibly useful because sometimes SteamApis can be slow if you get a bad proxy. It also aims to be very similar to that of `node-steamcommunity`'s `getUserInventoryContents` call. It does this by returning the exact same response. **Simply put if you already use getUserInventoryContents you should feel right at home.**

All API calls are implemented as of now, however not all have been thoroughly tested as I don't need to use all of them for my use case.
