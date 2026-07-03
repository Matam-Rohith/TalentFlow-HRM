from selenium.webdriver.common.by import By
from pages.base_page import BasePage


class PayrollPage(BasePage):
    GENERATE_SALARY_BTN = (By.ID, "generateSalaryBtn")
    EMPLOYEE_SELECT = (By.ID, "payrollEmpSelect")
    SALARY_INPUT = (By.ID, "salaryAmount")
    CONFIRM_BTN = (By.ID, "confirmPayrollBtn")
    SUCCESS_MSG = (By.ID, "payrollSuccess")
    ERROR_MSG = (By.ID, "payrollError")
    DOWNLOAD_PAYSLIP_BTN = (By.ID, "downloadPayslipBtn")

    def click_generate_salary(self):
        self.driver.find_element(*self.GENERATE_SALARY_BTN).click()

    def set_salary(self, amount):
        field = self.driver.find_element(*self.SALARY_INPUT)
        field.clear()
        field.send_keys(str(amount))

    def confirm_payroll(self):
        self.driver.find_element(*self.CONFIRM_BTN).click()

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

    def is_download_visible(self):
        try:
            return self.driver.find_element(*self.DOWNLOAD_PAYSLIP_BTN).is_displayed()
        except Exception:
            return False
