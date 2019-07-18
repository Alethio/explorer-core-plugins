# Unreleased

- Option to disable USD prices functionality by configuration, by making `PRICES_API_URL` optional.
- Add configurable `ethSymbol` (e.g. GöETH)
- Add configurable token address for main balance chart on account page. Useful when USD prices are disabled and we want to select either ETH or a given token for plotting.

# v3.0.0

- Move toolbar product links to `@alethio/explorer-plugin-eth-common`.

# v2.1.3

- Show date/time instead of short date in account accordion grids

# v2.1.2

- Fix clipboard copy confirmation icon in several components
- Show ellipsis for long block extra data tooltips

# v2.1.1

- Fix contract accordion console errors related to monaco-editor

# v2.1.0

- Add company link module (toolbar, topbar)

# v2.0.0

- Replaced search API with suggest API. `SEARCH_API_URL_MASK` config option updated in config.sample.json.
