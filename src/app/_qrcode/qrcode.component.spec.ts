import { test, expect } from "@playwright/test";
import { testHelper } from "../../helpers/test.helper";

test("QRCode Component", async ({ page }) => {
  await testHelper.login(page);
  await expect(page.locator(".qrcode")).toHaveCount(0);
  await page
    .getByRole("listitem")
    .filter({ hasText: "Voir mon QRCodeAttention cela doit rester secret !" })
    .getByRole("button")
    .click();
  await page.waitForTimeout(1_000);
  await expect(page.locator(".qrcode")).toHaveCount(1);
  await page.getByRole("button").first().click();
  await page.waitForTimeout(1_000);
  await expect(page.locator(".qrcode")).toHaveCount(0);
});
