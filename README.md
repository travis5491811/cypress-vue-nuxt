# cypress-vue-nuxt

This is a example of individual component testing using `@cypress/vue`.
## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# run cypress/vue test
$ npm run cy:open
```

For detailed explanation on how things work, check out:

- [Nuxt.js docs](https://nuxtjs.org).
- [Cypress docs](https://docs.cypress.io/guides/overview/why-cypress).

## Working in your nuxt project

For your own project here are the steps to get `@cypress/vue` working:

1. `npm install --save-dev cypress @cypress/vue eslint-plugin-cypress webpack-dev-server @cypress/webpack-dev-server` 
2. Create and add the following configuration to `cypress.json` in the root of your project. Note my `testFiles` types and `componentFolder` directory:
   
  ```
    {
      "video": false,
      "fixturesFolder": false,
      "supportFile": false,
      "testFiles": "**/*spec.js",
      "componentFolder": "components"
    }
  ```
3. Update `.eslintrc.js` to include `'cypress/globals': true` in the `env:` object and `'plugin:cypress/recommended'` in the `extends:` array.
4. Add the magic configuration to `cypress/plugins.js` (create directory if it does not exists):
   
  ```   
    /// <reference types="cypress" />
    const { startDevServer } = require('@cypress/webpack-dev-server')
    const { getWebpackConfig } = require('nuxt')

    /**
    * @type Cypress.PluginConfig
    */
    module.exports = (on, config) => {
      on('dev-server:start', async (options) => {
        let webpackConfig = await getWebpackConfig('client', {
          for: 'dev',
        })

        // cleanup the webpack config from everything we do not need for testing components
        delete webpackConfig.output
        webpackConfig.plugins = webpackConfig.plugins.filter((a) => a.constructor.name !== 'HtmlWebpackPlugin')

        return startDevServer({
          options,
          webpackConfig,
        })
      })

      return config
    }
  ```
5. Add the following to your `package.json` scripts section `"cy:open": "cypress open-ct"`
6. Create some test covering how users will use your components.
7. Run your cypress test with `npm run cy:open`


