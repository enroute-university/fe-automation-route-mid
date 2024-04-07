Feature: Mercury Tours - Successful Login
  
  Scenario: User should see a "Login successfully" message after entering valid credentials
    Given I navigate to 'https://demo.guru99.com/test/newtours/index.php'
    And user enters valid login credentials in Find a Flight section
    When I click the submit button
    Then I should see the Login Successfully page
