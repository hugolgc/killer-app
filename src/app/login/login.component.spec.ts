import { test, expect } from "@playwright/test";
import { testHelper } from "../../helpers/test.helper";

test("Login Component", async ({ page }) => {
  await testHelper.login(page);
  await expect(page.locator('img[alt="Hugo Lagache"]')).toHaveCount(1);
});
