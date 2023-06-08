import { Page } from "@playwright/test";

export const testHelper = {
  async login(page: Page) {
    await page.goto("/auth/login");
    await page
      .getByPlaceholder("email@exemple.com")
      .fill("hugo.lagache@play-ads.com");
    await page.getByPlaceholder("••••••••••").fill("----");
    await page.getByRole("button", { name: "Se connecter" }).click();
  },
};
