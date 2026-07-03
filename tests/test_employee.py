import pytest
from pages.login_page import LoginPage
from pages.employee_page import EmployeePage


@pytest.fixture(autouse=True)
def login_first(driver):
    lp = LoginPage(driver)
    lp.open_login()
    lp.login("admin", "admin123")
    yield


class TestEmployee:
    """Employee Module Tests"""

    def test_add_employee(self, driver):
        """TC-008: Add a new employee successfully"""
        page = EmployeePage(driver)
        before = page.get_employee_count()
        page.click_add_employee()
        page.fill_employee_form("Rohith Matam", "EMP-101", "rohith@talentflow.com")
        page.save_employee()
        msg = page.get_success_message()
        assert msg != "" or page.get_employee_count() > before

    def test_edit_employee(self, driver):
        """TC-009: Edit first employee record"""
        page = EmployeePage(driver)
        page.click_edit_first()
        page.fill_employee_form("Rohith Edited", "EMP-101", "edited@talentflow.com")
        page.save_employee()
        msg = page.get_success_message()
        assert msg != ""

    def test_delete_employee(self, driver):
        """TC-010: Delete first employee record"""
        page = EmployeePage(driver)
        before = page.get_employee_count()
        page.click_delete_first()
        after = page.get_employee_count()
        assert after < before, "Employee count should decrease after deletion"

    def test_duplicate_employee_validation(self, driver):
        """TC-011: Duplicate employee ID should show error"""
        page = EmployeePage(driver)
        page.click_add_employee()
        page.fill_employee_form("Duplicate User", "EMP-101", "dup@talentflow.com")
        page.save_employee()
        # Try adding again with same ID
        page.click_add_employee()
        page.fill_employee_form("Duplicate User", "EMP-101", "dup2@talentflow.com")
        page.save_employee()
        error = page.get_error_message()
        assert error != "", "Duplicate Employee ID should trigger a validation error"
