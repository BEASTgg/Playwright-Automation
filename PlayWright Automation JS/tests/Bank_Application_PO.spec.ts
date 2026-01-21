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

test("Add Account", async function({page}){
    const DashB = PoManager.getDashboardInfo();
    await DashB.AddAccPage("TestQEA","Savings Account","100000","Active",true);
});