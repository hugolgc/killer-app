import { test, expect } from "@playwright/test";
import { testHelper } from "../../../helpers/test.helper";

test.beforeEach(async ({ page }) => {
  await testHelper.login(page);
});

test("Ranking Switch Component", async ({ page }) => {
  await page.getByRole("link").nth(1).click();
  await page.getByRole("button", { name: "Service" }).click();
  await page.waitForTimeout(1_000);
  expect(page.getByRole("button", { name: "Service" })).toHaveClass("active");
  await page.getByRole("button", { name: "Site" }).click();
  await page.waitForTimeout(1_000);
  expect(page.getByRole("button", { name: "Site" })).toHaveClass("active");
  await page.getByRole("button", { name: "Global" }).click();
  await page.waitForTimeout(1_000);
  expect(page.getByRole("button", { name: "Global" })).toHaveClass("active");
});
