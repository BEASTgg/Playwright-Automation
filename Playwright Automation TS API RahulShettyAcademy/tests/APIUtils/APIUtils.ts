import { APIRequestContext , expect } from "@playwright/test"

export class APIUtils{

    ApiContext : APIRequestContext;
    payload : any;

    constructor(ApiContext : APIRequestContext , payload : object){       //cause the payload is a js object that is key value pair
        this.ApiContext = ApiContext;
        this.payload = payload;
    }

    async getToken() {
        const LoginResponse = await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
                data : this.payload
        });
        await expect(LoginResponse.ok()).toBeTruthy();
        const LoginResponseBody = await LoginResponse.json();
        const ExtractedToken = await LoginResponseBody.token;
        return ExtractedToken;
    }

    async createOrder(CreateOrder_Payload : object){       //cause the payload is a js object that is key value pair
        const create_orderResponse = await this.ApiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order", {
        data : CreateOrder_Payload,
        headers : {
            'Authorization' : await this.getToken(),
            'Content-Type' : 'application/json'
        },
    })
    const responseInJson = await create_orderResponse.json();
    console.log(create_orderResponse.status());
    console.log(responseInJson.message)
    const orderId = responseInJson.orders[0];
    console.log("Order Id :" , orderId);
    }
}