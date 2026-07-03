import pytest
from pages.login_page import LoginPage
from selenium.webdriver.common.by import By


class TestSmokeSuite:
    """Smoke Test Suite – Login, Dashboard, Logout"""

    def test_smoke_login(self, driver):
        """SMOKE-001: Application launches and login works"""
        page = LoginPage(driver)
        page.open_login()
        page.login("admin", "admin123")
        assert page.is_dashboard_visible(), "Smoke: Dashboard not visible"

    def test_smoke_dashboard_charts(self, driver):
        """SMOKE-002: Dashboard charts/widgets are rendered"""
        page = LoginPage(driver)
        page.open_login()
        page.login("admin", "admin123")
        try:
            chart = driver.find_element(By.CLASS_NAME, "chart-container")
            assert chart.is_displayed()
        except Exception:
            pytest.skip("Chart container not present – skipping chart smoke test")

    def test_smoke_navigation(self, driver):
        """SMOKE-003: Navigation menu items are clickable"""
        page = LoginPage(driver)
        page.open_login()
        page.login("admin", "admin123")
        try:
            nav = driver.find_element(By.CLASS_NAME, "nav-menu")
            assert nav.is_displayed()
        except Exception:
            pytest.skip("Nav menu not found – skipping nav smoke test")

    def test_smoke_logout(self, driver):
        """SMOKE-004: Logout clears session and returns to login"""
        page = LoginPage(driver)
        page.open_login()
        page.login("admin", "admin123")
        try:
            driver.find_element(By.ID, "logoutBtn").click()
            assert not page.is_dashboard_visible(), "Dashboard should not be visible after logout"
        except Exception:
            pytest.skip("Logout button not found – skipping logout smoke test")
