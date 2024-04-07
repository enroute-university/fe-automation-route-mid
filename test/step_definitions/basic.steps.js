const { Given, When, Then, AfterAll } = require('cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');

let driver = new Builder().forBrowser('chrome').build();

Given('I navigate to {string}', async function (url) {
  await driver.get(url);
});

Given('user enters valid login credentials in Find a Flight section', async () => {
  await driver.findElement(By.name('userName')).sendKeys('testUser');
  await driver.findElement(By.name('password')).sendKeys('password');
});

When('I click on {string} button', async function (buttonText) {
  let button = await driver.findElement(By.xpath(`//button[contains(text(),'${buttonText}')]`));
  await button.click();
});

When('I click the submit button', async function () {
  let submitButton = await driver.findElement(By.css('input[type="submit"]'));
  await submitButton.click();
});

When('I click the continue button in Flight Finder page', async function () {
  let continueButton = await driver.findElement(By.css('input[name="findFlights"]'));
  await continueButton.click();
});

When('I scroll to the specials table', async function () {
  let specialsTable = await driver.findElement(By.xpath('//table[.//img[contains(@src, "hdr_specials")]]'));
  await driver.executeScript("arguments[0].scrollIntoView({ behavior: 'smooth', block: 'center' });", specialsTable);
  await driver.sleep(1000);
});

When('I click {string} option in left-side menu', async function (option) {
  const link = await driver.findElement(By.xpath(`//a[contains(text(), "${option}")]`));
  await link.click();
  await driver.sleep(1000);
});

When('I select Round Trip in Flight Details Type radio input', async function () {
  const roundTripRadio = await driver.findElement(By.css('input[name="tripType"][value="roundtrip"]'));
  await roundTripRadio.click();
});

When('I select {string} in Departing From dropdown', async function (option) {
  const departingFromDropdown = await driver.findElement(By.css('select[name="fromPort"]'));
  const optionElement = await departingFromDropdown.findElement(By.css(`option[value="${option}"]`));
  await optionElement.click();
});

When('I select {string} in Arriving In dropdown', async function (option) {
  const arrivingInDropdown = await driver.findElement(By.css('select[name="toPort"]'));
  const optionElement = await arrivingInDropdown.findElement(By.css(`option[value="${option}"]`));
  await optionElement.click();
});

Then('I should see a {string} message', async function (expectedMessage) {
  let messageElement = await driver.findElement(By.className('message'));
  const actualMessage = await messageElement.getText();
  // Compare the actual message with the expected message
  if (actualMessage.trim() === expectedMessage.trim()) {
    console.log(`Success: Found the expected message "${expectedMessage}"`);
  } else {
    console.error(`Error: Expected message "${expectedMessage}" not found. The message element contains text "${actualMessage}"`);
    throw new Error(`Expected message "${expectedMessage}" not found. The message element contains text "${actualMessage}"`);
  }
});

Then('I should see the Login Successfully page', async () => {
  let headerElement = await driver.findElement(By.xpath('//h3[contains(text(),"Login Successfully")]'));
  let messageElement = await driver.findElement(By.xpath('//b[contains(text(),"Thank you for logging")]'));

  await driver.wait(until.elementIsVisible(headerElement));
  await driver.wait(until.elementIsVisible(messageElement));
});

Then('I should see the specials table with the following information:', async function (dataTable) {
  const data = dataTable.hashes();
  let specialsTable = await driver.findElement(By.xpath('//table[contains(@width, "100%")][.//img[contains(@src, "hdr_specials")]]'));

  // Find all the rows inside the Specials Table
  let innerTable = await specialsTable.findElement(By.xpath('.//table'));
  let rows = await innerTable.findElements(By.css('tr'));

  // Verify that the specials table contains the expected flight information and prices
  for (let i = 0; i < data.length; i++) {
    const expectedFlight = data[i].Flight;
    const expectedPrice = data[i].Price;

    // Extract actual flight and price from the rows
    const actualFlight = await rows[i].findElement(By.xpath('./td[1]')).getText();
    const actualPrice = await rows[i].findElement(By.xpath('./td[2]')).getText();

    // Assert that the actual flight and price match the expected values
    assert.strictEqual(actualFlight.trim(), expectedFlight.trim(), `Flight and Price do not match: ${actualFlight} ${actualPrice}`);
    assert.strictEqual(actualPrice.trim(), expectedPrice.trim(), `Flight and Price do not match: ${actualFlight} ${actualPrice}`);
  }
});

Then('I should see that the URL is {string}', async function (expectedUrl) {
  const currentUrl = await driver.getCurrentUrl();
  assert.strictEqual(currentUrl, expectedUrl);
});

Then('Home page is displayed', async function () {
  const featuredDestinationImage = await driver.findElement(By.css('img[alt="Featured Destination: Aruba"]'));
  const isDisplayed = await featuredDestinationImage.isDisplayed();
  assert.strictEqual(isDisplayed, true, 'Home page is not displayed');
});

Then('Flight Finder page is displayed', async function () {
  const flightFinderImage = await driver.findElement(By.css('img[src="images/mast_flightfinder.gif"]'));
  const isDisplayed = await flightFinderImage.isDisplayed();
  assert.strictEqual(isDisplayed, true, 'Flight finder page is not displayed');
});

Then('After Flight Finder page is displayed', async function () {
  const titleElement = await driver.findElement(By.xpath('//b/font[1][@size="4"]'));
  const titleText = await titleElement.getText();
  assert.ok(await titleElement.isDisplayed(), 'After Flight Finder page is not displayed');
  assert.ok(titleText.includes('After flight finder'), 'Title does not contain "After Flight Finder"');
});

AfterAll(async function () {
  if (driver && (await driver.getSession())) {
    await driver.quit();
  }
});
