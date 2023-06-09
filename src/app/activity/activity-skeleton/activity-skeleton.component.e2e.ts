import { test, expect } from "@playwright/test";
import { testHelper } from "../../../helpers/test.helper";

test.beforeEach(async ({ page }) => {
  await testHelper.login(page);
});

test("Activity Skeleton Component", async ({ page }) => {
  await page.getByRole("link").nth(2).click();
  await expect(page.locator(".skeleton").first()).toHaveCount(1);
});
