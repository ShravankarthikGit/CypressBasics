const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  retries: {
    // Number of attempts when running 'cypress run' (CLI)
    runMode: 2,
    // Number of attempts when running 'cypress open' (Browser UI)
    openMode: 0,
  },
  e2e: {
    defaultCommandTimeout: 10000, // Increase from 4s to 10s
    pageLoadTimeout: 60000,      // Increase time allowed for page to load
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://playground.bondaracademy.com/'
  },
  viewportWidth: 1280,
  viewportHeight: 720,

});
