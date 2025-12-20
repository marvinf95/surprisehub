import { test, expect } from "@playwright/test";

test.describe("Gift idea generation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("generates ideas in English", async ({ page }) => {
    // Fill form
    await page.fill('input[name="age"]', "25");
    await page.fill('input[name="relationship"]', "friend");
    await page.fill('input[name="budget"]', "50");
    await page.fill('input[name="interests"]', "football");
    await page.fill('input[name="occasion"]', "birthday");

    // Submit
    await page.click("button:has-text('Generate Ideas')");

    await expect(page.getByText("1.")).toBeVisible({ timeout: 15000 });

    // Wait for loading to finish and ideas to appear
    await expect(page.locator("text=1.")).toBeVisible();
    await expect(page.locator("text=2.")).toBeVisible();
    await expect(page.locator("text=3.")).toBeVisible();
  });

  test("switches language and generates ideas", async ({ page }) => {
    // Switch to German
    await page.selectOption("select", "de");

    // Fill form (German labels, but English keys)
    await page.fill('input[name="age"]', "30");
    await page.fill('input[name="relationship"]', "Freundin");
    await page.fill('input[name="budget"]', "100");
    await page.fill('input[name="interests"]', "Kochen");
    await page.fill('input[name="occasion"]', "Weihnachten");

    // Submit (now German button text)
    await page.click("button:has-text('Ideen generieren')");

    // German ideas appear
    await expect(page.getByText(/1\./)).toBeVisible({ timeout: 15000 });
    await expect(page.locator("text=2.")).toBeVisible();
  });
});
