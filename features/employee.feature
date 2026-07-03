Feature: Employee Management
  As an HR administrator
  I want to manage employee records
  So that the organization has up-to-date employee data

  Scenario: Add New Employee
    Given User is logged in as admin
    When User adds a new employee with name "Rohith Matam" id "EMP-101" email "rohith@talentflow.com"
    Then Employee record should be created successfully

  Scenario: Edit Employee
    Given User is logged in as admin
    When User edits the first employee record
    Then The employee record should be updated

  Scenario: Delete Employee
    Given User is logged in as admin
    When User deletes the first employee record
    Then The employee count should decrease

  Scenario: Duplicate Employee Validation
    Given User is logged in as admin
    When User adds an employee with duplicate ID "EMP-101"
    Then A duplicate validation error should appear
