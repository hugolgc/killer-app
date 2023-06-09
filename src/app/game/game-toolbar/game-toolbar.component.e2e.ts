import { test, expect } from "@playwright/test";
import { testHelper } from "../../../helpers/test.helper";

test.beforeEach(async ({ page }) => {
  await testHelper.login(page);
});

test("Game Toolbar Component", async ({ page }) => {
  await expect(page.getByRole("img", { name: "Hugo Lagache" })).toHaveCount(1);
});
