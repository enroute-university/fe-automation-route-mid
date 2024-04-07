Feature: Display message

Scenario: User should see an initial "Start guessing..." message
  Given I navigate to 'http://localhost:5500'
  Then I should see a 'Start guessing...' message

Scenario: User should see a "No number" message after entering an empty value in number input 
  Given I navigate to 'http://localhost:5500'
  When I click on 'Check!' button
  Then I should see a '⛔️ No number!' message
