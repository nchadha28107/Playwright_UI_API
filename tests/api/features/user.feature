@reqres @api
Feature: ReqRes User Management API

  @create @positive
  Scenario: TC_1 Successfully create a new user and validate response
    Given I create a user with email "eve.holt@reqres.in" and password "pistol"
    Then the user creation should be successful
    And the response should have all required fields
    And I store the created user ID

  @get @positive
  Scenario: TC_2 Successfully retrieve user details by ID
    Given I create a user with email "eve.holt@reqres.in" and password "pistol"
    And I store the created user ID
    When I retrieve the user details using the stored user ID
    Then the user retrieval should be successful
    And the response should contain user details

  @update @positive
  Scenario: TC_3 Successfully update user name and validate
    Given I create a user with email "eve.holt@reqres.in" and password "pistol"
    And I store the created user ID
    When I update the user name to "morpheus" and job to "zion resident"
    Then the user update should be successful
    And the response should contain updated name "morpheus" and job "zion resident"
    And the response should contain updatedAt timestamp

  @get @negative
  Scenario: TC_4 Cannot retrieve user with invalid ID
    When I retrieve the user details using the user ID "99999"
    Then the user retrieval should fail