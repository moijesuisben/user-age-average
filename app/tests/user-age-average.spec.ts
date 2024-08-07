import { test, expect } from '@playwright/test';

test('Render page', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toHaveText('Average age calculator');
});

test.describe('User List', () => {
  test('should display the list of users', async ({ page }) => {
    await page.goto('/');
    const users = page.locator('li');
    await expect(users).toHaveCount(100);
  });

  test('should select a user and display average age', async ({ page }) => {
    await page.goto('/');
    const firstUserCheckbox = page
      .locator('li')
      .first()
      .locator('input[type="checkbox"]');
    await firstUserCheckbox.check();

    const averageAgeText = page.locator('p');
    await expect(averageAgeText).toContainText(
      'Âge moyen des personnes sélectionnées'
    );
  });

  test('should deselect a user and update average age', async ({ page }) => {
    await page.goto('/');
    const firstUserCheckbox = page
      .locator('li')
      .first()
      .locator('input[type="checkbox"]');
    await firstUserCheckbox.check();

    const averageAgeText = page.locator('p');
    await expect(averageAgeText).toContainText(
      'Âge moyen des personnes sélectionnées'
    );
  });
});

test.describe('Average Age', () => {
  test('should display "Âge moyen des personnes sélectionnées" when no users are selected', async ({
    page,
  }) => {
    await page.goto('/');
    const averageAgeText = page.locator('p');
    await expect(averageAgeText).toHaveText(
      'Âge moyen des personnes sélectionnées'
    );
  });

  test('should display "Erreur : date de naissance de Jecho Thompson absente" when average age is NaN', async ({
    page,
  }) => {
    await page.route('**/users', (route) =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify([
          { id: '99', name: 'User One', birthYear: 2003 },
          { id: '100', name: 'Jecho Thompson' },
        ]),
      })
    );

    await page.goto('/');

    const secondUserCheckbox = page
      .locator('li')
      .nth(1)
      .locator('input[type="checkbox"]');
    await secondUserCheckbox.check();

    const averageAgeText = page.locator('b');
    await expect(averageAgeText).toHaveText(
      'Erreur : date de naissance de Jecho Thompson absente'
    );
  });
});
