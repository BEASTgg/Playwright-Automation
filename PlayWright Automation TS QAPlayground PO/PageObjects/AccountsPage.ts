import {Locator , Page , expect} from '@playwright/test';

export class Accounts{
    page : Page;
    SearchBtn : Locator;
    AccountType : Locator;
    SortBy : Locator;
    ResetFilterBtn : Locator;
    EditBtn : Locator;
    DeleteBtn : Locator;
    AccountNumbers : Locator;
    ConfirmDeleteBtn : Locator;
    AccountName : Locator;
    AccountType1 : Locator;
    InitialBalance : Locator;
    Active : Locator;
    Inactive : Locator;
    OverDraftProtection : Locator;
    AccountBalance : Locator;
    SaveBtn : Locator;
    AccountNameMultiple : Locator;
    AccountTypeMultiple : Locator;

    constructor(page : Page){
        this.page = page;
        this.SearchBtn = page.locator("#search-input");
        this.AccountType = page.locator("#filter-type");
        this.SortBy = page.locator("#sort-by");
        this.ResetFilterBtn = page.locator("#reset-filters-btn");
        this.EditBtn = page.getByText("Edit");
        this.DeleteBtn = page.getByText("Delete");
        this.AccountNumbers = page.getByTestId("account-number");
        this.ConfirmDeleteBtn = page.locator("#confirm-delete-btn");
        this.AccountName = page.locator("#account-name");
        this.AccountType1 = page.locator("//select[@style = 'position: absolute; border: 0px; width: 1px; height: 1px; padding: 0px; margin: -1px; overflow: hidden; clip: rect(0px, 0px, 0px, 0px); white-space: nowrap; overflow-wrap: normal;']");
        this.InitialBalance = page.locator("#initial-balance");
        this.Active = page.locator("#status-active");
        this.Inactive = page.locator("#status-inactive");
        this.OverDraftProtection = page.locator("//input[@name = 'enableOverdraft']");
        this.AccountBalance = page.getByTestId("account-balance");
        this.SaveBtn = page.locator("#save-account-btn");
        this.AccountNameMultiple = page.getByTestId("account-name");
        this.AccountTypeMultiple = page.locator("//div[@class = 'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground']");
    }

    async GotoAccounts(){
        await this.page.goto("https://www.qaplayground.com/bank/accounts");
    }

    async ApplyFilter(searchtext : string , acctype : string , accname : string){
        //await this.page.pause();
        await this.SearchBtn.fill(searchtext);
        await this.AccountType.click();
        const acctbb = await this.AccountType.boundingBox();
        if (acctype === 'Savings'){
            if (acctbb){
                await this.page.mouse.move(acctbb.x + acctbb.width / 2 , acctbb.y + acctbb.height / 2 + 70);
                await this.page.mouse.down();
                await this.page.mouse.up();
            }
        }
        else if (acctype === 'Checking'){
            if (acctbb){
                await this.page.mouse.move(acctbb.x + acctbb.width / 2 , acctbb.y + acctbb.height / 2 + 100);
                await this.page.mouse.down();
                await this.page.mouse.up();
            }
        }
        else if (acctype === 'Credit'){
            if (acctbb){
                await this.page.mouse.move(acctbb.x + acctbb.width / 2 , acctbb.y + acctbb.height / 2 + 130);
                await this.page.mouse.down();
                await this.page.mouse.up();
            }
        }
        await this.SortBy.click();
        const sbbb = await this.SortBy.boundingBox();
        if (accname === 'Balance'){
            if (sbbb){
                await this.page.mouse.move(sbbb.x + sbbb.width / 2 , sbbb.y + sbbb.height / 2 + 70);
                await this.page.mouse.down();
                await this.page.mouse.up();
            }
        }
        else if (accname === 'Date Created'){
            if (sbbb){
                await this.page.mouse.move(sbbb.x + sbbb.width / 2 , sbbb.y + sbbb.height / 2 + 100);
                await this.page.mouse.down();
                await this.page.mouse.up();
            }
        }
        await this.ViewAccNos();
    }

    async ViewAccNos(){
        console.log(await this.AccountNumbers.allTextContents());
    }

    async DeleteandCheck(AccNumToDel : string){
        let count : number = 0;
        const accNumbers = await this.AccountNumbers.allTextContents();
        for (const i of accNumbers){
            if (AccNumToDel === i){
                await this.DeleteBtn.nth(count).click();
                break;
            }
            else{
                count++;
            }
        }
        await this.ConfirmDeleteBtn.click();
        await this.ViewAccNos();
    }

    async viewAllDetails(specify : number){
        console.log(await this.AccountNumbers.nth(specify).textContent());
        console.log(await this.AccountNameMultiple.nth(specify).textContent());
        console.log(await this.AccountTypeMultiple.nth(specify).textContent());
        console.log(await this.AccountBalance.nth(specify).textContent());
        //console.log();
    }

    async EditTransaction(AccNumToEdit : string, AccNamee : string , AccTypee : string, InitBal : string , stat : string, odp : boolean){
        //await this.page.pause();
        let count : number = 0;
        const accNumbers = await this.AccountNumbers.allTextContents();
        for (const i of accNumbers){
            if (AccNumToEdit === i){
                await this.EditBtn.nth(count).click();
                break;
            }
            else{
                count++;
            }
        }
        await this.AccountName.fill(AccNamee);
        await this.AccountType1.selectOption(AccTypee);
        await this.InitialBalance.fill(InitBal);
        if (stat === "Active"){
            await this.Active.click();
        }
        else if (stat === "Inactive"){
            await this.Inactive.click();
        }
        if (!odp){
            await this.OverDraftProtection.uncheck();
        }
        else if(odp){
            await this.OverDraftProtection.check();
        }
        await this.SaveBtn.click();
        await this.viewAllDetails(count);
    }
}