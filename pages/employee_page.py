from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class EmployeePage(BasePage):
    ADD_EMPLOYEE_BTN = (By.ID, "addEmployeeBtn")
    EMPLOYEE_NAME_INPUT = (By.ID, "empName")
    EMPLOYEE_ID_INPUT = (By.ID, "empId")
    EMPLOYEE_EMAIL_INPUT = (By.ID, "empEmail")
    SAVE_BTN = (By.ID, "saveEmployeeBtn")
    EMPLOYEE_LIST = (By.CLASS_NAME, "employee-row")
    SUCCESS_MSG = (By.ID, "empSuccessMsg")
    ERROR_MSG = (By.ID, "empErrorMsg")
    EDIT_BTN = (By.CLASS_NAME, "edit-emp-btn")
    DELETE_BTN = (By.CLASS_NAME, "delete-emp-btn")

    def click_add_employee(self):
        self.driver.find_element(*self.ADD_EMPLOYEE_BTN).click()

    def fill_employee_form(self, name, emp_id, email):
        self.driver.find_element(*self.EMPLOYEE_NAME_INPUT).clear()
        self.driver.find_element(*self.EMPLOYEE_NAME_INPUT).send_keys(name)
        self.driver.find_element(*self.EMPLOYEE_ID_INPUT).clear()
        self.driver.find_element(*self.EMPLOYEE_ID_INPUT).send_keys(emp_id)
        self.driver.find_element(*self.EMPLOYEE_EMAIL_INPUT).clear()
        self.driver.find_element(*self.EMPLOYEE_EMAIL_INPUT).send_keys(email)

    def save_employee(self):
        self.driver.find_element(*self.SAVE_BTN).click()

    def get_success_message(self):
        try:
            return self.driver.find_element(*self.SUCCESS_MSG).text
        except Exception:
            return ""

    def get_error_message(self):
        try:
            return self.driver.find_element(*self.ERROR_MSG).text
        except Exception:
            return ""

    def get_employee_count(self):
        return len(self.driver.find_elements(*self.EMPLOYEE_LIST))

    def click_edit_first(self):
        btns = self.driver.find_elements(*self.EDIT_BTN)
        if btns:
            btns[0].click()

    def click_delete_first(self):
        btns = self.driver.find_elements(*self.DELETE_BTN)
        if btns:
            btns[0].click()
