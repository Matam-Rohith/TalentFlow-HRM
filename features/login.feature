Feature: Login Functionality
  As a TalentFlow HRM user
  I want to log in to the application
  So that I can access HR management features

  Background:
    Given User opens TalentFlow HRM

  Scenario: Valid Login
    When User enters valid credentials "admin" and "admin123"
    Then Dashboard should appear

  Scenario: Invalid Password
    When User enters credentials "admin" and "wrongpassword"
    Then An error message should be displayed

  Scenario: Empty Username
    When User enters credentials "" and "admin123"
    Then A validation error should appear

  Scenario: Empty Password
    When User enters credentials "admin" and ""
    Then A validation error should appear

  Scenario: SQL Injection Attempt
    When User enters credentials "' OR '1'='1" and "' OR '1'='1"
    Then Dashboard should NOT appear

  Scenario: Password Masking
    When User checks the password input field type
    Then The password field type should be "password"
