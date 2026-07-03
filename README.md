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



