import { AfterAll } from '@cucumber/cucumber';

// Cleanup function to close the browser session
AfterAll(async function () {
  await driver.quit(); // Close the browser session
});
