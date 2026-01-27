import { LoginPage } from "./LoginPage";
import {Page} from '@playwright/test';
import { DashboardPage } from "./DashboardPage";
import { Accounts } from "./AccountsPage";
import { Transaction } from "./TransactionPage";

export class POManager{
    page : Page;
    Loginpage : LoginPage;
    DashBoard : DashboardPage;
    AccountsPage : Accounts;
    TransactionsPage : Transaction;
    constructor(page : Page){
        this.page = page;
        this.Loginpage = new LoginPage(this.page);
        this.DashBoard = new DashboardPage(this.page);
        this.AccountsPage = new Accounts(this.page);
        this.TransactionsPage = new Transaction(this.page);
    }

    getLoginPage(){
        return this.Loginpage;
    }

    getDashboardInfo(){
        return this.DashBoard;
    }

    getAccountsPage(){
        return this.AccountsPage;
    }

    getTransactionsPage(){
        return this.TransactionsPage;
    }
}