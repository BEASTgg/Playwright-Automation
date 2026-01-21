import { LoginPage } from "./LoginPage";
import {Page} from '@playwright/test';
import { DashboardPage } from "./DashboardPage";

export class POManager{
    page : Page;
    Loginpage : LoginPage;
    DashBoard : DashboardPage;
    constructor(page : Page){
        this.page = page;
        this.Loginpage = new LoginPage(this.page);
        this.DashBoard = new DashboardPage(this.page);
    }

    getLoginPage(){
        return this.Loginpage;
    }

    getDashboardInfo(){
        return this.DashBoard;
    }
}