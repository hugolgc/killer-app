import { test, expect } from "@playwright/test";
import { testHelper } from "../../helpers/test.helper";

test.beforeEach(async ({ page }) => {
  await testHelper.login(page);
});

test("Mission Component", async ({ page }) => {
  await page.getByRole("link").nth(1).click();
  await expect(page.getByRole("heading", { name: "Classements" })).toHaveCount(
    1
  );
});
