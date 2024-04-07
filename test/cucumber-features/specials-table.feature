Feature: Mercury Tours - Specials Table
  
  Scenario: User should see the specials table with the right price for each flight
    Given I navigate to 'https://demo.guru99.com/test/newtours/index.php'
    When I scroll to the specials table
    Then I should see the specials table with the following information:
      | Flight                    | Price |
      | Atlanta to Las Vegas      | $398  |
      | Boston to San Francisco   | $513  |
      | Los Angeles to Chicago    | $168  |
      | New York to Chicago       | $198  |
      | Phoenix to San Francisco  | $213  |
