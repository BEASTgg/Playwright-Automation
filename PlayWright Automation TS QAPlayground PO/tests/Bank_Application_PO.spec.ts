import { test } from '@playwright/test';
import { POManager } from '../PageObjects/POManager';
import { DashboardPage } from '../PageObjects/DashboardPage';

var PoManager : POManager;

test.beforeEach("Create POManager Object", async function({page}){
    PoManager = new POManager(page);
});

test.beforeEach("Login", async function(){
    const login = PoManager.getLoginPage();
    await login.gotoLoginPage();
    await login.validLogin("admin","admin123");
});

test("Valid Login", async function(){
    const login = PoManager.getLoginPage();
    await login.CheckResult();
});

test("InValid Login", async function(){
    const login = PoManager.getLoginPage();              // Before running this make sure to remove .beforeAll in Login one or it wont work
    await login.gotoLoginPage();
    await login.invalidLogin("admin1","admin");
});

test("Check balence" , async function(){
    const dashboard = PoManager.getDashboardInfo();
    await dashboard.checkBalence();
});

test("Add Account", async function(){
    const dashboard = PoManager.getDashboardInfo();
    await dashboard.AddAccPage("TestQEA","Savings Account","100000","Active",true);
});

test("New Transaction with Transfer", async function(){
    const dashboard = PoManager.getDashboardInfo();
    await dashboard.NewTransactionWithTransfer("Transfer","Primary Savings - $5,000.00","Checking Account (1001234568)","10000","No Please",false);
});

test("New Transaction without Transfer", async function(){
    const dashboard = PoManager.getDashboardInfo();
    await dashboard.NewTransactionWithOutTransfer("Transfer","Primary Savings - $5,000.00","10000","No Please",false);
});

test("View Account", async function(){
    const dashboard = PoManager.getDashboardInfo();
    await dashboard.ViewAccount();
});

test("Logout Funcationality", async function(){
    const dashboard = PoManager.getDashboardInfo();
    await dashboard.LogOut();
});

test("Apply Filters in Accounts Page", async function(){
    const AccountsPagee = PoManager.getAccountsPage();
    await AccountsPagee.GotoAccounts();
    await AccountsPagee.ApplyFilter("Ch","Checking","Date Created");
});

test("View all account No", async function(){
    const AccountsPagee = PoManager.getAccountsPage();
    await AccountsPagee.GotoAccounts();
    await AccountsPagee.ViewAccNos();
});

test("Delete and Check Available acc", async function(){
    const AccountsPagee = PoManager.getAccountsPage();
    await AccountsPagee.GotoAccounts();
    await AccountsPagee.DeleteandCheck('1001234567');
});

test("Check Edit Button", async function(){
    const AccountsPagee = PoManager.getAccountsPage();
    await AccountsPagee.GotoAccounts();
    await AccountsPagee.EditTransaction("1001234567","Special Account","Credit Card","10000","Inactive",false);
});

test("Apply Filter in transaction", async function(){
    const TransactionPagee = PoManager.getTransactionsPage();
    await TransactionPagee.applyFiltersTransaction("Primary Savings","Deposit","2003-05-12","2026-12-31");
});

test("Export the file", async function(){
    const TransactionPagee = PoManager.getTransactionsPage();
    await TransactionPagee.DownloadIt();
});