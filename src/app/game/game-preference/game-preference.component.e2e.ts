import { test, expect } from "@playwright/test";
import { testHelper } from "../../../helpers/test.helper";

test.beforeEach(async ({ page }) => {
  await testHelper.login(page);
});

test("Game Preference Component", async ({ page }) => {
  await page.getByRole("img", { name: "Hugo Lagache" }).click();
  await page.waitForTimeout(1_000);
  await expect(page.locator(".preference")).toHaveCount(1);
  await page.mouse.click(10, 10);
  await page.waitForTimeout(1_000);
  await expect(page.locator(".preference")).toHaveCount(0);
});
