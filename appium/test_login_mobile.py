"""Basic mobile browser test using Appium – Android Chrome Emulator.
Requires: Appium server running on localhost:4723, Android emulator active.
"""
import pytest
from appium import webdriver as appium_driver
from appium.options import AppiumOptions


APP_URL = "http://localhost:8080"  # Update with your deployed TalentFlow URL


@pytest.fixture(scope="module")
def mobile_driver():
    options = AppiumOptions()
    options.platform_name = "Android"
    options.automation_name = "UiAutomator2"
    options.browser_name = "Chrome"
    options.device_name = "Android Emulator"
    options.language = "en"
    options.locale = "US"

    driver = appium_driver.Remote("http://localhost:4723", options=options)
    driver.implicitly_wait(10)
    yield driver
    driver.quit()


def test_mobile_valid_login(mobile_driver):
    """Mobile-001: Valid login on Android Chrome"""
    mobile_driver.get(APP_URL)
    mobile_driver.find_element("id", "username").send_keys("admin")
    mobile_driver.find_element("id", "password").send_keys("admin123")
    mobile_driver.find_element("id", "loginBtn").click()
    dashboard = mobile_driver.find_element("id", "dashboard")
    assert dashboard.is_displayed(), "Dashboard not visible on mobile after login"


def test_mobile_invalid_login(mobile_driver):
    """Mobile-002: Invalid login shows error on Android Chrome"""
    mobile_driver.get(APP_URL)
    mobile_driver.find_element("id", "username").send_keys("admin")
    mobile_driver.find_element("id", "password").send_keys("wrongpass")
    mobile_driver.find_element("id", "loginBtn").click()
    error = mobile_driver.find_element("id", "loginError")
    assert error.is_displayed(), "Error message not shown on mobile"
