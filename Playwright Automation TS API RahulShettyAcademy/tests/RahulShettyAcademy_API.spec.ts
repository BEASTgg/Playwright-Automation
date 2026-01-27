import {test, expect, request, APIRequestContext} from '@playwright/test';

let ApiContext : APIRequestContext;

let ExtractedToken : string;

const payload = {userEmail : "QAEENGG@gmail.com", userPassword : "Qaeengg@123"};

const CreateOrder_Payload = {orders: [{country: "India", productOrderedId: "6960eae1c941646b7a8b3ed3"}]};

let orderId : string;

test.beforeAll("Create Context and extract token", async function(){
    ApiContext = await request.newContext({ignoreHTTPSErrors: true});         //ignoreHTTPSErrors is used to disable SSL verification
    const LoginResponse = await ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
        data : payload
    });
    await expect(LoginResponse.ok()).toBeTruthy();
    const LoginResponseBody = await LoginResponse.json();
    ExtractedToken = await LoginResponseBody.token;
});

test.beforeEach("Inject token", async function({page}){
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);
    }, ExtractedToken);
});

test("Check If token is working and print the title", async function({page}){
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    console.log(await page.title());
});

test("Create Order", async ({}) => {
    const create_orderResponse = await ApiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data : CreateOrder_Payload,
        headers : {
            'Authorization' : ExtractedToken,
            'Content-Type' : 'application/json'
        },
    })
    const responseInJson = await create_orderResponse.json();
    console.log(create_orderResponse.status());
    console.log(responseInJson.message)
    orderId = responseInJson.orders[0];
    console.log("Order Id :" , orderId);
});