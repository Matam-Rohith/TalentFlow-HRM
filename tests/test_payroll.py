import pytest
from pages.login_page import LoginPage
from pages.payroll_page import PayrollPage


@pytest.fixture(autouse=True)
def login_first(driver):
    lp = LoginPage(driver)
    lp.open_login()
    lp.login("admin", "admin123")
    yield


class TestPayroll:
    """Payroll Module Tests"""

    def test_generate_salary(self, driver):
        """TC-015: Generate salary for an employee"""
        page = PayrollPage(driver)
        page.click_generate_salary()
        page.set_salary(50000)
        page.confirm_payroll()
        msg = page.get_success_message()
        assert msg != "", "Expected success message after salary generation"

    def test_invalid_salary_value(self, driver):
        """TC-016: Negative salary should trigger validation error"""
        page = PayrollPage(driver)
        page.click_generate_salary()
        page.set_salary(-5000)
        page.confirm_payroll()
        error = page.get_error_message()
        assert error != "", "Negative salary should show validation error"

    def test_download_payslip(self, driver):
        """TC-017: Download payslip button should be visible after generation"""
        page = PayrollPage(driver)
        page.click_generate_salary()
        page.set_salary(50000)
        page.confirm_payroll()
        assert page.is_download_visible(), "Download payslip button should appear"
