import {Page , Locator} from '@playwright/test';

export class DashboardPage{
    page : Page;
    BalanceLocator : Locator;
    AccountName : Locator;
    AccountType : Locator;
    InitialBalence : Locator;
    OverDraftProtection : Locator;
    constructor(page : Page){
        this.page = page;
        this.BalanceLocator = page.locator("#total-balance");
        this.AccountName = page.locator("#account-name");
        this.AccountType = page.locator("//select[@style = 'position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;']");
        this.InitialBalence = page.locator("#initial-balance");
        this.OverDraftProtection = page.locator("//input[@name = 'enableOverdraft']");
    }

    async checkBalence(){
        const Balance = await this.BalanceLocator.textContent();
        console.log(Balance);
    }

    async AddAccPage(AccName : string , AccType : string , initialBalence : string , status : string , overDraftProtection : boolean){
        await this.page.locator("#add-account-link").click();
        await this.AccountName.fill(AccName);
        await this.AccountType.selectOption(AccType);
        await this.InitialBalence.fill(initialBalence);
        if (status === "Active"){
            await this.page.locator("#status-active").click();
        }
        else if (status === "Inactive"){
            await this.page.locator("#status-inactive").click();
        }
        if (overDraftProtection){
            await this.page.locator("#enable-overdraft").click();
        }
    }
}