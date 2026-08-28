const { expect, test } = require("@playwright/test");

test("renders the resume and home routes without browser errors", async ({ page }) => {
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));

  await page.goto("/");
  await expect(page).toHaveURL(/\/resume$/);
  await expect(page).toHaveTitle("猫宁-初级喂猫师-2年");
  await expect(page.locator(".resume-title h1")).toHaveText("初级喂猫师");
  await expect(page.locator(".project-badge").first()).toBeVisible();
  await expect(page.locator(".skill-progress .progress-bar").first()).toBeVisible();
  await expect(page.locator(".resume-footer")).toContainText("Made with 💖 by Cheng（End）");

  await page.goto("/#/home");
  await expect(page).toHaveURL(/\/home$/);
  await expect(page.locator("h1")).toHaveText("JSON to Resume");
  await expect(page.locator("p")).toHaveText("这是一个便捷的 JSON 转简历工具。");
  expect(pageErrors).toEqual([]);
});
