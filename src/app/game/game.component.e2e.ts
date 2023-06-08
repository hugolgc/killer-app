import { test, expect } from "@playwright/test";
import { testHelper } from "../../helpers/test.helper";

test.beforeEach(async ({ page }) => {
  await testHelper.login(page);
});

test("Game Component", async ({ page }) => {
  await page.getByRole("link").first().click();
  await expect(page).toHaveURL("/game/mission");
  await page.getByRole("link").nth(1).click();
  await expect(page).toHaveURL("/game/ranking");
  await page.getByRole("link").nth(2).click();
  await expect(page).toHaveURL("/game/activity");
});
