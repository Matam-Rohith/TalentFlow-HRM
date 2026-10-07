# TalentFlow HRMS & ATS — Bug Reports

This document contains reproducible defect reports identified during manual and exploratory testing of the TalentFlow HRMS application.

---

### Bug ID: BUG-001
**Title:** "Sort: Highest Rating" option sorts candidates by years of experience instead of rating
**Steps to Reproduce:**
1. Open the application and navigate to the Candidates view (`#view-candidates`).
2. Locate the sort dropdown selector (`#sortFilter`).
3. Select the option "Sort: Highest Rating".
4. Observe the sorting order of the displayed candidate rows.
**Expected Result:** Candidates should be sorted by their rating or interview evaluation score. If candidate rating is not a supported property, the dropdown option should not be displayed.
**Actual Result:** In `main.js` (line 916), the sorting handler for `sort === 'rating'` executes `(Number(b.experience) || 0) - (Number(a.experience) || 0)`. This causes the list to sort by years of experience, producing identical results to "Sort: Most Experienced".
**Severity:** Medium
**Status:** Open

---

### Bug ID: BUG-002
**Title:** Candidate experience field accepts excessively high numbers without maximum validation check
**Steps to Reproduce:**
1. Click the "Add Candidate" button to open the candidate creation modal.
2. Fill all required fields with valid test data.
3. In the "Years of Experience" input field (`#experience`), enter `999`.
4. Click "Save Candidate".
**Expected Result:** The application should validate that years of experience falls within a realistic range (e.g., 0–40 years, matching the HTML input `max="40"` constraint) and display an error message if exceeded.
**Actual Result:** Because the `<form>` contains the `novalidate` attribute and the JavaScript submission handler (`handleCandidateSubmit`) only verifies `isNaN(experience) || experience < 0`, an experience of 999 years is accepted and saved, subsequently distorting the analytics charts in the Analytics tab.
**Severity:** Low
**Status:** Open

---

### Bug ID: BUG-003
**Title:** Scheduling an interview resets candidates in "Offered" or "Hired" stage back to "Interview"
**Steps to Reproduce:**
1. In the candidate list, find a candidate whose current stage is "Offered" or "Hired" (such as "Priya Sharma" or "Kiran Kumar").
2. Open the Schedule Assessment modal by clicking "Schedule Interview".
3. Select that candidate from the dropdown list.
4. Fill in an assessment date and time, and click "Confirm Assessment".
**Expected Result:** The system should warn the user that scheduling an assessment will overwrite an advanced status, or retain the "Offered"/"Hired" status while simply attaching the assessment details.
**Actual Result:** `handleScheduleSubmit` unconditionally sets `candidate.status = 'Interview'`, silently resetting candidates who were already offered or hired back to the interview stage without warning.
**Severity:** Medium
**Status:** Open
