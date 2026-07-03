from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class LoginPage(BasePage):
    USERNAME_INPUT = (By.ID, "username")
    PASSWORD_INPUT = (By.ID, "password")
    LOGIN_BUTTON = (By.ID, "loginBtn")
    ERROR_MESSAGE = (By.ID, "loginError")
    DASHBOARD = (By.ID, "dashboard")

    def open_login(self):
        self.open()

    def enter_username(self, username):
        field = self.driver.find_element(*self.USERNAME_INPUT)
        field.clear()
        field.send_keys(username)

    def enter_password(self, password):
        field = self.driver.find_element(*self.PASSWORD_INPUT)
        field.clear()
        field.send_keys(password)

    def click_login(self):
        self.driver.find_element(*self.LOGIN_BUTTON).click()

    def login(self, username, password):
        self.enter_username(username)
        self.enter_password(password)
        self.click_login()

    def get_error_message(self):
        try:
            return self.driver.find_element(*self.ERROR_MESSAGE).text
        except Exception:
            return ""

    def is_dashboard_visible(self):
        try:
            el = self.driver.find_element(*self.DASHBOARD)
            return el.is_displayed()
        except Exception:
            return False

    def is_login_button_enabled(self):
        return self.driver.find_element(*self.LOGIN_BUTTON).is_enabled()

    def is_password_masked(self):
        field = self.driver.find_element(*self.PASSWORD_INPUT)
        return field.get_attribute("type") == "password"
