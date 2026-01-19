Feature: DemoQA Bookstore Operations

  Scenario: TC_1 Login and search for a book in bookstore
    Given user lands on the homepage
    When user navigates to Book Store Application
    And user clicks Login Button
    And user logs in with valid credentials
    Then user validates username is correct
    And user validates Logout Button
    And user searches for "Learning JavaScript Design Patterns"
    Then search results should contain the book "Learning JavaScript Design Patterns"
    And book details should be printed to file
    When user clicks Logout Button
    Then user should be logged out successfully