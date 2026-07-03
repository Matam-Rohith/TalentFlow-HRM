# TalentFlow HRM – QA Automation Framework

[![QA Automation](https://github.com/Matam-Rohith/TalentFlow-HRM/actions/workflows/qa_automation.yml/badge.svg)](https://github.com/Matam-Rohith/TalentFlow-HRM/actions/workflows/qa_automation.yml)

A production-style **Selenium + Pytest + Behave (BDD)** automation framework for the TalentFlow HRM web application, built using the **Page Object Model (POM)** design pattern.

---

## Architecture

```
TalentFlow-HRM/
├── pages/               # Page Object Model classes
│   ├── base_page.py
│   ├── login_page.py
│   ├── employee_page.py
│   └── payroll_page.py
├── tests/               # Pytest test cases
│   ├── test_login.py
│   ├── test_employee.py
│   ├── test_attendance.py
│   ├── test_payroll.py
│   └── test_smoke.py
├── features/            # Cucumber-style BDD feature files (Behave)
│   ├── login.feature
│   ├── employee.feature
│   └── environment.py
├── steps/               # Step definitions
│   ├── login_steps.py
│   └── employee_steps.py
├── appium/              # Basic mobile automation
│   └── test_login_mobile.py
├── reports/
│   ├── html_report.html
│   ├── bug_reports.md
│   └── test_execution_summary.md
├── screenshots/         # Auto-captured on failures
├── conftest.py          # Shared Pytest fixtures
├── pytest.ini           # Pytest config & markers
├── requirements.txt
└── .github/workflows/qa_automation.yml
```

---

## Tech Stack

| Tool | Purpose |
|---|---|
| Python 3.11 | Core language |
| Selenium WebDriver 4 | UI automation |
| Pytest | Test runner & assertions |
| Behave | BDD / Cucumber-style tests |
| Appium | Basic Android Chrome testing |
| pytest-html | HTML execution reports |
| WebDriver Manager | Auto-manages ChromeDriver |
| GitHub Actions | CI/CD pipeline |

---

## Test Cases (30 Total)

### Login Module (7)
| TC ID | Scenario | Type |
|---|---|---|
| TC-001 | Valid login → Dashboard visible | Functional |
| TC-002 | Invalid password → Error message | Negative |
| TC-003 | Empty username → Validation error | Negative |
| TC-004 | Empty password → Validation error | Negative |
| TC-005 | SQL Injection → Access denied | Security |
| TC-006 | Password field masked | UI |
| TC-007 | Login button stays enabled after failure | BUG-001 |

### Employee Module (4)
| TC ID | Scenario | Type |
|---|---|---|
| TC-008 | Add new employee | Functional |
| TC-009 | Edit employee record | Functional |
| TC-010 | Delete employee | Functional |
| TC-011 | Duplicate ID validation | Negative |

### Attendance Module (3)
| TC ID | Scenario | Type |
|---|---|---|
| TC-012 | Mark attendance | Functional |
| TC-013 | Submit leave request | Functional |
| TC-014 | View attendance report | Functional |

### Payroll Module (3)
| TC ID | Scenario | Type |
|---|---|---|
| TC-015 | Generate salary | Functional |
| TC-016 | Negative salary rejected | Negative |
| TC-017 | Download payslip visible | Functional |

### Smoke Suite (4)
| TC ID | Scenario |
|---|---|
| SMOKE-001 | Application loads & login works |
| SMOKE-002 | Dashboard charts render |
| SMOKE-003 | Navigation menu works |
| SMOKE-004 | Logout clears session |

### BDD Scenarios (9) – Behave
- 6 Login scenarios (`features/login.feature`)
- 4 Employee scenarios (`features/employee.feature`)

---

## Test Execution Summary

| Metric | Result |
|---|---|
| Total Tests | 30 |
| ✅ Passed | 28 |
| ❌ Failed | 2 |
| Pass Rate | **93.3%** |

Failed tests map to **BUG-001** (login button disabled) and **BUG-003** (no duplicate employee validation).

---

## How to Run

### Prerequisites
```bash
pip install -r requirements.txt
```

### Run Full Suite (Regression)
```bash
pytest
```

### Run Smoke Tests Only
```bash
pytest tests/test_smoke.py -v
```

### Run BDD Tests (Behave)
```bash
behave features/login.feature
behave features/employee.feature
```

### Run with HTML Report
```bash
pytest --html=reports/html_report.html --self-contained-html
```

---

## Bug Reports

See [`reports/bug_reports.md`](reports/bug_reports.md) for 7 structured defect reports with Severity, Priority, Steps to Reproduce, Expected vs Actual results.

**Sample:**

> **BUG-001** – Login button disabled after invalid password attempt  
> Severity: **High** | Priority: **High** | Status: **Open**

---

## CI/CD Pipeline

GitHub Actions runs the full test suite on every push/PR to `main`.  
HTML reports and failure screenshots are uploaded as build artifacts.

---

## Resume Lines

> - Developed a Selenium-Python automation framework using the Page Object Model and Pytest  
> - Automated 30+ functional, regression, and smoke test cases for HR modules  
> - Implemented Cucumber (Behave) for BDD test scenarios  
> - Generated HTML execution reports and captured screenshots for failed test cases  
> - Created structured defect reports with severity and priority classifications  
> - Performed basic cross-platform validation using Appium on Android Chrome  
> - Configured GitHub Actions CI/CD to run regression tests on every commit
