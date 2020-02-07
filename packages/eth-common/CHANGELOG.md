# Unreleased

- **Breaking change** Update to plugin-api@1.0.0-beta.7 (@alethio/cms@1.0.0-beta.10). This is breaking change because the plugin will no longer work with older cms versions.

# v3.0.0

- **Breaking change** Rework account page layout to use a regular sidebar

# v2.4.0

- Add plugin manifest (@alethio/cms@1.0.0-beta.7)

# v2.3.0

- Add help content (requires @alethio/cms@1.0.0-beta.6)

# v2.2.0

- Fix a layout bug in search module which was visible only when the module was placed in a relatively positioned parent
- Add cookie banner module

# v2.1.2

- Fix clicks on search results not triggering on touchpads on slower mouse clicks

# v2.1.1

- Fix network switch not being clear enough by adding a dropdown icon

# v2.1.0

- Add toolbar product links from `@alethio/explorer-plugin-eth-extended`. See [config.sample.json](config.sample.json) for configuration changes.
- Add module showing the current network and option to switch to other deployments or external URLs

# v2.0.0

- Update search API interface. Search widget now requires eth-lite or eth-extended v2 plugins.
- Autosuggest functionality for search module
