import { test, expect } from "@playwright/test";
import { testHelper } from "../../../helpers/test.helper";

test.beforeEach(async ({ page }) => {
  await testHelper.login(page);
});

test("Mission Scanner Component", async ({ page }) => {
  await page.waitForTimeout(2_000);
  await expect(page.locator(".scanner")).toHaveCount(0);
  await page
    .locator("#app > main > section > article:nth-child(2) > header > button")
    .click();
  await page.waitForTimeout(1_000);
  await expect(page.locator(".scanner")).toHaveCount(1);
  await page.locator(".scanner .button.icon").click();
  await page.waitForTimeout(1_000);
  await expect(page.locator(".scanner")).toHaveCount(0);
});
