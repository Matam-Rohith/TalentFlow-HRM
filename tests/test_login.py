import pytest
from pages.login_page import LoginPage


class TestLogin:
    """Login Module – Functional & Security Tests"""

    def test_valid_login(self, driver):
        """TC-001: Valid credentials should show dashboard"""
        page = LoginPage(driver)
        page.open_login()
        page.login("admin", "admin123")
        assert page.is_dashboard_visible(), "Dashboard not visible after valid login"

    def test_invalid_password(self, driver):
        """TC-002: Invalid password should show error"""
        page = LoginPage(driver)
        page.open_login()
        page.login("admin", "wrongpass")
        error = page.get_error_message()
        assert error != "", "Expected error message for invalid password"

    def test_empty_username(self, driver):
        """TC-003: Empty username should show validation error"""
        page = LoginPage(driver)
        page.open_login()
        page.login("", "admin123")
        error = page.get_error_message()
        assert error != "", "Expected error for empty username"

    def test_empty_password(self, driver):
        """TC-004: Empty password should show validation error"""
        page = LoginPage(driver)
        page.open_login()
        page.login("admin", "")
        error = page.get_error_message()
        assert error != "", "Expected error for empty password"

    def test_sql_injection_input(self, driver):
        """TC-005: SQL injection payload should not bypass login"""
        page = LoginPage(driver)
        page.open_login()
        page.login("' OR '1'='1", "' OR '1'='1")
        assert not page.is_dashboard_visible(), "SQL injection should NOT grant access"

    def test_password_field_masked(self, driver):
        """TC-006: Password field should be of type 'password'"""
        page = LoginPage(driver)
        page.open_login()
        assert page.is_password_masked(), "Password field should be masked"

    def test_login_button_remains_enabled_after_failure(self, driver):
        """TC-007: Login button should remain enabled after failed attempt (BUG-001 check)"""
        page = LoginPage(driver)
        page.open_login()
        page.login("admin", "wrong")
        assert page.is_login_button_enabled(), "[BUG-001] Login button disabled after invalid password"
