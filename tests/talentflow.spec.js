import { test, expect } from '@playwright/test';

test.describe('TalentFlow HRMS & ATS - End-to-End Test Suite', () => {

  test.beforeEach(async ({ page }) => {
    // Navigate to the base application URL before each test
    await page.goto('/');
  });

  test('should open application successfully', async ({ page }) => {
    // 1. Verify page title and header
    await expect(page).toHaveTitle(/TalentFlow HRMS & ATS/);

    // Verify branding and main container visibility
    await expect(page.locator('.sidebar-brand .brand-name')).toHaveText('TalentFlow');
    await expect(page.locator('.sidebar-brand .brand-tag')).toHaveText('HRMS & ATS');
    await expect(page.locator('#mainContent')).toBeVisible();
  });

  test('should load dashboard metrics and activity correctly', async ({ page }) => {
    // 2. Dashboard should load with key metrics and activity feed
    await expect(page.locator('#view-dashboard')).toBeVisible();

    // Verify metric cards exist and have loaded applicant numbers
    const totalStat = page.locator('#statTotal');
    await expect(totalStat).toBeVisible();
    await expect(totalStat).not.toHaveText('');

    await expect(page.locator('#statInterview')).toBeVisible();
    await expect(page.locator('#statOffered')).toBeVisible();
    await expect(page.locator('#statHired')).toBeVisible();

    // Verify recent activity feed is populated
    const activityItems = page.locator('#activityList .activity-item');
    await expect(activityItems.first()).toBeVisible();
  });

  test('should navigate to candidate section', async ({ page }) => {
    // 3. Candidate section navigation
    await page.locator('nav.sidebar-menu a[data-view="candidates"]').click();

    // Verify candidates view is active and table is displayed
    await expect(page.locator('#view-candidates')).toHaveClass(/active-view/);
    await expect(page.locator('#candidateTableBody')).toBeVisible();
    const candidateRows = page.locator('#candidateTableBody tr');
    await expect(candidateRows.first()).toBeVisible();
  });

  test('should add a new candidate', async ({ page }) => {
    // 4. Candidate creation workflow
    await page.locator('#openModalBtn').click();
    const modal = page.locator('#candidateModal');
    await expect(modal).toHaveClass(/open/);

    // Fill valid candidate information
    const candidateName = 'Ananya Sen';
    const candidateEmail = 'ananya.sen@example.com';
    await page.locator('#fullName').fill(candidateName);
    await page.locator('#email').fill(candidateEmail);
    await page.locator('#phone').fill('+91 98111 22334');
    await page.locator('#roleApplied').fill('QA Automation Engineer');
    await page.locator('#department').selectOption('Engineering');
    await page.locator('#experience').fill('4');
    await page.locator('#recruiterName').fill('Matam Rohith');
    await page.locator('#status').selectOption('Applied');

    // Submit form
    await page.locator('#saveBtn').click();
    await expect(modal).not.toHaveClass(/open/);

    // Navigate to candidates view and verify candidate is listed
    await page.locator('nav.sidebar-menu a[data-view="candidates"]').click();
    await expect(page.locator('#candidateTableBody')).toContainText(candidateName);
    await expect(page.locator('#candidateTableBody')).toContainText('QA Automation Engineer');
  });

  test('should edit an existing candidate', async ({ page }) => {
    // 5. Candidate profile modification workflow
    await page.locator('nav.sidebar-menu a[data-view="candidates"]').click();

    // Click edit on the first candidate in the table
    const firstRow = page.locator('#candidateTableBody tr').first();
    await firstRow.locator('[data-action="edit"]').click();

    const modal = page.locator('#candidateModal');
    await expect(modal).toHaveClass(/open/);
    await expect(page.locator('#modalTitle')).toHaveText('Edit Candidate Profile');

    // Update role applied
    const updatedRole = 'Staff Test Automation Architect';
    await page.locator('#roleApplied').fill(updatedRole);
    await page.locator('#saveBtn').click();

    await expect(modal).not.toHaveClass(/open/);
    await expect(page.locator('#candidateTableBody')).toContainText(updatedRole);
  });

  test('should search candidates', async ({ page }) => {
    // 6. Search functionality across candidate pool
    await page.locator('nav.sidebar-menu a[data-view="candidates"]').click();

    const searchInput = page.locator('#globalSearch');
    await searchInput.fill('Arjun');

    // Verify filtered results contain search term
    const rows = page.locator('#candidateTableBody tr');
    await expect(rows).toHaveCount(1);
    await expect(rows.first()).toContainText('Arjun Mehta');

    // Clear search and verify full list is restored
    await page.locator('#searchClearBtn').click();
    const restoredCount = await page.locator('#candidateTableBody tr').count();
    expect(restoredCount).toBeGreaterThan(1);
  });

  test('should filter candidates by status and department', async ({ page }) => {
    // 7. Multi-filter verification
    await page.locator('nav.sidebar-menu a[data-view="candidates"]').click();

    // Filter by Hired status
    await page.locator('#statusFilter').selectOption('Hired');
    const rows = page.locator('#candidateTableBody tr');
    await expect(rows.first()).toContainText('Hired');

    // Filter by Engineering department
    await page.locator('#deptFilter').selectOption('Engineering');
    await expect(rows.first()).toContainText('Engineering');

    // Reset filters
    await page.locator('#resetFiltersBtn').click();
    await expect(page.locator('#statusFilter')).toHaveValue('All');
    await expect(page.locator('#deptFilter')).toHaveValue('All');
  });

  test('should move candidate to interview stage', async ({ page }) => {
    // 8. Pipeline stage update workflow
    await page.locator('nav.sidebar-menu a[data-view="candidates"]').click();

    // Open candidate detail drawer by clicking view action on first candidate
    const firstRow = page.locator('#candidateTableBody tr').first();
    await firstRow.locator('button[data-action="view"]').click();

    const drawer = page.locator('#candidateDrawerOverlay');
    await expect(drawer).toBeVisible();

    // Click 'Interview' stage button in drawer
    const interviewBtn = page.locator('#drawerStageSwitcher .stage-btn[data-stage="Interview"]');
    await interviewBtn.click();
    await expect(interviewBtn).toHaveClass(/active/);

    // Close drawer
    await page.locator('#closeDrawerBtn').click();
    await expect(drawer).not.toBeVisible();
  });

  test('should schedule an interview', async ({ page }) => {
    // 9. Interview scheduling workflow
    await page.locator('nav.sidebar-menu a[data-view="interviews"]').click();
    await expect(page.locator('#view-interviews')).toHaveClass(/active-view/);

    // Open schedule modal
    await page.locator('#openScheduleInterviewBtn').click();
    const modal = page.locator('#scheduleModal');
    await expect(modal).toHaveClass(/open/);

    // Select candidate from dropdown
    const candidateSelect = page.locator('#scheduleCandidateSelect');
    const firstOptionValue = await candidateSelect.locator('option:not([disabled])').first().getAttribute('value');
    if (firstOptionValue) {
      await candidateSelect.selectOption(firstOptionValue);
    }
    await page.locator('#scheduleRoundType').selectOption('Technical Assessment');
    await page.locator('#scheduleDate').fill('2026-10-25');
    await page.locator('#scheduleTime').fill('15:30');
    await page.locator('#scheduleInterviewer').fill('Matam Rohith');

    // Confirm schedule
    await page.locator('#confirmScheduleBtn').click();
    await expect(modal).not.toHaveClass(/open/);

    // Verify interview card appears in interviews grid
    await expect(page.locator('#interviewsGrid')).toContainText('Technical Assessment');
  });

  test('should delete a candidate', async ({ page }) => {
    // 10. Candidate deletion workflow with confirmation dialog
    await page.locator('nav.sidebar-menu a[data-view="candidates"]').click();

    // Get count of candidates before deletion
    const initialCount = await page.locator('#candidateTableBody tr').count();

    // Trigger delete on the first row
    const firstRow = page.locator('#candidateTableBody tr').first();
    await firstRow.locator('[data-action="delete"]').click();

    // Confirmation dialog should be displayed
    const confirmOverlay = page.locator('#confirmOverlay');
    await expect(confirmOverlay).not.toHaveClass(/hidden/);

    // Confirm deletion
    await page.locator('#confirmDelete').click();
    await expect(confirmOverlay).toHaveClass(/hidden/);

    // Candidate count should decrease by 1
    const newCount = await page.locator('#candidateTableBody tr').count();
    expect(newCount).toBe(initialCount - 1);
  });

  test('should export candidate data to CSV', async ({ page }) => {
    // 11. CSV export trigger and download event
    const downloadPromise = page.waitForEvent('download');
    await page.locator('#exportBtn').click();
    const download = await downloadPromise;

    // Verify exported filename format
    expect(download.suggestedFilename()).toContain('.csv');
  });

  test('should show validation errors on invalid candidate submission', async ({ page }) => {
    // 12. Form validation error handling
    await page.locator('#openModalBtn').click();
    const modal = page.locator('#candidateModal');
    await expect(modal).toHaveClass(/open/);

    // Clear required fields and attempt to submit empty form
    await page.locator('#fullName').fill('');
    await page.locator('#email').fill('');
    await page.locator('#phone').fill('');
    await page.locator('#roleApplied').fill('');
    await page.locator('#saveBtn').click();

    // Verify validation error messages are displayed
    await expect(page.locator('#fullNameError')).toHaveText('Full name is required.');
    await expect(page.locator('#emailError')).toHaveText('Enter a valid email address.');
    await expect(page.locator('#phoneError')).toHaveText('Contact phone number is required.');
    await expect(page.locator('#roleAppliedError')).toHaveText('Job role is required.');

    // Modal should stay open
    await expect(modal).toHaveClass(/open/);
    await page.locator('#closeModalBtn').click();
  });

  test('should persist candidate data after page reload', async ({ page }) => {
    // 13. Data persistence verification via localStorage
    await page.locator('#openModalBtn').click();
    const uniqueCandidate = `Persistent User ${Date.now().toString().slice(-4)}`;
    await page.locator('#fullName').fill(uniqueCandidate);
    await page.locator('#email').fill('persistent.user@example.com');
    await page.locator('#phone').fill('+91 99887 76655');
    await page.locator('#roleApplied').fill('Software Test Engineer');
    await page.locator('#department').selectOption('Engineering');
    await page.locator('#experience').fill('2');
    await page.locator('#recruiterName').fill('Matam Rohith');
    await page.locator('#saveBtn').click();

    // Reload page
    await page.reload();

    // Navigate to candidates view and verify candidate is still retained
    await page.locator('nav.sidebar-menu a[data-view="candidates"]').click();
    await expect(page.locator('#candidateTableBody')).toContainText(uniqueCandidate);
  });

  test('should toggle dark and light mode', async ({ page }) => {
    // 14. Theme switching verification
    const htmlElement = page.locator('html');
    await expect(htmlElement).toHaveAttribute('data-theme', 'dark');

    // Click theme toggle to switch to light theme
    await page.locator('#themeToggle').click();
    await expect(htmlElement).toHaveAttribute('data-theme', 'light');

    // Click theme toggle again to revert to dark theme
    await page.locator('#themeToggle').click();
    await expect(htmlElement).toHaveAttribute('data-theme', 'dark');
  });

  test('should navigate between all primary workspace sections', async ({ page }) => {
    // 15. Primary view navigation verification
    const navItems = [
      { view: 'candidates', sectionId: '#view-candidates' },
      { view: 'pipeline', sectionId: '#view-pipeline' },
      { view: 'interviews', sectionId: '#view-interviews' },
      { view: 'analytics', sectionId: '#view-analytics' },
      { view: 'settings', sectionId: '#view-settings' },
      { view: 'dashboard', sectionId: '#view-dashboard' },
    ];

    for (const item of navItems) {
      await page.locator(`nav.sidebar-menu a[data-view="${item.view}"]`).click();
      await expect(page.locator(item.sectionId)).toHaveClass(/active-view/);
    }
  });

});
