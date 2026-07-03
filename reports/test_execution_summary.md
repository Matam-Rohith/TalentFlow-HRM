# Test Execution Summary – TalentFlow HRM

**Framework:** Selenium + Pytest + Behave  
**Execution Date:** 2026-07-03  
**Environment:** Chrome (Headless), Windows 11  

## Results

| Metric          | Count |
|-----------------|-------|
| Total Tests     | 30    |
| Passed          | 28    |
| Failed          | 2     |
| Skipped         | 0     |
| Pass Rate       | 93.3% |

## Module-wise Breakdown

| Module       | Total | Passed | Failed |
|--------------|-------|--------|--------|
| Login        | 7     | 6      | 1      |
| Employee     | 4     | 3      | 1      |
| Attendance   | 3     | 3      | 0      |
| Payroll      | 3     | 3      | 0      |
| Smoke Suite  | 4     | 4      | 0      |
| BDD (Behave) | 9     | 9      | 0      |

## Failed Tests

| Test ID  | Test Name                                   | Reason             | Bug Ref  |
|----------|---------------------------------------------|--------------------|----------|
| TC-007   | test_login_button_remains_enabled_after_fail| Button is disabled | BUG-001  |
| TC-011   | test_duplicate_employee_validation          | No error shown     | BUG-003  |

## Regression Coverage

The full test suite is run after every code change to ensure no regressions are introduced. Pytest markers are used to separate smoke, regression, and BDD tests.
