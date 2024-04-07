Feature: Mercury Tours - Home and Cruises are the same page
  
  Scenario: User should see the same content for Home and Cruises options in left-side menu
    Given I navigate to 'https://demo.guru99.com/test/newtours/index.php'
    When I click 'Home' option in left-side menu
    Then I should see that the URL is 'https://demo.guru99.com/test/newtours/index.php'
    And Home page is displayed
    When I click 'Hotels' option in left-side menu
    Then I should see that the URL is 'https://demo.guru99.com/test/newtours/index.php'
    And Home page is displayed 
