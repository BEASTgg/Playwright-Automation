import {Given, When, Then } from '@cucumber/cucumber';
import {Page , Browser} from '@playwright/test';
import {POManager} from '../PageObjects/POManager';
import { chromium } from 'playwright';

let poManager : POManager;
let browser : Browser;
let page : Page;

Given('User is logged into the website using {string} and {string}' , {timeout : 30000} ,async function(username : string, password : string){
    browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    poManager = new POManager(page);
    const loginPage = await poManager.getLoginPage();
    await loginPage.gotoLoginPage();
    await loginPage.validLogin(username,password);
});

Given('User lands on dashboard page',async function(){
    const DashboardPage = await poManager.getDashboardInfo();
});

When('User Click on new Transaction using {string} {string} {string} {string} {string} {string} and submit it', {timeout : 30000} , async function(TType : string , fromAcc : string, ToAcc : string, amnt : string , descriptioN : string, noti : string){
    const DashboardPage = await poManager.getDashboardInfo();
    if (TType === "Deposit" && noti === "true"){
        await DashboardPage.NewTransactionWithOutTransfer(TType,fromAcc,amnt,descriptioN,true);
    }
    else if (TType === "Deposit" && noti === "false"){
        await DashboardPage.NewTransactionWithOutTransfer(TType,fromAcc,amnt,descriptioN,false);
    }
    else if (TType === "Withdrawl" && noti === "true"){
        await DashboardPage.NewTransactionWithOutTransfer(TType,fromAcc,amnt,descriptioN,true);
    }
    else if (TType === "Withdrawl" && noti === "true"){
        await DashboardPage.NewTransactionWithOutTransfer(TType,fromAcc,amnt,descriptioN,false);
    }
    else if (TType === "Transfer" && noti === "true"){
        await DashboardPage.NewTransactionWithTransfer(TType,fromAcc,ToAcc,amnt,descriptioN,true);
    }
    else if (TType === "Transfer" && noti === "false"){
        await DashboardPage.NewTransactionWithTransfer(TType,fromAcc,ToAcc,amnt,descriptioN,false);
    }
});

Then("Transaction is completed , Print the last transaction record" , async function(){
    const last_transaction = await page.getByTestId("transaction-row").last().textContent();
    console.log(last_transaction);
});

Then("Close the browser", async function(){
    await browser.close();
});