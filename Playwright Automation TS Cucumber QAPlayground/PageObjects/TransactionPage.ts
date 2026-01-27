import {Page,expect,Locator} from '@playwright/test';

export class Transaction{
    page : Page;
    AllAccounts : Locator;
    Types : Locator;
    From : Locator;
    To : Locator;
    ApplyBtn : Locator;
    ResetBtn : Locator;
    ExportBtn : Locator;
    TransactionIds : Locator;

    constructor(page : Page){
        this.page = page;
        this.AllAccounts = page.locator("#filter-account");
        this.Types = page.locator("#filter-transaction-type");
        this.From = page.locator("#date-from");
        this.To = page.locator("#date-to");
        this.ApplyBtn = page.locator("#apply-filters-btn");
        this.ResetBtn = page.locator("#reset-filters-btn");
        this.ExportBtn = page.locator("#export-btn");
        this.TransactionIds = page.getByTestId("transaction-id");

    }

    async GOTOTransaction(){
        await this.page.goto("https://www.qaplayground.com/bank/transactions");
    }

    async applyFiltersTransaction(AA : string , AT : string , F : string , T : string){
        await this.GOTOTransaction();
        //await this.page.pause();
        await this.AllAccounts.click();
        const AABB = await this.AllAccounts.boundingBox();
        if (AABB){
            if (AA === "Primary Savings"){
                await this.page.mouse.move(AABB.x + AABB.width / 2 , AABB.y + AABB.height / 2 + 70);
                await this.page.mouse.down();
                await this.page.mouse.up();
            }
            else if (AA === "Checking Account"){
                await this.page.mouse.move(AABB.x + AABB.width / 2 , AABB.y + AABB.height / 2 + 100);
                await this.page.mouse.down();
                await this.page.mouse.up();
            }
        }
        await this.Types.click();
        const TBB = await this.Types.boundingBox();
        if (TBB){
            if (AT === "Deposit"){
                await this.page.mouse.move(TBB.x + TBB.width / 2 , TBB.y + TBB.height / 2 + 70);
                await this.page.mouse.down();
                await this.page.mouse.up();
            }
            else if (AT === "Withdrawl"){
                await this.page.mouse.move(TBB.x + TBB.width / 2 , TBB.y + TBB.height / 2 + 100);
                await this.page.mouse.down();
                await this.page.mouse.up();
            }
            else if (AT === "Transfer"){
                await this.page.mouse.move(TBB.x + TBB.width / 2 , TBB.y + TBB.height / 2 + 130);
                await this.page.mouse.down();
                await this.page.mouse.up();
            }
        }
        await this.From.fill(F);
        await this.To.fill(T);
        await this.ApplyBtn.click();
        await this.ShowAvaibaleResults();
    }

    async DownloadIt(){
        await this.GOTOTransaction();
        await this.ExportBtn.click();
    }

    async ShowAvaibaleResults(){
        console.log(await this.TransactionIds.allTextContents());
    }

    async ResetFilters(){
        await this.ResetBtn.click();
    }
}