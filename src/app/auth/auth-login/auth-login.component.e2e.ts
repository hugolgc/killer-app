import { test, expect } from "@playwright/test";
import { testHelper } from "../../../helpers/test.helper";

test.beforeEach(async ({ page }) => {
  await testHelper.login(page);
});

test("Auth Login Component", async ({ page }) => {
  await expect(page.locator('img[alt="Hugo Lagache"]')).toHaveCount(1);
});
