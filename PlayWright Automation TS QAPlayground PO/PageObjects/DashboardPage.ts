import {Page , Locator , expect} from '@playwright/test';

export class DashboardPage{
    page : Page;
    BalanceLocator : Locator;
    AccountName : Locator;
    AccountType : Locator;
    InitialBalence : Locator;
    OverDraftProtection : Locator;
    NewTransactionBtn : Locator;
    TransactionType : Locator;
    FromAccount : Locator;
    ToAccount : Locator;
    Amount : Locator;
    Active : Locator;
    Inactive : Locator;
    Description : Locator;
    Notification : Locator;
    ViewAccBtn : Locator;
    AllAccountNums : Locator;
    LogOutBtn : Locator;
    constructor(page : Page){
        this.page = page;
        this.BalanceLocator = page.locator("#total-balance");
        this.AccountName = page.locator("#account-name");
        this.AccountType = page.locator("//select[@style = 'position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;']");
        this.InitialBalence = page.locator("#initial-balance");
        this.OverDraftProtection = page.locator("//input[@name = 'enableOverdraft']");
        this.NewTransactionBtn = page.locator("#new-transaction-link");
        this.TransactionType = page.locator("//select[@style = 'position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;']").first();
        this.FromAccount = page.locator("//select[@style = 'position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;']").nth(1);
        this.ToAccount = page.locator("//select[@style = 'position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;']").last();
        this.Amount = page.locator("#transaction-amount");
        this.Active = page.locator("#status-active");
        this.Inactive = page.locator("#status-inactive");
        this.Description = page.locator("#transaction-description");
        this.Notification = page.locator("#send-notification");
        this.ViewAccBtn = page.locator("#view-accounts-link");
        this.AllAccountNums = page.getByTestId('account-number');
        this.LogOutBtn = page.locator("#logout-btn");
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
            await this.Active.click();
        }
        else if (status === "Inactive"){
            await this.Inactive.click();
        }
        if (overDraftProtection){
            await this.page.locator("#enable-overdraft").click();
        }
    }

    async NewTransactionWithTransfer(TType : string , fromAcc : string , ToAcc : string , amnt : string , descriptioN : string, noti : boolean){
        await this.NewTransactionBtn.click();
        await this.TransactionType.selectOption(TType);
        await this.FromAccount.selectOption(fromAcc);
        await this.ToAccount.selectOption(ToAcc);
        await this.Amount.fill(amnt);
        await this.Description.fill(descriptioN);
        if (!noti){
            await this.Notification.uncheck();
        }
    }

    async NewTransactionWithOutTransfer(TType : string , fromAcc : string , amnt : string , descriptioN : string, noti : boolean){
        await this.NewTransactionBtn.click();
        await this.TransactionType.selectOption(TType);
        await this.FromAccount.selectOption(fromAcc);
        await this.Amount.fill(amnt);
        await this.Description.fill(descriptioN);
        if (!noti){
            await this.Notification.uncheck();
        }
    }

    async ViewAccount(){
        await this.ViewAccBtn.click();
        console.log(await this.AllAccountNums.first().textContent());
        console.log(await this.AllAccountNums.last().textContent());
    }

    async LogOut(){
        this.page.on('dialog',async dialog =>{
            console.log(dialog.message());
            await dialog.accept();
        });
        await this.LogOutBtn.click();
        const LogInBtnLocator = this.page.locator("#login-btn");
        await expect(LogInBtnLocator).toBeVisible();
    }
}