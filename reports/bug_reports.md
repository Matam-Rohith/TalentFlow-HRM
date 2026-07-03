# Bug Reports – TalentFlow HRM QA

---

## BUG-001

| Field       | Details                                              |
|-------------|------------------------------------------------------|
| **Bug ID**  | BUG-001                                              |
| **Title**   | Login button disabled after invalid password attempt |
| **Module**  | Login                                                |
| **Severity**| High                                                 |
| **Priority**| High                                                 |
| **Status**  | Open                                                 |
| **Steps**   | 1. Open TalentFlow HRM <br> 2. Enter wrong password <br> 3. Click Login |
| **Expected**| Login button remains enabled for retry               |
| **Actual**  | Login button becomes disabled after failed attempt   |

---

## BUG-002

| Field       | Details                                              |
|-------------|------------------------------------------------------|
| **Bug ID**  | BUG-002                                              |
| **Title**   | No validation error for empty username field         |
| **Module**  | Login                                                |
| **Severity**| Medium                                               |
| **Priority**| Medium                                               |
| **Status**  | Open                                                 |
| **Steps**   | 1. Open login page <br> 2. Leave username blank <br> 3. Enter password and submit |
| **Expected**| "Username is required" validation message            |
| **Actual**  | Form submits with generic error or no message        |

---

## BUG-003

| Field       | Details                                              |
|-------------|------------------------------------------------------|
| **Bug ID**  | BUG-003                                              |
| **Title**   | Duplicate employee ID does not show error            |
| **Module**  | Employee                                             |
| **Severity**| High                                                 |
| **Priority**| High                                                 |
| **Status**  | Open                                                 |
| **Steps**   | 1. Add employee with ID EMP-101 <br> 2. Add another with same ID |
| **Expected**| "Employee ID already exists" error message           |
| **Actual**  | Second record is saved without any error             |

---

## BUG-004

| Field       | Details                                              |
|-------------|------------------------------------------------------|
| **Bug ID**  | BUG-004                                              |
| **Title**   | Negative salary value accepted in Payroll module     |
| **Module**  | Payroll                                              |
| **Severity**| High                                                 |
| **Priority**| High                                                 |
| **Status**  | Open                                                 |
| **Steps**   | 1. Navigate to Payroll <br> 2. Enter -5000 as salary <br> 3. Confirm |
| **Expected**| Validation error: "Salary must be a positive value" |
| **Actual**  | Negative salary is accepted and saved                |

---

## BUG-005

| Field       | Details                                              |
|-------------|------------------------------------------------------|
| **Bug ID**  | BUG-005                                              |
| **Title**   | Dashboard charts not rendering on first load         |
| **Module**  | Dashboard                                            |
| **Severity**| Medium                                               |
| **Priority**| Medium                                               |
| **Status**  | Open                                                 |
| **Steps**   | 1. Login as admin <br> 2. Observe dashboard immediately after login |
| **Expected**| All charts render within 2 seconds of login          |
| **Actual**  | Charts are blank; require page refresh to display    |

---

## BUG-006

| Field       | Details                                              |
|-------------|------------------------------------------------------|
| **Bug ID**  | BUG-006                                              |
| **Title**   | Session not cleared after logout – back button restores dashboard |
| **Module**  | Authentication                                       |
| **Severity**| Critical                                             |
| **Priority**| Critical                                             |
| **Status**  | Open                                                 |
| **Steps**   | 1. Login <br> 2. Click Logout <br> 3. Press browser back button |
| **Expected**| User stays on login page                             |
| **Actual**  | Dashboard is accessible again without re-authentication |

---

## BUG-007

| Field       | Details                                              |
|-------------|------------------------------------------------------|
| **Bug ID**  | BUG-007                                              |
| **Title**   | Payslip download button visible before salary generation |
| **Module**  | Payroll                                              |
| **Severity**| Low                                                  |
| **Priority**| Low                                                  |
| **Status**  | Open                                                 |
| **Steps**   | 1. Navigate to Payroll <br> 2. Do not generate salary |
| **Expected**| Download button hidden until salary is generated     |
| **Actual**  | Download button is always visible                    |
