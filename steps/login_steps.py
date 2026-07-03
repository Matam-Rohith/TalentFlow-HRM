from behave import given, when, then
from pages.login_page import LoginPage


@given("User opens TalentFlow HRM")
def step_open_app(context):
    page = LoginPage(context.driver)
    page.open_login()
    context.login_page = page


@when('User enters valid credentials "{username}" and "{password}"')
def step_enter_valid_credentials(context, username, password):
    context.login_page.login(username, password)


@when('User enters credentials "{username}" and "{password}"')
def step_enter_credentials(context, username, password):
    context.login_page.login(username, password)


@when("User checks the password input field type")
def step_check_password_type(context):
    pass  # Assertion handled in Then step


@then("Dashboard should appear")
def step_dashboard_visible(context):
    assert context.login_page.is_dashboard_visible(), "Dashboard not visible after login"


@then("An error message should be displayed")
def step_error_visible(context):
    error = context.login_page.get_error_message()
    assert error != "", "Expected error message not shown"


@then("A validation error should appear")
def step_validation_error(context):
    error = context.login_page.get_error_message()
    assert error != "", "Validation error not shown"


@then("Dashboard should NOT appear")
def step_dashboard_not_visible(context):
    assert not context.login_page.is_dashboard_visible(), "SQL injection bypassed login!"


@then('The password field type should be "{field_type}"')
def step_password_masked(context, field_type):
    assert context.login_page.is_password_masked(), f"Password field is not of type {field_type}"
