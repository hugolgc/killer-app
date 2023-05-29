import { test, expect } from "@playwright/test";
import { testHelper } from "../../helpers/test.helper";

test("Game Component", async ({ page }) => {
  await testHelper.login(page);
  await page.getByRole("link").first().click();
  await expect(page).toHaveURL("http://localhost:5173/game/mission");
  await page.getByRole("link").nth(1).click();
  await expect(page).toHaveURL("http://localhost:5173/game/ranking");
  await page.getByRole("link").nth(2).click();
  await expect(page).toHaveURL("http://localhost:5173/game/activity");
});
