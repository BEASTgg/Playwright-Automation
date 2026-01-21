import {Page , expect , Locator} from '@playwright/test';

export class LoginPage{
    usernameBtn : Locator;
    passwordBtn : Locator;
    loginBtn : Locator;
    page : Page;
    constructor (page : Page){
        this.page = page;
        this.usernameBtn = page.locator("#username");
        this.passwordBtn = page.locator("#password");
        this.loginBtn = page.locator("#login-btn");
    }

    async gotoLoginPage(){
        await this.page.goto("https://www.qaplayground.com/bank");
    }

    async validLogin (username : string ,password : string){
        await this.usernameBtn.fill(username);
        await this.passwordBtn.fill(password);
        await this.loginBtn.click();
    }

    async invalidLogin(username : string ,password : string){
        await this.usernameBtn.fill(username);
        await this.passwordBtn.fill(password);
        await this.loginBtn.click();
        const statusmsg = await this.page.locator("#alert-message").textContent();
        await expect(statusmsg).toBe("⚠️ Invalid username or password. Please try again.");
    }

    async CheckResult(){
        await this.page.waitForTimeout(5000);
        await expect(this.page.locator("#logout-btn")).toBeVisible();
    }
}