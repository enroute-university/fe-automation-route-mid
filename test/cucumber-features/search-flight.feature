Feature: Mercury Tours - Search Flight

  Scenario: User should be able to search a round trip from one place to another
    Given I navigate to 'https://demo.guru99.com/test/newtours/index.php'
    When I click 'Flights' option in left-side menu
    And Flight Finder page is displayed
    When I select Round Trip in Flight Details Type radio input
    And I select 'Acapulco' in Departing From dropdown
    And I select 'London' in Arriving In dropdown
    And I click the continue button in Flight Finder page
    Then After Flight Finder page is displayed
