import { test, expect } from "@playwright/test";

test("Auth Component", async ({ page }) => {
  await page.goto("/auth");
  await expect(page).toHaveURL("/auth/login");
});
