from behave import given, when, then
from pages.login_page import LoginPage
from pages.employee_page import EmployeePage


@given("User is logged in as admin")
def step_login_admin(context):
    lp = LoginPage(context.driver)
    lp.open_login()
    lp.login("admin", "admin123")
    context.employee_page = EmployeePage(context.driver)
    context.before_count = context.employee_page.get_employee_count()


@when('User adds a new employee with name "{name}" id "{emp_id}" email "{email}"')
def step_add_employee(context, name, emp_id, email):
    context.employee_page.click_add_employee()
    context.employee_page.fill_employee_form(name, emp_id, email)
    context.employee_page.save_employee()


@when("User edits the first employee record")
def step_edit_employee(context):
    context.employee_page.click_edit_first()
    context.employee_page.fill_employee_form("Edited Name", "EMP-101", "edited@hr.com")
    context.employee_page.save_employee()


@when("User deletes the first employee record")
def step_delete_employee(context):
    context.employee_page.click_delete_first()


@when('User adds an employee with duplicate ID "{emp_id}"')
def step_add_duplicate(context, emp_id):
    context.employee_page.click_add_employee()
    context.employee_page.fill_employee_form("Dup User", emp_id, "dup@hr.com")
    context.employee_page.save_employee()


@then("Employee record should be created successfully")
def step_employee_created(context):
    msg = context.employee_page.get_success_message()
    assert msg != "", "Employee creation success message not found"


@then("The employee record should be updated")
def step_employee_updated(context):
    msg = context.employee_page.get_success_message()
    assert msg != "", "Employee update message not found"


@then("The employee count should decrease")
def step_count_decreased(context):
    after = context.employee_page.get_employee_count()
    assert after < context.before_count, "Employee count did not decrease"


@then("A duplicate validation error should appear")
def step_duplicate_error(context):
    error = context.employee_page.get_error_message()
    assert error != "", "Duplicate validation error not triggered"
