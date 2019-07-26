# Unreleased

- Fix error when searching for a non-existent tx hash.

# v3.2.0

- Update to `pending/v3` deepstream API.

# v3.1.0

- Option to disable USD prices functionality by configuration (`usdPrices` config option).
- Add configurable `ethSymbol` (e.g. GöETH)
- Add configurable token address for main balance chart on account page (`mainChartTokenAddress` module option). Useful when USD prices are disabled and we want to plot ETH or a given token instead.

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
